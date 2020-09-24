import pandas as pd
import numpy as np
import datetime
from numpy.random import seed as npseed
import pickle as pkl
import sklearn
import tensorflow as tf
import os
os.environ["CUDA_VISIBLE_DEVICES"]="1"
physical_devices = [tf.config.list_physical_devices('GPU')]
print(physical_devices)
#tf.config.experimental.set_memory_growth(physical_devices[0], True)
#tf.config.experimental.set_memory_growth(physical_devices[1], True)

from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras import backend as kb
from tqdm import tqdm_notebook
from sklearn.model_selection import KFold
from sklearn.linear_model import LinearRegression, Ridge
from sklearn import feature_selection
import matplotlib.pyplot as plt
import matplotlib.dates as mdates
from model_data import get_label
import plotly.graph_objects as go # pip install --user plotly
import seaborn as sns

seed=2
# seed=0 # No seed

########## Specific loss for R0 ##########
def r_loss(y_actual,y_pred):
    custom_loss=kb.abs(y_actual-y_pred)/y_actual
    return custom_loss

################## LSTM ##################
def sliced_df(df, train_cols, target_col, past_window=3) :
    """Slices a df to generate lstm training data (stride=1), assumes the df is sorted by date"""
    slices  = np.array([df[train_cols].values[i:i+past_window] for i in range(len(df)-past_window + 1)])
    targets = df[target_col].values[past_window-1:]
    return slices, targets

def build_lstm(input_dim, past_window=3, hidden_sizes=(100, 100), dropout=0.2, use_r_loss=False) :
    if(seed!=0):
        tf.random.set_seed(seed)
        npseed(seed)

    model_name = 'lstm-'+"-".join([str(x) for x in hidden_sizes])
    m = keras.Sequential(name=model_name)

    for e, s in enumerate(hidden_sizes) :
        if e != 0 :
            m.add(layers.Dense(s, activation='relu'))
            m.add(layers.Dropout(dropout, input_shape=(s,)))
        else :
            #m.add(layers.Dropout(dropout, input_shape=(input_dim,)))
            m.add(layers.LSTM(s, input_shape=(past_window, input_dim)))
            m.add(layers.Dropout(dropout, input_shape=(s,)))

    m.add(layers.Dense(1))

    loss = 'mse'
    if(use_r_loss):
        loss = r_loss

    m.compile(loss=loss,
            optimizer='adam',
            metrics=['mae', 'mse'])
    return m

def sliced_hybrid(df, const_cols, var_cols, target_col, past_window=3) :
    """Slices a df to generate hybrid_lstm training data (stride=1), assumes the df is sorted by date"""
    # Regular slicing
    train_cols = var_cols + const_cols
    slices  = np.array([df[train_cols].values[i:i+past_window] for i in range(len(df)-past_window + 1)])
    targets = df[target_col].values[past_window-1:]

    # Pop Mean of const features
    const_features = slices[:, :, -len(const_cols):].mean(axis=1)
    var_features = slices[:, :, :len(var_cols)]

    return const_features, var_features, targets


