import yaml
import pandas as pd
import numpy as np
import datetime
import pycountry
from numpy.random import seed as npseed
import pickle as pkl
from hybrid import *
import os
import torch
import torch.nn as nn
from tqdm import tqdm_notebook

from model_data import get_label, normalize_but_country, get_model_data
import pytorch_lightning as pl
from pytorch_lightning import seed_everything
import plotly.graph_objects as go # pip install --user plotly
import seaborn as sns
torch.cuda.set_device(0)

with open('model_config.yaml', 'r') as file:
    config = yaml.load(file, Loader=yaml.FullLoader)
    
with open('model_features.yaml', 'r') as file:
    features = yaml.load(file, Loader=yaml.FullLoader)

seed_everything(config['seed'])

################## GENERAL ##################

def loo_indices(data, country=None) :
    """Returns a list of tuples (train, test) for leave-one-out training"""
    countries = data['iso_code'].unique()
    tups = []
    for c in countries :
        if (country is None) or (c == country) :
            train_indices = data['iso_code'] != c
            test_indices = ~train_indices
            tups.append((train_indices, test_indices))
    return tups

def train_model(df, train_cols, target_col, country, const_cols, past_window=7) :
    """Trains a model for a given country in leave-one-out and make a prediction"""

    # Normalize data
    df, _, _, _ = normalize_but_country(df, train_cols, country)
    
    # Get train and test indices for given df
    train_indices, test_indices = loo_indices(df, country=country)[0]
    plot_index = df.loc[test_indices].index

    # lstm vs. mlp variables
    var_cols = [c for c in train_cols if c not in const_cols]
    grouped = df.loc[train_indices] \
                .groupby('iso_code') \
                .apply(lambda df : sliced_hybrid(df, const_cols, var_cols, target_col, past_window))

    # Train and Val sets
    X_train_const = np.array([x for g in grouped for x in g[0]])
    X_train_var   = np.array([x for g in grouped for x in g[1]])
    y_train       = np.array([x for g in grouped for x in g[2]])

    # Format train data
    X_train_const, X_train_var, y_train, _, _ = format_for_hybrid(X_train_const, X_train_var, y_train)
    train_data = (X_train_const, X_train_var, y_train)

    # Format val data
    val_data = sliced_hybrid(df[test_indices], const_cols, var_cols, target_col, past_window)
    X_val_const, X_val_var, y_val, _, _ = format_for_hybrid(val_data[0], val_data[1], val_data[2])
    val_data = (X_val_const, X_val_var, y_val)

    #Train model
    model = train_hybrid(var_cols, const_cols, target_col, train_data, val_data, country)
    model.eval()

    # Generate Final Prediction
    pred = model((X_val_const, X_val_var)).detach()
    pred = pred.reshape(pred.size(0)).numpy()
    pred = np.append([np.nan]*(past_window -1), pred).flatten()
    ground = df.loc[test_indices][target_col]

    return model, pred, ground, plot_index

def model_country(df, train_cols, target_col, country, const_cols, past_window=7, target_name='R', save_path=None) :
    """Train a network to model the given country and plot the result"""

    model, pred, ground, plot_index = train_model(df, train_cols, target_col, country, const_cols)
    mean_error = plot_results(pred, ground, plot_index, country)
    return mean_error, model
    

################## API ##################
    
def load(country, tfrom=None, tuntil=None) :
    
    # Load model
    print("Loading model..." + " "*20, end='\r')
    m = HybridLSTM.load_from_checkpoint(f"models/{country}/model.ckpt")
    m.eval()
    
    policies = features['policies']
    
    # Extract model information
    const_cols = m.hparams["const_cols"]
    var_cols = m.hparams["var_cols"]
    train_cols = const_cols + var_cols
    target_col = m.hparams["target_col"]
    past_window = m.hparams["past_window"]
    
    # Get data and save normalization weights
    print("getting normalization weights..." + " "*20, end='\r')
    data = get_model_data(train_cols, target_col, dropna=True, normalize=False, max_r=4)
    _, train_mean, train_std, norm_cols = normalize_but_country(data, train_cols, country)
    
    # Focus on country data
    data = data[data.iso_code == country]
    
    # Data to return (global level)
    policy_values = dict(zip(policies, data[policies].values.T))
    target_values = data[target_col].values
    dates = data.index
    global_data = (policy_values, target_values, dates)
    
    def dates_mask(tfrom=None, tuntil=None) :
        """Creates a mask on all available dates"""
        
        from_date = pd.to_datetime(tfrom)  if tfrom  is not None else dates[0]
        to_date   = pd.to_datetime(tuntil) if tuntil is not None else dates[-1]
        return (dates >= from_date) & (dates <= to_date)
            
    # Data to return (subdates level)
    mask = dates_mask(tfrom, tuntil)
    sub_targets = target_values[mask]
    sub_policies = dict(zip(policies, data[mask][policies].values.T))
    sub_dates = dates[mask]
    sub_data = (sub_policies, sub_targets, sub_dates)
    
    
    def normalize_data(data) :
        """Normalization using training set stats"""
        
        n_data = data.copy()
        n_data[norm_cols] = (n_data[norm_cols] - train_mean) / train_std        
        return n_data

    
    def predict(data, tfrom=None, tuntil=None) :
        """ Format data for prediction, closed dates interval"""
        
        # Make a prediction
        f_data = normalize_data(data)
        f_data = sliced_hybrid(f_data, const_cols, var_cols, target_col, past_window)
        X_const, X_var, y, _, _ = format_for_hybrid(f_data[0], f_data[1], f_data[2])
        nan_append = np.array([np.nan]*(past_window-1))
        pred =  np.append(nan_append, m((X_const, X_var)).detach().numpy().flatten())
        
        # Focus on asked dates if any
        mask = dates_mask(tfrom, tuntil)
        sub_pred = pred[mask]
        
        return sub_pred
            
    # Make prediction
    print("predicting..." + " "*20, end='\r')
    pred = predict(data, tfrom, tuntil)
    sub_data = sub_data + (pred, )
    
    
    def update(cur_country, tfrom, tuntil, new_policies=None, demographics=None) :
        """Returns a prediction for other policies or another time-frame"""
        
        if cur_country != country :
            raise Exception('Call the load function when choosing a new country')
        
        # Rewrite policies
        from_date = pd.to_datetime(tfrom)
        to_date = pd.to_datetime(tuntil)
        mask = (dates >= from_date) & (dates <= to_date)
        d = dates[mask]
        
        if new_policies is not None :
            for k in new_policies :
                data.loc[mask, k] = new_policies[k]
            
        # Compute prediction
        pred = predict(data, tfrom, tuntil)
        
        
        return pred, target_values[mask], d
        
    
    return global_data, sub_data, update
