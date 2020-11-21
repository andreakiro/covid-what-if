import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

policy_tracker_url = 'https://github.com/OxCGRT/covid-policy-tracker/raw/master/data/timeseries/OxCGRT_timeseries_all.xlsx'
# policy_tracker_url = 'data/oxford/OxCGRT_timeseries_all.xlsx'

policies_desciption = {
    'c1': 'school closing',
    'c2': 'workplace closing',
    'c3': 'cancel public events',
    'c4': 'gathering size restrictions',
    'c5': 'close public transport',
    'c6': '“shelter-in-place” and home confinement orders',
    'c7': 'internal movement restrictions',
    'c8': 'international travel restrictions',
    'e1': 'income support',
    'e2': 'debt/contract relief for households',
    'e3': 'fiscal measures',
    'e4': 'giving international support',
    'h1': 'public information campaign',
    'h2': 'testing policy',
    'h3': 'contact tracing',
    'h4': 'emergency investment in healthcare',
    'h5': 'investment in Covid-19 vaccines',
    'm1': 'other responses'
}

def create_policies_description(filter=''):
    description = ''

    for code in policies_desciption:
        if(filter in code):
            desc = policies_desciption[code]
            description += code + ': ' + desc + '\n'

    return description[:-1]
policies_description_text = create_policies_description(filter='c')

level_descriptions = {
    'c1-2': 'Partial requirement (some level categories)',
    'c1-3': 'Requirement',

    'c2-2': 'Partial requirement (some sectors)',
    'c2-3': 'Requirement',

    'c3-2': 'Requirement',

    'c4-1': '>1000 people',
    'c4-2': '101-1000 people',
    'c4-3': '11-100 people',
    'c4-4': '<10 people',

    'c6-2': 'Requirement with exceptions',
    'c6-3': 'Requirement with minimal exceptions',

    'c8-1': 'Screening',
    'c8-2': 'Quarantine arrivals from high-risk regions',
    'c8-3': 'Ban of arrivals from some regions',
    'c8-3': 'Total border closure',
}

def get_level_description(level, policy):
    if(policy[0] != 'c'):
        return level

    if(policy[:2]+'-'+str(int(level)) in level_descriptions):
        return level_descriptions[policy[:2]+'-'+str(int(level))]

    if level == 0:
        return 'No measure'
    elif level == 1:
        return 'Recommendation'
    elif level >= 2:
        return 'Requirement'

def create_policies_dict(policies_data, country_iso, policies_to_consider):
    policy_dict = {}

    for policy in policies_data:
        dates_dict = {}

        policy_data = policies_data[policy]
        country_policy = policy_data[policy_data.CountryCode == country_iso]

        if(country_policy.size == 0):
            return {}

        country_policy = country_policy.transpose()[2:]
        country_policy.index = pd.to_datetime(country_policy.index)

        change = country_policy != country_policy.shift(1)
        policy_appearance = country_policy[change]
        policy_appearance = policy_appearance[policy_appearance > 0].dropna()
        policy_appearance = policy_appearance.iloc[:, 0]

        for date, value in policy_appearance.items():
            dates_dict.update({value: date})

        if(dates_dict):
            policy_dict.update({policy: dates_dict})

    return policy_dict

def plot_grid_from_array(policies_array, country, rows, columns, single_pol=False, save_path=None):

    fig, ax = plt.subplots(figsize=(policies_array.shape[1]/3, policies_array.shape[0]/3), dpi=100)

    im = ax.imshow(policies_array, vmin=0, vmax=4, cmap='YlOrRd')

    period = 7 if single_pol else 1

    # We want to show all ticks...
    ax.set_xticks(np.arange(len(columns))[::period])
    ax.set_yticks(np.arange(len(rows)))

    # Minor ticks
    ax.set_xticks(np.arange(-.5, len(columns), 1), minor=True);
    ax.set_yticks(np.arange(-.5, len(rows), 1), minor=True);

    # ... and label them with the respective list entries
    if(single_pol):
        ax.set_xticklabels(columns[::period], fontsize=40)
        ax.set_yticklabels(' ')
    else:
        ax.set_xticklabels(columns)
        ax.set_yticklabels(rows)

    # Rotate the tick labels and set their alignment.
    plt.setp(ax.get_xticklabels(), rotation=45, ha="right", rotation_mode="anchor")

    # Gridlines based on minor ticks
    ax.grid(which='minor', color='black', linestyle='-', linewidth=1)

    policy_name = get_label(rows[0]) if single_pol else 'policy'
    ax.set_title('Evolution of '+ policy_name +' level in ' + country, fontsize=40)
    fig.tight_layout()
    if save_path is not None :
        plt.savefig(save_path, bbox_inches='tight')
    plt.show()


def create_country_timeline(policy_data, country_iso, policies_to_consider):
    policy_dict = create_policies_dict(policy_data, country_iso, policies_to_consider)

    country_timeline = {}

    for policy in policy_dict:
        dates_dict = policy_dict[policy]

        for level in dates_dict:
            date = dates_dict[level]

            if date in country_timeline:
                country_timeline[date].update({policy: level})
            else:
                country_timeline.update({date: {policy: level}})

    return country_timeline

def get_time_evolution(policy_tracker_url=policy_tracker_url, policies_to_consider=None):
    time_evolution_dict = {}

    policies_data = pd.read_excel(policy_tracker_url, sheet_name=policies_to_consider)

    for policy in policies_to_consider:
        policy_data = policies_data[policy]
        policy_data = policy_data[policy_data.CountryCode.notnull()]
        policy_data = policy_data.set_index('CountryCode').transpose()[1:]
        policy_data.index = pd.to_datetime(policy_data.index.rename('date'))
        policy_data = policy_data.fillna(0)
        policy_data = policy_data.stack().to_frame()
        policy_data = policy_data.reset_index()
        policy_data = policy_data.set_index('date')
        policy_data = policy_data.rename(columns={0: 'level'})

        policy_data['level_1'] = 1*(policy_data.level == 1)
        policy_data['level_2'] = 1*(policy_data.level == 2)
        policy_data['level_3'] = 1*(policy_data.level == 3)
        policy_data['level_4'] = 1*(policy_data.level == 4)

        time_evolution_dict[policy] = policy_data

    return time_evolution_dict

def get_timeline_policies(country_iso, policy_tracker_url=policy_tracker_url, policies_to_consider=None):
    policy_data = pd.read_excel(policy_tracker_url, sheet_name=policies_to_consider)

    return create_country_timeline(policy_data, country_iso, policies_to_consider)

def get_policies(country_iso, policy_tracker_url=policy_tracker_url, policies_to_consider=None):
    policy_data = pd.read_excel(policy_tracker_url, sheet_name=policies_to_consider)

    return create_policies_dict(policy_data, country_iso, policies_to_consider)

def download_stringency_data(policy_tracker_url=policy_tracker_url):
    stringency_data = pd.read_excel(policy_tracker_url, sheet_name='index_stringency')

    return stringency_data

def get_country_stringency(country_iso, policy_tracker_url=policy_tracker_url, stringency_data=None):
    if(stringency_data is None):
        stringency_data = download_stringency_data(policy_tracker_url=policy_tracker_url)

    country_stringency = stringency_data[stringency_data.CountryCode == country_iso]
    if(country_stringency.size == 0):
        return None

    country_stringency = country_stringency.transpose()[2:]
    country_stringency.index = pd.to_datetime(country_stringency.index.rename('date'))
    country_stringency.rename(columns={country_stringency.columns[0]: "stringency" }, inplace=True)

    return country_stringency
