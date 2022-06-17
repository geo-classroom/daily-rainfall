import React, { useState, useEffect } from "react"
import { LayersControl, MapContainer, TileLayer, CircleMarker } from "react-leaflet"
import { getDatabase, ref, onChildAdded } from "firebase/database"
import "../styles.css"
// Import Leaflet CSS
import "leaflet/dist/leaflet.css"
import { circleMarker } from "leaflet"

const Map = () => {
    // State to hold the users data forms
    const [rainfallData, setRainfallData] = useState([])

    /*
        Listen for any changes to the rainfallData path and append the data to the rainfallData state list
    */
    useEffect(() => {
        const db = getDatabase()
        const dbRef = ref(db, "rainfallData")
        onChildAdded(dbRef, (childData) => {
            const returnedData = childData.val()
            Object.values(returnedData).map((data) => {
                
                setRainfallData((prevRainfallData) => {
                    return (
                        [...prevRainfallData, data]
                    )
                })
            })
        })
    }, [])

    /*
        Loop through the rainfallData array and create a marker for each form submition
    */
    const rainMarker = rainfallData.map((data) => {
        console.log(data)
        /*
            TODO
            Make a component that renders the data and put component on map
        */
    })
    
    return (
        <MapContainer center={[-28.7, 24.5]} zoom={6}>
            {/* Add a layer conroll to the to right of the map */}
            <LayersControl position="topright">
                {/* 
                    Add the following basemaps to the layer controller:
                        MapBox Streets
                        Stamen Terrain
                        MapTiler Satellite 
                */}
                <LayersControl.BaseLayer name="Street" checked="true">
                    <TileLayer
                        attribution='© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>'
                        url="https://api.mapbox.com/styles/v1/riley-5/cl3shshxv000515qntejbm29o/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoicmlsZXktNSIsImEiOiJjbDNyZzdxeTIwbTAwM2NwZnN1cG41MWkxIn0.0EmF55wuBJY-2FHaRK73kQ"
                    />
                </LayersControl.BaseLayer>
                <LayersControl.BaseLayer name="Terrain">
                    <TileLayer
                        attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>'
                        url="https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg"
                    />
                </LayersControl.BaseLayer>
                <LayersControl.BaseLayer name="Satellite Hybrid">
                    <TileLayer
                        attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
                        url="https://api.maptiler.com/tiles/satellite-v2/{z}/{x}/{y}.jpg?key=yhv0BPGcseqEnvE2HlLY"
                    />
                </LayersControl.BaseLayer>
            </LayersControl>
            {rainMarker}
        </MapContainer>
    )
}

export default Map