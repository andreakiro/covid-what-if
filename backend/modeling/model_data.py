import sys
sys.path.insert(0, '../')

import yaml
import pandas as pd
import numpy as np
import pycountry
import pycountry_convert as pc
import pickle as pkl
import math

with open('modeling/epi_config.yaml', 'r') as file:
    config = yaml.load(file, Loader=yaml.FullLoader)

no_norm_cols = [
    'shifted_r_estim', # Just for testing
    'shifted_r_estim_past', # Just for testing
    'shifted_r_estim_smooth', # Just for testing
    'r_estim', # Just for testing
    'case_smooth_past', # Just for testing

    'epi_progress',
    'epi_progress_rel',
    'epi_progress_rel_log',
    'epi_progress_log',

    'Africa',
    'Europe',
    'Asia',
    'North America',
    'South America',
    'Oceania',
]

constant_cols = [
    'population',
    'population_density',
    'median_age',
    'aged_65_older',
    'aged_70_older',
    'gdp_per_capita',

    'Africa',
    'Europe',
    'Asia',
    'North America',
    'South America',
    'Oceania',
]

policies_desciption = {
    'c1_': 'school closing',
    'c2_': 'workplace closing',
    'c3_': 'cancel public events',
    'c4_': 'gathering size restrictions',
    'c5_': 'close public transport',
    'c6_': '“shelter-in-place” and home confinement orders',
    'c7_': 'restrictions on internal movement',
    'c8_': 'restrictions on international travel',
    'e1_': 'income support',
    'e2_': 'debt/contract relief for households',
    'e3_': 'fiscal measures',
    'e4_': 'giving international support',
    'h1_': 'public information campaign',
    'h2_': 'testing policy',
    'h3_': 'contact tracing',
    'h4_': 'emergency investment in healthcare',
    'h5_': 'investment in Covid-19 vaccines',
    'h6_': 'facial covering',
    'm1_': 'other responses'
}

def get_label(name):
    if(name[:3] in policies_desciption):
        name = policies_desciption[name[:3]] + ' ' + name[3:].replace('_', ' ')
        name = name.replace('“shelter-in-place” and ', '')
        name = name.replace(' level', '')

        name = name.replace('restrictions on ', '')
        name = name.replace('gathering size', 'gathering size restrictions')
        name = name.replace('internal movement', 'internal movement restrictions')
        name = name.replace('international travel', 'international travel restrictions')
    else:
        name = name.replace('_r_', '_R_')
        name = name.replace('shifted_', '')

        name = name.replace('epi_progress_rel', 'outbreak progression')
        name = name.replace('epi_progress', 'outbreak progression')
        name = name.replace('aged_65', 'aged 65 or')

        name = name.replace('aged_65', 'aged 65 or')
        name = name.replace('aged_75', 'aged 75 or')

        name = name.replace('maxtempC', 'maximum temperature')
        name = name.replace('mintempC', 'minimum temperature')
        name = name.replace('FeelsLikeC', 'perceived temperature')

        name = name.replace('norm', 'normalized')
        name = name.replace('rel', 'relative')
        name = name.replace('num', 'number of')
        name = name.replace('estim', 'estimation')

        name = name.replace('case', 'number of cases')
        name = name.replace('death', 'number of deaths')
        name = name.replace('test', 'number of tests')

        name = name.replace('_percent_change_from_baseline', '')
        if name != 'canton_code':
            name = name.replace('_', ' ')
    return name

def normalize_but_country(data, train_cols, country) :
    n_data = data.copy()
    
    # Decide what columns to normalize
    train_ndata = n_data[n_data['iso_code'] != country]
    stds = train_ndata.std().values
    norm_cols = [c for c, s in zip(train_cols, stds) if (c not in no_norm_cols) and (s != 0)]
    
    # Get train weights on train countries to avoid info leak
    train_mean = train_ndata[norm_cols].mean()
    train_std  = train_ndata[norm_cols].std()
    
    n_data[norm_cols]=(n_data[norm_cols]-train_mean)/train_std
    
    return n_data, train_mean, train_std, norm_cols
    