def build_hybrid_lstm(varying_cols, constant_cols, past_window=3, hidden_sizes=(100, 100), dropout=0.2, use_r_loss=False) :
    if(seed!=0):
        tf.random.set_seed(seed)
        npseed(seed)

    model_name = 'hybrid_lstm-'+"-".join([str(x) for x in hidden_sizes])

    # Build the LSTM
    varying_inp  = keras.Input(shape=(past_window, len(varying_cols)), name="varying_inp")
    # varying_inp  = keras.Input(shape=(past_window, len(varying_cols)), name="Time_series")
    constant_inp =  keras.Input(shape=(len(constant_cols), ), name="constant_inp")
    # constant_inp =  keras.Input(shape=(len(constant_cols), ), name="Constant_features")
    y = None
    for e, s in enumerate(hidden_sizes) :
        if e != 0 :
            # concatenate constant features at last layer
            if(e == len(hidden_sizes)-2):
                y = layers.Dense(s, activation='relu')(constant_inp)
                y = layers.Dropout(dropout)(y)
            else:
                # concatenate constant features at last layer
                if(e == len(hidden_sizes)-1):
                    if(y is None):
                        y = layers.Dense(10, activation='relu')(constant_inp)
                        y = layers.Dropout(dropout)(y)
                    x = layers.concatenate([x, y], name="concat")

                x = layers.Dense(s, activation='relu')(x)
                x = layers.Dropout(dropout)(x)
        else :
            x = layers.LSTM(s)(varying_inp)
            x = layers.Dropout(dropout)(x)

    target = layers.Dense(1, name="target")(x)

    # Instantiate an end-to-end model predicting both priority and department
    model = keras.Model(
        inputs=[varying_inp, constant_inp],
        outputs=target,
        name=model_name
    )

    loss = 'mse'
    if(use_r_loss):
        loss = r_loss

    model.compile(loss=loss,
            optimizer='adam',
            metrics=['mae', 'mse'])

    return model

################## MLP ##################
def build_mlp(input_dim, hidden_sizes=(100, 100)):
    """Creates a simple mlp, retrieved from https://www.tensorflow.org/tutorials/keras/regression"""
    if(seed!=0):
        tf.random.set_seed(seed)
        npseed(seed)

    model_name = 'mlp-'+"-".join([str(x) for x in hidden_sizes])
    model = keras.Sequential(name=model_name)
    for e, s in enumerate(hidden_sizes) :
        if e != 0 :
            model.add(layers.Dense(s, activation='relu'))
        else :
            layers.Dense(s, activation='relu', input_shape=[input_dim])

    model.add(layers.Dense(1))

    model.compile(loss='mse',
                optimizer='adam',
                metrics=['mae', 'mse'])
    return model

################## LINEAR ##################
def virgin_linear_regressor(ridge=False) :
    if(seed!=0):
        tf.random.set_seed(seed)
        npseed(seed)

    if ridge :
        return Ridge()
    else :
        return LinearRegression()

def linear_regressor(data, train_cols, target_col, kfold=True) :
    if(seed!=0):
        tf.random.set_seed(seed)
        npseed(seed)

    X = data[train_cols].values
    y = data[target_col].values

    if not kfold :
        return Ridge().fit(X, y)

    else :
        n_splits = 5
        kf = KFold(n_splits=n_splits)
        kf.get_n_splits(data.index)

        # Cross validate score
        coefs, intercept = np.zeros(len(X[0])), 0
        best_score = np.NINF

        for train_index, test_index in kf.split(data.values):

            X_train, X_test = X[train_index], X[test_index]
            y_train, y_test = y[train_index], y[test_index]

            reg = LinearRegression().fit(X_train, y_train)
            score = reg.score(X_test, y_test)

            # Update weights
            if score > best_score :
                coefs = reg.coef_
                intercept = reg.intercept_
                best_score = score

        # Build final clasifier
        reg = LinearRegression()
        reg.coef_ = coefs
        reg.intercept_ = intercept
        return reg

def RFE(data, train_cols, target_col, n_features=5) :
    if(seed!=0):
        tf.random.set_seed(seed)
        npseed(seed)

    X = data[train_cols].values
    y = data[target_col].values

    selector = feature_selection.RFE(LinearRegression(), n_features_to_select=5)
    selector.fit(X, y)

    column_names = data[train_cols].columns.map(lambda x: get_label(x))
    return sorted(zip(map(lambda x: round(x, 4), selector.ranking_), column_names))


