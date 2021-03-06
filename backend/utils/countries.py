import os

def getIso(country):
    return country_map_iso.get(country, None)

def getCountry(iso):
    return iso_map_country.get(iso, None)

def getCountries():
    return list(iso_map_country.values())

def getAvailableCountries():
    countries = []
    root = os.getcwd()
    dir = root + '/modeling/models'
    for path, subdirs, files in os.walk(dir):
        for iso in subdirs:
            countries.append(getCountry(iso))
    return countries

iso_map_country = {
    'AE': 'United Arab Emirates',
    'AF': 'Afghanistan',
    'AG': 'Antigua and Barbuda',
    'AO': 'Angola',
    'AR': 'Argentina',
    'AT': 'Austria',
    'AU': 'Australia',
    'AW': 'Aruba',
    'BA': 'Bosnia and Herzegovina',
    'BB': 'Barbados',
    'BD': 'Bangladesh',
    'BE': 'Belgium',
    'BQ': 'Bonaire Sint Eustatius and Saba',
    'BF': 'Burkina Faso',
    'BG': 'Bulgaria',
    'BH': 'Bahrain',
    'BJ': 'Benin',
    'BO': 'Bolivia',
    'BR': 'Brazil',
    'BS': 'The Bahamas',
    'BW': 'Botswana',
    'BY': 'Belarus',
    'BZ': 'Belize',
    'CA': 'Canada',
    'CHE': 'Switzerland',
    'CI': "Côte d'Ivoire",
    'CL': 'Chile',
    'CM': 'Cameroon',
    'CO': 'Colombia',
    'CR': 'Costa Rica',
    'CV': 'Cape Verde',
    'CZ': 'Czechia',
    'DE': 'Germany',
    'DK': 'Denmark',
    'DO': 'Dominican Republic',
    'EC': 'Ecuador',
    'EE': 'Estonia',
    'EG': 'Egypt',
    'ES': 'Spain',
    'FI': 'Finland',
    'FJ': 'Fiji',
    'FR': 'France',
    'GA': 'Gabon',
    'GB': 'United Kingdom',
    'GE': 'Georgia',
    'GH': 'Ghana',
    'GR': 'Greece',
    'GT': 'Guatemala',
    'GW': 'Guinea-Bissau',
    'HK': 'Hong Kong',
    'HN': 'Honduras',
    'HR': 'Croatia',
    'HT': 'Haiti',
    'HU': 'Hungary',
    'ID': 'Indonesia',
    'IE': 'Ireland',
    'ISR': 'Israel',
    'IN': 'India',
    'IQ': 'Iraq',
    'ITA': 'Italy',
    'JM': 'Jamaica',
    'JO': 'Jordan',
    'JP': 'Japan',
    'KE': 'Kenya',
    'KG': 'Kyrgyzstan',
    'KH': 'Cambodia',
    'KR': 'South Korea',
    'KW': 'Kuwait',
    'KZ': 'Kazakhstan',
    'LA': 'Laos',
    'LB': 'Lebanon',
    'LI': 'Liechtenstein',
    'LK': 'Sri Lanka',
    'LT': 'Lithuania',
    'LU': 'Luxembourg',
    'LV': 'Latvia',
    'LY': 'Libya',
    'MD': 'Moldova',
    'MK': 'North Macedonia',
    'ML': 'Mali',
    'MM': 'Myanmar (Burma)',
    'MN': 'Mongolia',
    'MT': 'Malta',
    'MU': 'Mauritius',
    'MX': 'Mexico',
    'MY': 'Malaysia',
    'MZ': 'Mozambique',
    'NA': 'Namibia',
    'NE': 'Niger',
    'NG': 'Nigeria',
    'NI': 'Nicaragua',
    'NL': 'Netherlands',
    'NO': 'Norway',
    'NP': 'Nepal',
    'NZ': 'New Zealand',
    'OM': 'Oman',
    'PA': 'Panama',
    'PE': 'Peru',
    'PG': 'Papua New Guinea',
    'PH': 'Philippines',
    'PK': 'Pakistan',
    'PL': 'Poland',
    'PR': 'Puerto Rico',
    'PT': 'Portugal',
    'PY': 'Paraguay',
    'QA': 'Qatar',
    'RE': 'Réunion',
    'RO': 'Romania',
    'RS': 'Serbia',
    'RU': 'Russia',
    'RW': 'Rwanda',
    'SA': 'Saudi Arabia',
    'SWE': 'Sweden',
    'SG': 'Singapore',
    'SI': 'Slovenia',
    'SK': 'Slovakia',
    'SN': 'Senegal',
    'SV': 'El Salvador',
    'TG': 'Togo',
    'TH': 'Thailand',
    'TJ': 'Tajikistan',
    'TR': 'Turkey',
    'TT': 'Trinidad and Tobago',
    'TW': 'Taiwan',
    'TZ': 'Tanzania',
    'UG': 'Uganda',
    'USA': 'United States',
    'UY': 'Uruguay',
    'VE': 'Venezuela',
    'VN': 'Vietnam',
    'YE': 'Yemen',
    'ZA': 'South Africa',
    'ZM': 'Zambia',
    'ZW': 'Zimbabwe',
    'WO': 'World'
}