def get_model_data(train_cols, target_col, group_attr='iso_code', max_r=config['max_r'],
                    filename='model_data_owid.csv', augment_frac=0, dropna=True, normalize=False, r_shift=config['r_shift']):
    data = pd.read_csv('data/merged_data/' + filename, parse_dates=['date']).set_index('date')

    # Generate shifted columns for r estimations
    data['r_estim'] = data['r_estim'].apply(lambda x: np.nan if x >= max_r else x)
    data['shifted_r_estim'] = data['r_estim'].shift(r_shift).where(data[group_attr].eq(data[group_attr].shift(r_shift)))

    # Generate weekdays data
    reference_monday = pd.Timestamp('20200227')
    data['weekday'] = (data.index-reference_monday).days % 7 + 1
    data['monday'] = 0 + (data['weekday'] == 1)
    data['tuesday'] = 0 + (data['weekday'] == 2)
    data['wednesday'] = 0 + (data['weekday'] == 3)
    data['thursday'] = 0 + (data['weekday'] == 4)
    data['friday'] = 0 + (data['weekday'] == 5)
    data['saturday'] = 0 + (data['weekday'] == 6)
    data['sunday'] = 0 + (data['weekday'] == 7)

    # Generate dummies for continents
    data['Africa'] = 0 + (data['continent'] == 'Africa')
    data['Europe'] = 0 + (data['continent'] == 'Europe')
    data['Asia'] = 0 + (data['continent'] == 'Asia')
    data['North America'] = 0 + (data['continent'] == 'North America')
    data['South America'] = 0 + (data['continent'] == 'South America')
    data['Oceania'] = 0 + (data['continent'] == 'Oceania')

    # Remove unused columns
    data = data[[group_attr] + train_cols + [target_col]]

    if augment_frac > 0:
        data = augment_with_noise(data, train_cols, frac=augment_frac)

       
    for pol_col in [x for x in data.columns if 'level' in x]:
        data[pol_col] = data[pol_col].fillna(0)

    # Remove lines for which we don't have complete data
    if(dropna):
        data = data.dropna()

    return data

# Check if country has sufficient number of days with r_estim
def is_complete(data, iso_code, min_ratio):
    data_country = data[data.iso_code==iso_code].r_estim.dropna()
    n_values = data_country.shape[0]
    n_days = (data_country.index[-1] - data_country.index[0]).days + 1
    ratio = n_values/n_days

    return ratio > min_ratio

def get_relevant_countries(min_cases=config['min_cases'], continents=None, min_ratio=config['min_ratio']):
    data = pd.read_csv('../data/merged_data/model_data_owid.csv', parse_dates=['date']).set_index('date')

    data_suff = data[data.cumul_case > min_cases]
    relevant_countries_iso = data_suff.iso_code.unique()

    if continents is not None:
        relevant_countries_iso = [c for c in relevant_countries_iso if pc.country_alpha2_to_continent_code(pycountry.countries.get(alpha_3=c).alpha_2) in continents]

    relevant_countries_iso = list(filter(lambda iso_code: is_complete(data, iso_code, min_ratio), relevant_countries_iso))

    return relevant_countries_iso

# def get_relevant_states(min_cases=200):
#     data = pd.read_csv('../data/merged_data/model_data_usa.csv', parse_dates=['date'])
#
#     data = data[data.cumul_case > min_cases]
#     relevant_states = data.region.unique()
#
#     return relevant_states
#
# def get_relevant_cantons(min_cases=100):
#     data = pd.read_csv('../data/merged_data/model_data_swiss.csv', parse_dates=['date'])
#
#     data = data[data.cumul_case > min_cases]
#     relevant_cantons = data.canton_code.unique()
#
#     return relevant_cantons

def augment_with_noise(df, cols_to_augment, frac=0.5) :
    # sample *frac* lines from df
    augmented = df.sample(frac=frac)

    # Add noise to lines
    noise = np.random.randn(len(augmented), len(cols_to_augment)) / 10
    augmented[cols_to_augment] = augmented[cols_to_augment] + noise

    # Return original df concatenated with new noisy rows
    return pd.concat((df, augmented)).reset_index(drop=True)

def split_features(features, data):
    constant_cols = set()
    variable_cols = set()

    iso_code_list = data.iso_code.unique()

    for col in features:
        is_constant = True
        for iso_code in iso_code_list:
            test = data[data.iso_code == iso_code][col]

            if(test.max()-test.min() != 0):
                variable_cols.add(col)
                is_constant = False
                break
        if is_constant:
            constant_cols.add(col)

    constant_cols = list(constant_cols)
    variable_cols = list(variable_cols)

    return constant_cols, variable_cols
