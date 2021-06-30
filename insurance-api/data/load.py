import pandas as pd
import numpy as np

import requests

from datetime import datetime
from io import StringIO


# Pretend i'am browser (due to 403 error)
cars_url = 'https://www.teoalida.com/cardatabase/samples/German-Car-Database-by-Teoalida-full-specs-SAMPLE.csv'

header = {
  'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.75 Safari/537.36',
  'X-Requested-With': 'XMLHttpRequest'
}

req = requests.get(cars_url, headers=header)


# Load data
df_whole = pd.read_csv(StringIO(req.text))


# Pick only specific columns
"""
 #   Column                    Non-Null Count  Dtype  
---  ------                    --------------  -----  
 0   Full car name             1461 non-null   object 
 1   Displacement (ccm)        1461 non-null   object 
 2   Power (kW)                1461 non-null   float64
 3   Base price                1461 non-null   object 
 4   Model series launch date  1461 non-null   object 
"""
columns = ['Full car name', 'Displacement (ccm)', 'Power (kW)', 'Base price', 'Model series launch date']
df_cars = df_whole[columns].dropna()


# Transformations
df_cars['Full car name'] = df_cars['Full car name'].apply(lambda name: name.split(' (')[0] if ' (' in name else name)
df_cars['Displacement (ccm)'] = df_cars['Displacement (ccm)'].apply(lambda ccm: ccm.split()[0] if ' ccm' in ccm else np.NaN)
df_cars['Base price'] = df_cars['Base price'].apply(lambda eur: eur.split()[0] if ' Euro' in eur else np.NaN)
df_cars['Model series launch date'] = df_cars['Model series launch date'].apply(lambda date: datetime.strptime(date, '%b-%y').isoformat())

df_cars = df_cars.dropna()


# Rename columns
df_cars = df_cars.rename(columns={
  'Full car name': 'name',
  'Displacement (ccm)': 'displacement',
  'Power (kW)': 'power',
  'Base price': 'price',
  'Model series launch date': 'date'
})


# Store do .csv
number_of_rows_to_store = 100

df_cars.sample(n=number_of_rows_to_store).to_csv('data.csv', index=False)
