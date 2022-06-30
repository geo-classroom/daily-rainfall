import React, { useEffect, useState, useRef, useMemo } from "react"
import { useMap, Marker } from "react-leaflet"

/*
    Props
    handleSubmitLocation
	mapStyle
*/

// TODO style the marker
const UserLocationMarker = (props) => {
	/*
		When the map loads place a marker on the map at the users location and zoom to that location
	*/
	const [userLocation, setUserLocation] = useState(null)
	const map = useMap()
	useEffect(() => {
		map.locate().on("locationfound", (event) => {
			setUserLocation(event.latlng)
			map.flyTo(event.latlng, map.getMaxZoom())
		})
	}, [])

	/*
		Event handler for the draggable marker
	*/
	const markerRef = useRef(null)
	const eventHandlers = useMemo(
		() => ({
			dragend() {
				const marker = markerRef.current
				if (marker != null) {
					setUserLocation(marker.getLatLng())
				}
			}
		}),
		[]
	)

	// TODO Send the uselocation data to the userregsitration form

	return userLocation === null ? null : (
		<Marker
			// User drags the marker to the location where they want update the users location
			eventHandlers={eventHandlers}
			draggable="true"
			position={userLocation}
			ref={markerRef}
		></Marker>
	)
}

export default UserLocationMarker
