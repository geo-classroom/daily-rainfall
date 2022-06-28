import React, { useContext, useState, useEffect } from "react"
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage"
import { UserContext } from "../App"
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet"

/*
	Props
  	handleUserRegistrationSubmit
*/
const UserRegistrationForm = (props) => {
	const user = useContext(UserContext)

	/*
    	State to hold the data from the form
  	*/
	const [formData, setFormData] = useState({
		permissionToShowLocation: false,
		latitude: "",
		longitude: "",
		raingaugeType: "",
		raingaugePhoto: ""
	})

	// State to show map or form
	const [showMapOrForm, setShowMapOrForm] = useState({
		showMap: false,
		showForm: true
	})

	/*
    	As the form data changes in the form the state will be updated along with it
  	*/
	const handleChange = (event) => {
		const { name, value, type, checked } = event.target
		setFormData((prevFormData) => {
			return {
				...prevFormData,
				[name]: type === "checkbox" ? checked : value
			}
		})
	}

	/*
    	Submits the form data to the App component
  	*/
	const handleSubmit = (event) => {
		event.preventDefault()
		/* eslint-disable react/prop-types */
		props.handleUserRegistrationSubmit(formData)
	}

	/*
		Hide the registration form
		Show map
		center map and zoom to users location
		use a pin as a marker
		button to submit location
	*/
	const getLocationMap = () => {
		setShowMapOrForm({
			showMap: true,
			showForm: false
		})
	}

	/*
		When the map loads place a marker on the map at the users location and zoom to that location
		Allow user to drag marker to adjust location
		submit the location of the marker to the form
	*/
	// TODO style the marker
	const UserLocationMarker = () => {
		const [userLocation, setUserLocation] = useState(null)
		const map = useMap()
		useEffect(() => {
			map.locate().on("locationfound", (event) => {
				setUserLocation(event.latlng)
				map.flyTo(event.latlng, map.getMaxZoom())
			})
		}, [])

		/*
			Submit the users location to the form
			Hide the map
			Show the form
		*/
		const submitLocation = (event) => {
			event.stopPropagation()

			setFormData((prevFormData) => {
				return {
					...prevFormData,
					latitude: userLocation.lat,
					longitude: userLocation.lng
				}
			})

			setShowMapOrForm({
				showMap: false,
				showForm: true
			})
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
					{`Latitude: ${userLocation.lat} Longitude: ${userLocation.lng}`}
					<button onClick={() => submitLocation(event)}>Submit Location</button>
				</Popup>
			</Marker>
		)
	}

	const formStyle = {
		border: "1px",
		solid: "black",
		width: "350px",
		paddingBottom: "2vh"
	}

	const mapStyle = {
		width: "500px",
		height: "500px"
	}

	return (
		<div
			id="form-container"
			style={showMapOrForm.showform ? formStyle : mapStyle}
		>
			{showMapOrForm.showForm && (
				<form id="form" onSubmit={handleSubmit}>
					<h1>Register</h1>
					<label>
						<input
							type="checkbox"
							id="permissionToShowLocation"
							checked={formData.permissionToShowLocation}
							onChange={handleChange}
							onClick={getLocationMap}
							name="permissionToShowLocation"
						/>
						Permission to show Location
					</label>
					<input
						type="text"
						placeholder="Latitude"
						onChange={handleChange}
						name="latitude"
						value={formData.latitude}
						disabled
					/>
					<input
						type="text"
						placeholder="Longitude"
						onChange={handleChange}
						name="longitude"
						value={formData.longitude}
						disabled
					/>
					<label>Rain gauge type</label>
					<select
						id="raingaugeType"
						value={formData.raingaugeType}
						onChange={handleChange}
						name="raingaugeType"
					>
						<option default value="Manual">
							Manual
						</option>
						<option value="Automatic">Automatic</option>
					</select>
					<input
						type="file"
						onChange={(event) => {
							const { files } = event.target

							// Uplaod the image to Firebase Storage
							const storage = getStorage()
							const storageRef = ref(storage, `${user.id}/${files[0].name}`)
							uploadBytes(storageRef, files[0]).then((snapshot) => {
								// Get the download link and update the state to hold the file image link
								getDownloadURL(storageRef).then((url) => {
									setFormData((prevFormData) => {
										return {
											...prevFormData,
											raingaugePhoto: url
										}
									})
								})
							})
						}}
					/>
					{/* Wait for location coordinates to load before allowing user to submit */}
					<input
						disabled={!formData.latitude || !formData.raingaugePhoto}
						type="submit"
						value="submit"
					/>
				</form>
			)}
			{showMapOrForm.showMap && (
				<MapContainer
					style={mapStyle}
					center={[-28.7, 24.5]}
					zoom={6}
					maxZoom={18}
				>
					<TileLayer
						attribution='© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>'
						url="https://api.mapbox.com/styles/v1/riley-5/cl3shshxv000515qntejbm29o/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoicmlsZXktNSIsImEiOiJjbDNyZzdxeTIwbTAwM2NwZnN1cG41MWkxIn0.0EmF55wuBJY-2FHaRK73kQ"
					/>
					<UserLocationMarker />
				</MapContainer>
			)}
		</div>
	)
}

export default UserRegistrationForm
