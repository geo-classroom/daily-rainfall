import React, { useEffect, useState, useRef, useMemo } from "react"
import { useMap, Marker, Popup } from "react-leaflet"

import "leaflet/dist/leaflet.css"

/*
    Props
    handleSubmitLocation
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
		Once user drags the marker update the state to the new location 
		Open the popup
	*/
	const markerRef = useRef(null)
	const eventHandlers = useMemo(
		() => ({
			dragend() {
				const marker = markerRef.current
				if (marker != null) {
					setUserLocation(marker.getLatLng())
					marker.openPopup()
				}
			}
		}),
		[]
	)

	/*
        Send the userLocation to the UserRegistrationForm to get handlded
    */
	const submitLocation = (event) => {
		event.stopPropagation()
		/* eslint-disable react/prop-types */
		props.handleSubmitLocation(userLocation)
	}

	return userLocation === null ? null : (
		<Marker
			// User drags the marker to the location where they want update the users location
			eventHandlers={eventHandlers}
			draggable="true"
			position={userLocation}
			ref={markerRef}
		>
			<Popup>
				{`Latitude: ${userLocation.lat}`}
				<br></br>
				{`Longitude: ${userLocation.lng}`}
				<br></br>
				<button onClick={submitLocation}>Submit Location</button>
			</Popup>
		</Marker>
	)
}

export default UserLocationMarker