def feature_importance(reg, train_cols, target_col='', abs_sort=True, is_reversed=False, save_path=None) :
    feat_importance = [(feature, score) for feature, score in zip(train_cols, reg.coef_)]
    if(abs_sort):
        feat_importance = sorted(feat_importance, key = lambda x : - np.abs(x[1]))
    else:
        factor = 1 - 2*is_reversed
        feat_importance = sorted(feat_importance, key = lambda x : factor*(x[1]))

    # for feature, score in feat_importance:
    #     print('Feature: {:60}, Score: {:.5f}'.format(get_label(feature), score))

    # plot feature importance
    fig = plt.gcf()
    fig.set_size_inches(10, 6)
    plt.title('Linear coefficients for "{}"'.format(get_label(target_col)), fontsize=25)
    plt.bar(range(len(reg.coef_)), [c[1] for c in feat_importance], color='#006699')
    plt.xticks(ticks=range(len(train_cols)), labels=[get_label(c[0]) for c in feat_importance], rotation=45, ha='right', fontsize=25)
    plt.ylabel('coefficient', fontsize=15)
    # plt.xlabel('feature', fontsize=15)

    if save_path is not None :
        plt.savefig(save_path, bbox_inches='tight')
    plt.show()

def parallel_coordinates(data, train_cols, target_col, group_attr='iso_code', save_path=None, width=4000, height=500) :
    print('Coefficients for {} prediction'.format(get_label(target_col)))
    profiles_df = pd.DataFrame()

    # Fit Ridge on each country
    def coef_as_serie(sub) : return pd.Series(np.array(linear_regressor(sub, train_cols, target_col, kfold=False).coef_))

    profiles_df[train_cols] = data.groupby(group_attr).apply(lambda sub : coef_as_serie(sub))
    profiles_df = profiles_df.reset_index()
    profiles_df['country_code'] = profiles_df[group_attr].astype('category').cat.codes

    max_val = profiles_df[train_cols].to_numpy().max()
    min_val = profiles_df[train_cols].to_numpy().min()

    dimensions = [{'range' : [min_val,max_val], 'label': get_label(c), 'values':profiles_df[c].values} for c in train_cols]
    fig = go.Figure(data=
        go.Parcoords(
            line = dict(color = profiles_df['country_code']),
            dimensions = dimensions
        )
    )

    fig.update_layout(
        autosize=True,
        width=width,
        height=height,
        margin=dict(
            l=50,
            r=50,
            b=100,
            t=100,
            pad=4
        )
    )

    if save_path is not None :
        fig.write_image(save_path)

    fig.show()

################## GENERAL ##################

def loo_indices(data, group_attr='iso_code', country=None) :
    """Returns a list of tuples (train, test) for leave-one-out training"""
    countries = data[group_attr].unique()
    tups = []
    for c in countries :
        if (country is None) or (c == country) :
            train_indices = data[group_attr] != c
            test_indices = ~train_indices
            tups.append((train_indices, test_indices))
    return tups

