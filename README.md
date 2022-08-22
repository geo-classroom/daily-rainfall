# Daily Rainfall

### Website
Try this application here [uprain.co.za](https://uprain.co.za/)
---

### Background
There is a significant difference in the density of weather stations between provinces in South Africa. As can be seen from the map below provinces such as the Western Cape have substanitally more weather stations allowing for grater monitoring and data collection than provinces such as the Northern Cape. 

![weather_station_layout](https://user-images.githubusercontent.com/63784083/184902612-25e2d36b-712a-42ec-b08a-5b7b18671165.png)

There is already an interest in rainfall as seen by the Reenval in SA Facebook group. However, the data uploaded to this Facebook group does not get saved to a single database and nobody can easily access this data. To address this issue, this web application, [uprain.co.za](https://uprain.co.za/), was devloped were a user can login, register, upload data, and view the data on a web map. The data uploaded by a user will get saved in a Google Firebase database. 

The aim is that users will login daily at 08h00 and upload the amount of rainfall they have recieved since 08h00 from the previous day. 
Please note that the rainfall is a 24h accumulation running from 08h00 to 08h00.

---

### Tech Stack
The underlying softwares used in this project as can be seen in the below diagram are:
- ReactJS
- Google Firebase
- Esri ArcGIS Online

![tech_stack](https://user-images.githubusercontent.com/63784083/185475328-96629553-53e7-48fd-bcfd-7ff5cd908a3a.png)

**Libraries used**\
ReactJS - <a href="https://opensource.org/licenses/MIT" target="_blank">MIT License</a>\
Leaflet - <a href="https://opensource.org/licenses/BSD-2-Clause" target="_blank">BSD-2-Clause License</a>

---

### License
This software is available under the BSD-3-Clause License 

For more information, see the LICENSE file.

---

### About Project
**Project team**\
The first iteration of the daily rainfall map was developed by <a href="https://github.com/Zelbe04" target="_blank">Zelbé Boshoff</a> and then the current iterarion published at <a href="https://uprain.co.za" target="_blank">UPrain</a> was developed by <a href="https://github.com/Riley-5" target="_blank">Riley Kamstra</a>. The work was supervised by <a href="https://github.com/vrautenbach" target="_blank">Victoria Rautenbach</a> and <a href="https://www.up.ac.za/geography-geoinformatics-and-meteorology/article/2662732/liesl-dyson" traget="_blank">Liesl Dyson</a> from the Department of Geography, Geoinformatics and Meteorology at the University of Pretoria.

**Data sources**\
The daily rainfall map is created using the following data:
- <a href="https://sawx.co.za/rainfall-reenval/daily-recorded-rainfall-data-figures-south-africa/" target="_blank">South African Weather Service (SAWS) daily recorded rainfall figures</a> 
- <a href="https://hsaf.meteoam.it" target="_blank">EUMETSAT Satellite Application Facility on Support to Operational Hydrology and Water Management (H SAF)</a> Accumulated precipitation at ground by blended MW and IR (H05B)
- User contributed data submitted thought the <a href="https://uprain.co.za" target="_blank">UPrain</a> app

**Contact us**\
If you have any comments or suggestions, please share your thoughts with us at [uprain@up.ac.za](mailto:uprain@up.ac.za)
