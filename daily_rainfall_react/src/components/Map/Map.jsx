import React, { useState, useEffect, useRef } from "react"
import {
	LayersControl,
	MapContainer,
	TileLayer,
	Marker,
	LayerGroup,
	Popup
} from "react-leaflet"
import { getDatabase, ref, onChildAdded } from "firebase/database"
import LastUpdated from "./LastUpdated"
import { FeatureLayer } from "react-esri-leaflet"
import L from "leaflet"
import "./map.css"
import "leaflet/dist/leaflet.css"

const Map = () => {
	// State to hold the users data forms
	const [rainfallData, setRainfallData] = useState([])
	// State to hold the leaflet map
	const [mapState, setMapState] = useState(null)

	/*
        Listen for any changes to the rainfallData path and append the data to the rainfallData state list
    */
	useEffect(() => {
		const db = getDatabase()
		const today = new Date()
		const date = `${today.getDate()}-${
			today.getMonth() + 1
		}-${today.getFullYear()}`

		//

		// Get Data for the current day
		const dbRef = ref(db, `rainfallData/${date}`)
		onChildAdded(dbRef, (childData) => {
			const returnedData = childData.val()
			// Loop through the hours to access users data
			Object.values(returnedData).map((data) => {
				return setRainfallData((prevRainfallData) => {
					return [...prevRainfallData, data]
				})
			})
		})
	}, [])

	/*
		Add the popup to the SAWS data layer
	*/
	const sawsRef = useRef()
	useEffect(() => {
		if (mapState) {
			sawsRef.current.bindPopup((layer) => {
				return L.Util.template(
					"Rainfall Amount: {Rainfall}ml",
					layer.feature.properties
				)
			})
		}
	}, [mapState])

	/*
		Styling for the SAWS data icons
	*/
	const sawsIcon = L.icon({
		iconUrl:
			"https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
		shadowUrl:
			"https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
		iconSize: [25, 41],
		iconAnchor: [12, 41],
		popupAnchor: [1, -34],
		shadowSize: [41, 41]
	})

	return (
		<MapContainer
			center={[-28.7, 24.5]}
			zoom={6}
			zoomControl={false}
			// Maxzoom limited to not allow users to see exact locations of people that have submitted data
			maxZoom={12}
			ref={setMapState}
		>
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
				{/* Layercontroll option for the user data */}
				<LayersControl.Overlay name="User Data">
					{/* 
							Map through the rainfall data and add a point for each user that has uploaded the data
							Each marker must have a popup with the rainfall amount
						*/}
					<LayerGroup>
						{rainfallData.map((point) => {
							return (
								<Marker
									key={point.formId}
									position={[point.latitude, point.longitude]}
								>
									<Popup>Rainfall Amount: {point.rainfallAmount}ml</Popup>
								</Marker>
							)
						})}
					</LayerGroup>
				</LayersControl.Overlay>
				{/* Layer control for the SAWS data */}
				<LayersControl.Overlay name="SAWS Data">
					<FeatureLayer
						url={
							"https://services8.arcgis.com/ZhTpwEGNVUBxG9VW/ArcGIS/rest/services/saws_rainfall/FeatureServer/0"
						}
						ref={sawsRef}
						pointToLayer={(geojson, latLng) => {
							return L.marker(latLng, {
								icon: sawsIcon
							})
						}}
					/>
				</LayersControl.Overlay>
				<LayersControl.Overlay name="EUMETSAT Data">
					<FeatureLayer
						url={
							"https://services8.arcgis.com/ZhTpwEGNVUBxG9VW/ArcGIS/rest/services/eumetsat_grid/FeatureServer/0"
						}
						style={(feature) => {
							if (feature.properties.Rainfall <= 0) {
								return { color: "transparent" }
							} else if (
								feature.properties.Rainfall > 0 &&
								feature.properties.Rainfall <= 4
							) {
								return { color: "#c6dbef" }
							} else if (
								feature.properties.Rainfall > 4 &&
								feature.properties.Rainfall <= 8
							) {
								return { color: "#9ecae1" }
							} else if (
								feature.properties.Rainfall > 8 &&
								feature.properties.Rainfall <= 12
							) {
								return { color: "#6baed6" }
							} else if (
								feature.properties.Rainfall > 12 &&
								feature.properties.Rainfall <= 16
							) {
								return { color: "#3182bd" }
							} else if (
								feature.properties.Rainfall > 16 &&
								feature.properties.Rainfall <= 20
							) {
								return { color: "#08519c" }
							}
						}}
					/>
				</LayersControl.Overlay>
			</LayersControl>
			<LastUpdated mapState={mapState} />
		</MapContainer>
	)
}

export default Map