def plot_country(df_sub, model, train_cols, target_col, group_attr='iso_code', axis=None, error=True, plot_ground=True, train_prop=1.0, const_cols=None, plot=True) :
    """Plots results for a df"""

    # df_sub = df_sub.sort_values(by=['date'])

    # LSTM model, slice df before predicting
    if (type(model).__name__ == 'Sequential') and ('lstm' in model.name) :
        past_window = model.input_shape[1]

        sliced = sliced_df(df_sub, train_cols, target_col, past_window=past_window)
        pred = np.append([np.nan]*(past_window -1), model.predict(sliced)).flatten()

    elif hasattr(model, 'name') and 'hybrid_lstm' in model.name :

        if const_cols is None :
            raise Exception("Specifiy constant columns as a parameter")
        else :
            var_cols = [c for c in train_cols if c not in const_cols]

        past_window = model.input_shape[0][1]
        X_const, X_var, targets = sliced_hybrid(df_sub, const_cols, var_cols, target_col, past_window=past_window)
        pred = np.append([np.nan]*(past_window -1), model.predict([X_var, X_const])).flatten()

    else :
        pred = model.predict(df_sub[train_cols].values).flatten()

    x = df_sub.index
    y = df_sub[target_col]
    iso_code = df_sub[group_attr].values[0]

    train_size = int(len(x)*train_prop)

    error_curve = None
    error_weight = 0

    error_curve = np.abs(y - pred)
    mean_error = error_curve.mean()
    error_weight = len(error_curve)

    if plot and axis is None :
        plt.title("Predictions for {}".format(get_model_name(model), iso_code))

        if plot_ground :
            plt.plot(x, y, label='Ground ' + get_label(target_col))

        # plt.plot(x, pred, label='{} pred'.format(get_model_name(model)))

        plt.plot(x[:train_size], pred[:train_size], label='{} pred (train)'.format(get_model_name(model)))

        if(train_prop < 1.0):
            plt.plot(x[train_size-1:], pred[train_size-1:], label='{} pred (test)'.format(get_model_name(model)), color='red')

        if error :
            plt.plot(error_curve, label='Error')


        plt.gca().xaxis.set_major_locator(mdates.DayLocator(interval=7))
        plt.xticks(rotation=45, ha='right')

        plt.gca().legend()
        plt.ylabel(target_col)
        plt.xlabel('time')

    elif plot:
        axis.set_title("Predictions for {}".format(iso_code))

        if plot_ground :
            axis.plot(x, y, label='Ground ' + get_label(target_col))

        # axis.plot(x, pred, label='{} pred'.format(get_model_name(model)))

        axis.plot(x[:train_size], pred[:train_size], label='{} pred (train)'.format(get_model_name(model)))

        if(train_prop < 1.0):
            axis.plot(x[train_size-1:], pred[train_size-1:], label='{} pred (test)'.format(get_model_name(model)), color='red')

        if error :
            axis.plot(x, error_curve, label='Error')

        axis.xaxis.set_major_locator(mdates.DayLocator(interval=7))
        axis.xaxis.set_tick_params(rotation=45)

        axis.legend()
        axis.set_ylabel(target_col)
        axis.set_xlabel('time')

    return mean_error, error_weight

