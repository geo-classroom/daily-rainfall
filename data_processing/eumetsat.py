import pandas as pd
import numpy as np
import xarray as xr
import netCDF4 as nc
import geopandas as gpd
from arcgis.features import GeoAccessor, GeoSeriesAccessor
from arcgis.gis import GIS
from arcgis.features import FeatureLayerCollection
import os
import pysftp as sftp
from datetime import date

# Variables
# ArcGIS online creditntials
arc_url = ADD_YOUR_URL
arc_username = ADD_YOUR_USERNAME
arc_password = ADD_YOUR_PASSWORD
arc_file = ADD_YOUR_FILE_ID
# Exported filename
export_file = 'eumetsat_grid.geojson'
# SFTP variables
host = ADD_YOUR_HOST
port = ADD_YOUR_PORT
username = ADD_YOUR_USERNAME
password = ADD_YOUR_PASSWORD
# SFTP files
today = date.today().strftime("%d_%m_%Y")
temp = date.today().strftime("%Y%m%d")
filename = 'h05B_' + temp + '_0600_24.nc'
remotepath = "eumetsat_data/" + today + "/" + filename
localpath = "C:/Production-Rainfall/temp/" + filename

try:
  # SFTP settings and connections
  cnopts = sftp.CnOpts()
  cnopts.hostkeys = None
  s = sftp.Connection(host=host, username=username, password=password, port=port, cnopts=cnopts)
  print("connection established successfully")

  s.get(remotepath, localpath)
  print("File downloaded")
  s.close()

  # Load the file and convert it into a dataframe
  ds = xr.open_dataset(localpath)
  df = ds.to_dataframe()
  df = df.reset_index()
  df.drop('time', inplace=True, axis=1)
  df.drop('ESTP_surface', inplace=True, axis=1)
  df.drop(df.index[df['ESTP_no_level'] == 0.0], inplace=True)

  # Convert df to spatially enabled df and load South Africa shapefile
  sedf = gpd.GeoDataFrame(
    df, geometry=gpd.points_from_xy(df.longitude, df.latitude))
  za = gpd.read_file('./za/southafrica.shp')
  grid = gpd.read_file('./za/grid.shp')

  # Extract only points within South Africa
  za.crs = sedf.crs
  inter = gpd.overlay(sedf, za, how='intersection')

  # Drop extra columns
  inter.drop('Shape_Leng', inplace=True, axis=1)
  inter.drop('Shape_Area', inplace=True, axis=1)
  inter.drop('ADM0_EN', inplace=True, axis=1)
  inter.drop('ADM0_PCODE', inplace=True, axis=1)
  inter.drop('ADM0_REF', inplace=True, axis=1)
  inter.drop('ADM0ALT1EN', inplace=True, axis=1)
  inter.drop('date', inplace=True, axis=1)
  inter.drop('validOn', inplace=True, axis=1)
  inter.drop('validTo', inplace=True, axis=1)
  inter.drop('ADM0ALT2EN', inplace=True, axis=1)

  # Join the points and grids
  grid.crs = inter.crs
  join_df = grid.sjoin(inter, how="inner")

  # Drop extra columns not needed
  join_df.drop('ycoord', inplace=True, axis=1)
  join_df.drop('xcoord', inplace=True, axis=1)
  join_df.drop('index_right', inplace=True, axis=1)
  join_df.drop('latitude', inplace=True, axis=1)
  join_df.drop('longitude', inplace=True, axis=1)

  # Rename columns and round the rainfall to two decimal spaces
  join_df['ESTP_no_level'] = join_df['ESTP_no_level'].round(decimals=2)
  join_df.rename(columns={'ESTP_no_level': 'Rainfall'}, inplace=True)

  # Duplicate the rainfall column and then dissolve based on that column
  join_df['temp'] = join_df['Rainfall']
  dissolved = join_df.dissolve(by='temp')
  dissolved.reset_index(drop=True, inplace=True)

  # Create temp file that would be loaded to ArcGIS
  dissolved.to_file(filename=export_file, driver='GeoJSON')

  # Login to ArcGIS Online Portal
  gis = GIS(url=arc_url, username=arc_username, password=arc_password)

  # Overwrite hosted feature layer
  dataitem = gis.content.get(arc_file)
  flayercol = FeatureLayerCollection.fromitem(dataitem)
  flayercol.manager.overwrite(export_file)
  print("New data loaded to ArcGIS Online")

  # Remove temp file
  os.remove(export_file)

except:
  print('failed to establish connection to targeted server')
