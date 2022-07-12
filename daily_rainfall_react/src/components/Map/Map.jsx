import React, { useState, useEffect, useRef } from "react"
import { LayersControl, MapContainer, TileLayer } from "react-leaflet"
import { getDatabase, ref, onChildAdded } from "firebase/database"
import LastUpdated from "./LastUpdated"
import "leaflet.heat"
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
		Create the heatmap layer for the user data
		Wait till the map state exists
		Access the layer controller via the reference to it 
		Add the heatmap as a overlay
		useEffect depends on the rainfallData so whenever that changes it will update the heatmap layer 
	*/
	// References to the layer controller to add the overlay heatmap layer
	const layerControllerRef = useRef(null)
	useEffect(() => {
		// Create heatmap for the user data
		const points = rainfallData.map((point) => {
			return [point.latitude, point.longitude, point.rainfallAmount]
		})

		const heatmap = L.heatLayer(points)

		/* 
			When the state of the map existes (When the map loads) 
			access the layer controller via the layer controller reference and add the overlay

		*/
		if (mapState) {
			layerControllerRef.current.addOverlay(heatmap, "User Data")
		}
	}, [rainfallData])

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
			<LayersControl position="topright" ref={layerControllerRef}>
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
			<LastUpdated mapState={mapState} />
		</MapContainer>
	)
}

export default Map