def plot_country_loo(df, model, train_cols, target_col, country, group_attr='iso_code',
                     epochs=60, plot=True, save_path=None, plot_hist=False, plot_ground=True, error=True,
                     df2=None, const_cols=None):
    if(seed!=0):
        tf.random.set_seed(seed)
        npseed(seed)

    # df = df.sort_values(by=['date'])

    early_stop = tf.keras.callbacks.EarlyStopping(monitor='loss', patience=5, restore_best_weights=True)

    # Get train and test indices for given df
    train_indices, test_indices = loo_indices(df, group_attr=group_attr, country=country)[0]

    # Train model
    X, y = df.loc[train_indices][train_cols].values, df.loc[train_indices][target_col].values

    if type(model).__name__ in ['LinearRegression', 'Ridge']:
        model.fit(X, y)
        model_name = type(model).__name__

    elif (('mlp' in model.name) or ('lstm' in model.name)) :

        if 'hybrid_lstm' in model.name :
            if const_cols is None :
                raise Exception("Specifiy constant columns as a parameter")
            else :
                var_cols = [c for c in train_cols if c not in const_cols]

            grouped = df.loc[train_indices] \
                        .groupby(group_attr) \
                        .apply(lambda df : sliced_hybrid(df, const_cols, var_cols, target_col, model.input_shape[0][1]))

            X_const = np.array([x for g in grouped for x in g[0]])
            X_var = np.array([x for g in grouped for x in g[1]])
            y =  np.array([x for g in grouped for x in g[2]])

            if(plot_hist):
                history = model.fit({"varying_inp": X_var, "constant_inp": X_const}, y, epochs=epochs, verbose=0, validation_split=0.2, callbacks=[early_stop])
            else:
                history = model.fit({"varying_inp": X_var, "constant_inp": X_const}, y, epochs=epochs, verbose=0, callbacks=[early_stop])

            model_name = model.name

        elif 'lstm' in model.name :

            grouped = df.loc[train_indices].groupby(group_attr).apply(lambda df : sliced_df(df, train_cols, target_col, model.input_shape[1]))
            X = np.array([x for g in grouped for x in g[0]])
            y =  np.array([x for g in grouped for x in g[1]])

            if(plot_hist):
                history = model.fit(X, y, epochs=epochs, verbose=0, validation_split=0.2, callbacks=[early_stop])
            else:
                history = model.fit(X, y, epochs=epochs, verbose=0, callbacks=[early_stop])

            model_name = model.name

    else:
        raise Exception("Unknown model : {}".format(type(model).__name__))

    ground = df.loc[test_indices][target_col]

    # LSTM model, slice df before predicting
    if (type(model).__name__ == 'Sequential') and ('lstm' in model.name) :
        past_window = model.input_shape[1]

        sliced = sliced_df(df[test_indices], train_cols, target_col, past_window=past_window)
        pred = np.append([np.nan]*(past_window -1), model.predict(sliced)).flatten()

        if(df2 is not None):
            sliced2 = sliced_df(df2[test_indices], train_cols, target_col, past_window=past_window)
            pred2 = np.append([np.nan]*(past_window -1), model.predict(sliced2)).flatten()

    elif hasattr(model, 'name') and 'hybrid_lstm' in model.name :
        past_window = model.input_shape[0][1]

        X_const, X_var, targets = sliced_hybrid(df[test_indices], const_cols, var_cols, target_col, past_window=past_window)
        pred = np.append([np.nan]*(past_window -1), model.predict([X_var, X_const])).flatten()

        if(df2 is not None):
            X_const2, X_var2, targets2 = sliced_hybrid(df2[test_indices], const_cols, var_cols, target_col, past_window=past_window)
            pred2 = np.append([np.nan]*(past_window -1), model.predict([X_var2, X_const2])).flatten()

    else :
        pred = model.predict(df.loc[test_indices][train_cols].values).flatten()

        if(df2 is not None):
            pred2 = model.predict(df2.loc[test_indices][train_cols].values).flatten()

    error_curve = np.abs(ground - pred)
    mean_error = error_curve.mean()

    if(df2 is not None):
        impact_curve = (pred2 - pred)
        mean_impact = impact_curve[~np.isnan(impact_curve)].mean()

    x = df.loc[test_indices].index

    if(plot_hist):
        print(history)
        plt.plot(history.history['loss'], label='training data error')
        plt.plot(history.history['mae'], label='MAE (validation data)')
        plt.title('loss')
        plt.ylabel('error value')
        plt.xlabel('No. epoch')
        plt.legend(loc="upper left")
        plt.show()

    if(plot):
        fig = plt.figure(figsize=(12,3), dpi=100)
        import pycountry
        country_name = pycountry.countries.get(alpha_3=country).name
        # plt.title('Prediction of "{}" by {} for {}'.format(get_label(target_col), get_model_name(model), country_name), fontsize=15)
        plt.title('Prediction of "{}" for {}'.format(get_label(target_col), country_name), fontsize=20)
        plt.plot(x, ground, label='Ground ' + get_label(target_col))
        plt.plot(x, pred, label='Prediction')
        if(df2 is not None):
            plt.plot(x, pred2, label='Prediction with modified data')
            plt.plot(x, [0]*len(x), color='black', linewidth='1')

        if error :
            if(df2 is not None):
                plt.plot(x, impact_curve, label='Impact of policy')
            else:
                plt.plot(error_curve, label='Error')

        plt.gca().xaxis.set_major_locator(mdates.DayLocator(interval=7))
        plt.xticks(rotation=45, ha='right')
        plt.gca().legend()
        plt.ylabel(get_label(target_col), fontsize=15)
        plt.xlabel('time')

        if save_path is not None :
            plt.savefig(save_path, bbox_inches='tight')
        plt.show()

    if(df2 is not None):
        return mean_impact
    else:
        return mean_error

