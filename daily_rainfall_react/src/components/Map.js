import React from "react"
import { LayersControl, MapContainer, TileLayer } from "react-leaflet"
import "../styles.css"
// Import Leaflet CSS
import "leaflet/dist/leaflet.css"

function Map() {
    return (
        <MapContainer center={[-28.7, 24.5]} zoom={6}>
            <LayersControl position="topright">
            <LayersControl.BaseLayer name="Street" checked="true">
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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
        </MapContainer>
    )
}

export default Map