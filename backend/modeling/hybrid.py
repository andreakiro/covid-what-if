import yaml
import os
import torch
from torch import nn, optim
import pytorch_lightning as pl
from torch.utils.data import DataLoader, Dataset
from pytorch_lightning.callbacks import EarlyStopping, ModelCheckpoint
from pytorch_lightning.loggers import TensorBoardLogger
from pytorch_lightning import seed_everything
from argparse import Namespace

import numpy as np

with open('model_config.yaml', 'r') as file:
    config = yaml.load(file, Loader=yaml.FullLoader)

seed_everything(config['seed'])

################## Model Definition ##################

class HybridLSTM(pl.LightningModule):

    def __init__(self, hparams):

        super().__init__()
        
        if isinstance(hparams, dict):
            hparams = Namespace(**hparams)
        self.hparams = hparams
        
        self.hidden_sizes=config['hidden_size']
        self.dropout=config['dropout']
        self.lr = config['default_lr']
        self.batch_size = config['default_batch_size']
        
        self.lstm_1 = nn.LSTM(input_size=len(self.hparams.var_cols),
                              hidden_size=self.hidden_sizes[0],
                              num_layers=1,
                              batch_first=True).double()
        self.lstm_2 = nn.Dropout(self.dropout)

        self.linear_1 = nn.Linear(len(self.hparams.const_cols), self.hidden_sizes[1]).double()
        self.linear_2 = torch.nn.ReLU()
        self.linear_3 = nn.Dropout(self.dropout)

        self.mixed_1 = nn.Linear(self.hidden_sizes[0] + self.hidden_sizes[2], 1).double()
        self.mixed_2 = torch.nn.ReLU()

        
        
    def create_dataloaders(self, train_data, val_data) :
        
        # Register data
        self.train_data = train_data
        self.val_data = val_data
        
    def forward(self, x):

        x_mlp, x_lstm = x

        x1, _ = self.lstm_1(x_lstm)
        x1 = x1[:, x1.size(1)-1,  :]
        x1 = self.lstm_2(x1)

        x2 = self.linear_1(x_mlp)
        x2 = self.linear_2(x2)
        x2 = self.linear_3(x2)

        x = torch.cat((x1, x2), dim=1)

        x = self.mixed_1(x)
        x = self.mixed_2(x)

        return x

    def configure_optimizers(self):
        return optim.Adam(self.parameters(), lr=self.lr)

    def train_dataloader(self):
        dataset = HybridDataset(self.train_data)
        return DataLoader(dataset, batch_size=self.batch_size, num_workers=8, shuffle=True)

    def val_dataloader(self):
        dataset = HybridDataset(self.val_data)
        return DataLoader(dataset, batch_size=self.batch_size, num_workers=1)

    def training_step(self, batch, batch_nb):
        x, y = batch
        pred = self(x)
        pred = pred.reshape(pred.size(0))
        loss = nn.functional.mse_loss(pred, y)
        self.log('train_loss', loss)
        return {'loss': loss}

    def validation_step(self, batch, batch_nb):
        x, y = batch
        pred = self(x)
        pred = pred.reshape(pred.size(0))
        loss = nn.functional.mse_loss(pred, y)
        self.log('val_loss', loss)
        return {'val_loss': loss}

    def validation_epoch_end(self, outputs):
        val_loss_mean = sum([o['val_loss'] for o in outputs]) / len(outputs)
        self.log('val_loss', val_loss_mean.item())
        print('.', end='')

################## Data-related functions and classes ##################

class HybridDataset(Dataset):
    def __init__(self, data):
        self.X_mlp, self.X_lstm, self.y = data

    def __getitem__(self, index):
        return ((self.X_mlp[index], self.X_lstm[index]), self.y[index])

    def __len__(self):
        return self.y.size()[0]


def sliced_hybrid(df, const_cols, var_cols, target_col, past_window=config['past_window']) :
    """Slices a df to generate hybrid_lstm training data (stride=1), assumes the df is sorted by date"""
    
    # Regular slicing
    train_cols = var_cols + const_cols
    slices  = np.array([df[train_cols].values[i:i+past_window] for i in range(len(df)-past_window + 1)])
    targets = df[target_col].values[past_window-1:]

    # Pop Mean of const features
    const_features = slices[:, :, -len(const_cols):].mean(axis=1)
    var_features = slices[:, :, :len(var_cols)]

    return const_features, var_features, targets


def format_for_hybrid(X_mlp, X_lstm, y) :
    X_mlp = torch.from_numpy(X_mlp)
    X_lstm = torch.from_numpy(X_lstm)
    y = torch.from_numpy(y)
    nb_batches = len(y)
    dataloaders = list(zip(X_lstm, X_mlp, y))

    return X_mlp, X_lstm, y, nb_batches, dataloaders

################## Training method ##################

def train_hybrid(var_cols, const_cols, target_col, train_data, val_data, country) :
    

    # Create model
    model = HybridLSTM({"var_cols"    : var_cols,
                        "const_cols"  : const_cols, 
                        "target_col"  : target_col,
                        "country"     : country,
                        "past_window" : train_data[1].size(1)})
    model.create_dataloaders(train_data, val_data)

    # Callbacks
    early_stop_callback = EarlyStopping(monitor='val_loss',
                                        min_delta=0.00,
                                        patience=config['patience'],
                                        verbose=True,
                                        mode='min')


        
    # Training
    logger = TensorBoardLogger('tb_logs', name=f'hybrid_{country}')
    trainer = pl.Trainer(gpus=1, min_epochs=1, max_epochs=config['max_epochs'], auto_lr_find=config['auto_lr_find'],
                         auto_scale_batch_size=config['auto_scale_batch_size'], progress_bar_refresh_rate=0, 
                         callbacks=[early_stop_callback], logger=logger)
    trainer.fit(model)
    
    # Save model
    save_dir = f'./models/{country}'
    if not os.path.isdir(save_dir) :
        os.makedirs(save_dir)
    trainer.save_checkpoint(os.path.join(save_dir, "model.ckpt"))

    return model