def plot_all_countries_loo(data, build_model_funcs, train_cols, target_col, epochs=20, group_attr='iso_code', n_countries=None, save_path='../data/model_plots/all_countries_loo/', plot=True, error=True, const_cols=None):
    """Plot performance of models for several countries"""

    # Create subplots with fixed aspect ratios
    if(plot):
        ncols=5
        nrows=int((len(data[group_attr].unique())/ncols) + 1)
        figsize=(6.4*ncols, 4.8*nrows)
        fig, axs = plt.subplots(nrows, ncols,figsize=figsize)

        if n_countries is None :
            n_countries = len(data[group_attr].unique())

    model_name = ""

    mean_errors = {}
    tot_error_weight = 0
    tot_error = 0

    early_stop = tf.keras.callbacks.EarlyStopping(monitor='loss', patience=5, restore_best_weights=True)

    for e, indices in tqdm_notebook(enumerate(loo_indices(data, group_attr=group_attr)[:n_countries])) :

        for i, build_model_func in enumerate(build_model_funcs):
            if(seed!=0):
                tf.random.set_seed(seed)
                npseed(seed)

            train_indices, test_indices = indices

            model = build_model_func()

            # Train model
            X, y = data.loc[train_indices][train_cols].values, data.loc[train_indices][target_col].values

            if type(model).__name__ in ['LinearRegression', 'Ridge']:
                model.fit(X, y)
                model_name = type(model).__name__

            elif 'hybrid_lstm' in model.name :
                if const_cols is None :
                    raise Exception("Specifiy constant columns as a parameter")
                else :
                    var_cols = [c for c in train_cols if c not in const_cols]

                grouped = data.loc[train_indices] \
                            .groupby(group_attr) \
                            .apply(lambda df : sliced_hybrid(df, const_cols, var_cols, target_col, model.input_shape[0][1]))

                X_const = np.array([x for g in grouped for x in g[0]])
                X_var = np.array([x for g in grouped for x in g[1]])
                y =  np.array([x for g in grouped for x in g[2]])

                history = model.fit({"varying_inp": X_var, "constant_inp": X_const}, y, epochs=epochs, verbose=0, callbacks=[early_stop])
                model_name = model.name

            elif (type(model).__name__ == 'Sequential') and (('mlp' in model.name) or ('lstm' in model.name)) :

                if 'lstm' in model.name :

                    grouped = data.loc[train_indices].groupby(group_attr).apply(lambda df : sliced_df(df, train_cols, target_col, model.input_shape[1]))
                    X = np.array([x for g in grouped for x in g[0]])
                    y =  np.array([x for g in grouped for x in g[1]])

                history = model.fit(X, y, epochs=epochs, verbose=0, callbacks=[early_stop])
                model_name = model.name

            else:
                raise Exception("Unknown model : {}".format(type(model).__name__))


            # Plot prediction for country
            if(plot):
                row = int(e / ncols)
                col = e % ncols

                axis = axs[row, col] if nrows > 1 else axs[col]
            else:
                axis=None

            mean_error, error_weight = plot_country(data[test_indices], model, train_cols, target_col, axis=axis, error=error, plot_ground=i==0, group_attr=group_attr, const_cols=const_cols, plot=plot)
            iso_code = data[test_indices][group_attr].values[0]
            tot_error_weight += error_weight
            tot_error += mean_error*error_weight
            mean_errors[iso_code] = mean_error
            print(iso_code, mean_error)

    if(plot):
        fig.suptitle('Leave-one-out {} predictions for {} model'.format(target_col, model_name))
        fig.tight_layout(rect=[0, 0.03, 1, 0.95])

        # Save results
        if save_path is not None:
            datestr = datetime.datetime.today().strftime("%d-%B-%Y_%H:%M:%S")
            fig.savefig(save_path+datestr+'.png', bbox_inches='tight')

    return (tot_error/tot_error_weight), mean_errors

