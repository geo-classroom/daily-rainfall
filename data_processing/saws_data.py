import requests
import datetime
import time
import os

import re
import json

import numpy as np
import pandas as pd
from pandas.io.json import json_normalize
import geopandas as gpd

import arcgis
from arcgis.gis import GIS
from arcgis.features import GeoAccessor, GeoSeriesAccessor
from arcgis.features import FeatureLayerCollection

# print("import done")
# time.sleep(15)

# Variables
# ArcGISm online creditntials
arc_url = ADD_YOUR_URL
arc_username = ADD_YOUR_USERNAME
arc_password = ADD_YOUR_PASSWORD
arc_file = ADD_YOUR_FILE_ID

# SAWS Daily rainfall
url = 'https://sawx.co.za/rainfall-reenval/daily-recorded-rainfall-data-figures-south-africa/daily-recorded-rainfall-data-figures-south-africa-inc.txt'
# SAWS 10day rainfall
# url = "https://sawx.co.za//rainfall-reenval/south-africa-10-day-rainfall-data-recorded-figures/10-day-rainfall-figures-south-africa-inc.txt"

# SAWS stations
saws_stations = r"https://raw.githubusercontent.com/Zelbe04/research_project/main/synop_current_stations.csv"

# Exported filename
export_file = 'saws_rainfall.geojson'

# Login to ArcGIS Online Portal
gis = GIS(url=arc_url, username=arc_username, password=arc_password)

# Request text file from the South African Weather Services
filename =f"Rainfall log-{datetime.datetime.now():%Y-%m-%d %H-%m-%d}.txt"

r = requests.get(url)
saws_data =r.text
saws_data = re.split('\n',saws_data)

# Read file with SAWS Automatic Rainfall Stations names
ars = pd.read_csv(saws_stations, delimiter=",")
arslst= ars['StasName'].tolist()

# Extract all names and rainfall readings from textfile
res = [x for y in arslst
           for x in saws_data
               if re.search(y, x)]
readings = []
for item in res:
    for subitem in item.split():
        if(subitem.isdigit()):
            readings.append(subitem)
location = []
for x in res:
    location.append(x.strip(x[-4:]))
cleaned_location=[]
for x in location:
    cleaned_location.append(x.strip())

# Create a dataframe og just station names and their respective rainfall readings
saws_df = pd.DataFrame(zip(cleaned_location,readings),columns=['StasName','Rainfall'])

# Match latitiude and Longitude on names
saws_clean = pd.merge(saws_df,
                  ars[['StasName','Latitude','Longitude']],
                 on='StasName',
                 how= 'left')
saws_clean = saws_clean.fillna(0)
saws_clean['Rainfall'] = pd.to_numeric(saws_clean['Rainfall'])

# Create a geodf with pandas
gdf = gpd.GeoDataFrame(
    saws_clean, geometry=gpd.points_from_xy(saws_clean.Longitude, saws_clean.Latitude))
gdf.drop([ 'Longitude', 'Latitude'], axis=1, inplace=True)
gdf.to_file(filename=export_file, driver='GeoJSON')

# Overwrite hosted feature layer
dataitem = gis.content.get(arc_file)
flayercol = FeatureLayerCollection.fromitem(dataitem)
flayercol.manager.overwrite(export_file)

# os.remove(export_file)

# print("Success")
# time.sleep(15)
