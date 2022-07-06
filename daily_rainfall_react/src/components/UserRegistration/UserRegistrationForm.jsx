import React, { useContext, useState } from "react"
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage"
import { UserContext } from "../../App"
import UserLocationMarker from "./UserLocationMarker"
import { MapContainer, TileLayer } from "react-leaflet"
import {
	FormControlLabel,
	Checkbox,
	TextField,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Input,
	IconButton,
	Stack,
	Button
} from "@mui/material"
import { PhotoCamera, Send } from "@mui/icons-material"
import "./userRegistration.css"

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
		Get the users location from the UserLocationMarker component
		Set the location in the formdata state
		Hide the map
		Show the form
	*/
	const handleSubmitLocation = (userLocation) => {
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

	/*
		Gets the photo of the rain gauge from the user and sends it to storage in Firebase
	*/
	const handleFileSubmission = (event) => {
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
	}

	const formStyle = {
		border: "1px",
		solid: "black",
		width: "350px",
		paddingBottom: "2vh"
	}

	const mapStyle = {
		width: "360px",
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
					<FormControlLabel
						type="checkbox"
						id="permissionToShowLocation"
						checked={formData.permissionToShowLocation}
						onChange={handleChange}
						onClick={getLocationMap}
						name="permissionToShowLocation"
						control={<Checkbox size="medium" />}
						label="Permission to show Location"
					/>
					<TextField
						type="text"
						placeholder="Latitude"
						onChange={handleChange}
						name="latitude"
						value={formData.latitude}
						id="filled-read-only-input"
						label="Latitude"
						InputProps={{
							readOnly: true
						}}
						variant="filled"
					/>
					<TextField
						type="text"
						placeholder="Longitude"
						onChange={handleChange}
						name="longitude"
						value={formData.longitude}
						id="filled-read-only-input"
						label="Longitude"
						InputProps={{
							readOnly: true
						}}
						variant="filled"
					/>
					<FormControl sx={{ m: 1, minWidth: 245 }}>
						<InputLabel id="demo-simple-select-helper-label">
							Rain Gauge Type
						</InputLabel>
						<Select
							labelId="rain-gauge-type"
							label="Rain Gauge Type"
							id="raingaugeType"
							value={formData.raingaugeType}
							onChange={handleChange}
							name="raingaugeType"
						>
							<MenuItem value={"Manual"}>Manual</MenuItem>
							<MenuItem value={"Automatic"}>Automatic</MenuItem>
						</Select>
					</FormControl>
					<Stack direction="row" alignItems="center" spacing={2}>
						<label htmlFor="contained-button-file">
							<Input
								style={{ display: "none" }}
								accept="image/*"
								id="contained-button-file"
								multiple
								type="file"
								onChange={handleFileSubmission}
							/>
							<Button variant="contained" component="span" size="small">
								Rain Gauge Photo
							</Button>
						</label>
						<label htmlFor="icon-button-file">
							<Input
								style={{ display: "none" }}
								accept="image/*"
								id="icon-button-file"
								type="file"
								onChange={handleFileSubmission}
							/>
							<IconButton
								color="primary"
								aria-label="upload picture"
								component="span"
							>
								<PhotoCamera />
							</IconButton>
						</label>
					</Stack>
					{/* Wait for location coordinates to load before allowing user to submit */}
					<Button
						variant="contained"
						disabled={!formData.latitude || !formData.raingaugePhoto}
						type="submit"
						value="submit"
						size="medium"
						endIcon={<Send />}
					>
						Submit
					</Button>
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
					<UserLocationMarker handleSubmitLocation={handleSubmitLocation} />
				</MapContainer>
			)}
		</div>
	)
}

export default UserRegistrationForm
