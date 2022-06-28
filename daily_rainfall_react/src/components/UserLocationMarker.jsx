import React, { useEffect, useState } from "react"
import { useMap, Marker, Popup } from "react-leaflet"

/*
    Props
    handleSubmitLocation
*/

// TODO style the marker
const UserLocationMarker = (props) => {
	/*
		When the map loads place a marker on the map at the users location and zoom to that location
		Allow user to drag marker to adjust location
		submit the location of the marker to the form
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
			eventHandlers={{
				click: (event) => {
					setUserLocation(event.latlng)
				}
			}}
			draggable="true"
			position={userLocation}
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