def plot_all_countries_indiv(data, build_model_funcs, train_cols, target_col, group_attr='iso_code', n_countries=None, save_path=None, error=True, train_prop=0.8):
    """Plot performance of models for several countries"""

    # Create subplots with fixed aspect ratios
    ncols=5
    nrows=int((len(data[group_attr].unique())/ncols) + 1)
    figsize=(6.4*ncols, 4.8*nrows)
    fig, axs = plt.subplots(nrows, ncols,figsize=figsize)

    if n_countries is None :
        n_countries = len(data[group_attr].unique())

    model_name = ""
    early_stop = tf.keras.callbacks.EarlyStopping(monitor='loss', patience=5, restore_best_weights=True)

    for e, group in enumerate(data[group_attr].unique()):

        group_data = data[data[group_attr] == group]

        for i, build_model_func in enumerate(build_model_funcs):
            if(seed!=0):
                tf.random.set_seed(seed)
                npseed(seed)

            model = build_model_func()

            # Train model
            X, y = group_data[train_cols].values, group_data[target_col].values
            split_point = int(len(X)*train_prop)

            if type(model).__name__ in ['LinearRegression', 'Ridge']:
                model.fit(X[:split_point], y[:split_point])
                model_name = type(model).__name__

            elif (type(model).__name__ == 'Sequential') and (('mlp' in model.name) or ('lstm' in model.name)) :

                if 'lstm' in model.name :

                    grouped = group_data.groupby(group_attr).apply(lambda df : sliced_df(df, train_cols, target_col, model.input_shape[1]))
                    X = np.array([x for g in grouped for x in g[0]])
                    y =  np.array([x for g in grouped for x in g[1]])

                history = model.fit(X, y, epochs=20, validation_split = 1-train_prop, verbose=0, callbacks=[early_stop])
                model_name = model.name

            else:
                raise Exception("Unknown model : {}".format(type(model).__name__))


            # Plot prediction for country
            row = int(e / ncols)
            col = e % ncols

            axis = axs[row, col] if nrows > 1 else axs[col]

            plot_country(group_data, model, train_cols, target_col, axis=axis, error=error, plot_ground=i==0, group_attr=group_attr, train_prop=train_prop)

    fig.suptitle('Individual {} predictions for {} model'.format(target_col, model_name))
    fig.tight_layout(rect=[0, 0.03, 1, 0.95])

    # Save results
    if save_path is not None :
        fig.savefig(save_path, bbox_inches='tight')


def get_model_name(model) :
    if type(model).__name__ in ['LinearRegression', 'Ridge'] :
        model_name = type(model).__name__

    elif 'hybrid_lstm' in model.name :
        model_name = model.name

    elif (type(model).__name__ == 'Sequential') and (('mlp' in model.name) or ('lstm' in model.name)) :
        model_name = model.name

    else :
        raise Exception("Unknown model : {}".format(type(model).__name__))

    return model_name



def cross_correlations(df, cols, method='spearman', save=False, name='') :
    df = df[cols]
    df.columns = df.columns.to_series().apply(get_label)

    fig, ax = plt.subplots(figsize=(60, 60))

    sns.heatmap(df.corr(method=method), annot=True, fmt='.3f', annot_kws={'fontsize':30}, cmap=plt.get_cmap('coolwarm'), cbar=False, ax=ax)
    ax.set_yticklabels(ax.get_yticklabels(), rotation="horizontal", size=70)
    ax.set_xticklabels(ax.get_xticklabels(), rotation=45, ha='right', size=70)

    b, t = ax.get_ylim() # discover the values for bottom and top
    l, r = ax.get_xlim() # discover the values for left and right

    b += 0.5 # Add 0.5 to the bottom
    l -= 0.5 # Subtract 0.5 to the left

    ax.set_ylim(b, t) # update the ylim(bottom, top) values
    ax.set_xlim(l, r) # update the xlim(bottom, top) values

    if save :
        fig.savefig("../data/model_plots/correlations/{}_{}_corr.png".format(method, name), bbox_inches='tight')
    plt.show()