country_map_iso = {
    'United Arab Emirates': 'AE',
    'Afghanistan': 'AF',
    'Antigua and Barbuda': 'AG',
    'Angola': 'AO',
    'Argentina': 'AR',
    'Austria': 'AT',
    'Australia': 'AU',
    'Aruba': 'AW',
    'Bosnia and Herzegovina': 'BA',
    'Barbados': 'BB',
    'Bangladesh': 'BD',
    'Belgium': 'BE',
    'Bonaire Sint Eustatius and Saba': 'BQ',
    'Burkina Faso': 'BF',
    'Bulgaria': 'BG',
    'Bahrain': 'BH',
    'Benin': 'BJ',
    'Bolivia': 'BO',
    'Brazil': 'BR',
    'The Bahamas': 'BS',
    'Botswana': 'BW',
    'Belarus': 'BY',
    'Belize': 'BZ',
    'Canada': 'CA',
    'Switzerland': 'CHE',
    "Côte d'Ivoire": 'CI',
    'Chile': 'CL',
    'Cameroon': 'CM',
    'Colombia': 'CO',
    'Costa Rica': 'CR',
    'Cape Verde': 'CV',
    'Czechia': 'CZ',
    'Germany': 'DE',
    'Denmark': 'DK',
    'Dominican Republic': 'DO',
    'Ecuador': 'EC',
    'Estonia': 'EE',
    'Egypt': 'EG',
    'Spain': 'ES',
    'Finland': 'FI',
    'Fiji': 'FJ',
    'France': 'FR',
    'Gabon': 'GA',
    'United Kingdom': 'GB',
    'Georgia': 'GE',
    'Ghana': 'GH',
    'Greece': 'GR',
    'Guatemala': 'GT',
    'Guinea-Bissau': 'GW',
    'Hong Kong': 'HK',
    'Honduras': 'HN',
    'Croatia': 'HR',
    'Haiti': 'HT',
    'Hungary': 'HU',
    'Indonesia': 'ID',
    'Ireland': 'IE',
    'Israel': 'ISR',
    'India': 'IN',
    'Iran': 'IR',
    'Iraq': 'IQ',
    'Italy': 'ITA',
    'Jamaica': 'JM',
    'Jordan': 'JO',
    'Japan': 'JP',
    'Kenya': 'KE',
    'Kyrgyzstan': 'KG',
    'Cambodia': 'KH',
    'South Korea': 'KR',
    'Kuwait': 'KW',
    'Kazakhstan': 'KZ',
    'Laos': 'LA',
    'Lebanon': 'LB',
    'Liechtenstein': 'LI',
    'Sri Lanka': 'LK',
    'Lithuania': 'LT',
    'Luxembourg': 'LU',
    'Latvia': 'LV',
    'Libya': 'LY',
    'Moldova': 'MD',
    'North Macedonia': 'MK',
    'Mali': 'ML',
    'Myanmar (Burma)': 'MM',
    'Mongolia': 'MN',
    'Malta': 'MT',
    'Mauritius': 'MU',
    'Mexico': 'MX',
    'Malaysia': 'MY',
    'Mozambique': 'MZ',
    'Namibia': 'NA',
    'Niger': 'NE',
    'Nigeria': 'NG',
    'Nicaragua': 'NI',
    'Netherlands': 'NL',
    'Norway': 'NO',
    'Nepal': 'NP',
    'New Zealand': 'NZ',
    'Oman': 'OM',
    'Panama': 'PA',
    'Peru': 'PE',
    'Papua New Guinea': 'PG',
    'Philippines': 'PH',
    'Pakistan': 'PK',
    'Poland': 'PL',
    'Puerto Rico': 'PR',
    'Portugal': 'PT',
    'Paraguay': 'PY',
    'Qatar': 'QA',
    'Réunion': 'RE',
    'Romania': 'RO',
    'Russia': 'RU',
    'Serbia': 'RS',
    'Rwanda': 'RW',
    'Saudi Arabia': 'SA',
    'Sweden': 'SWE',
    'Singapore': 'SG',
    'Slovenia': 'SI',
    'Slovakia': 'SK',
    'Senegal': 'SN',
    'El Salvador': 'SV',
    'Togo': 'TG',
    'Thailand': 'TH',
    'Tajikistan': 'TJ',
    'Turkey': 'TR',
    'Trinidad and Tobago': 'TT',
    'Taiwan': 'TW',
    'Tanzania': 'TZ',
    'Uganda': 'UG',
    'United States': 'USA',
    'Uruguay': 'UY',
    'Venezuela': 'VE',
    'Vietnam': 'VN',
    'Yemen': 'YE',
    'South Africa': 'ZA',
    'Zambia': 'ZM',
    'Zimbabwe': 'ZW',
    'World': 'WO'
}