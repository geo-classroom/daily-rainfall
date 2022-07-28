import React, { useState, useContext, useId, useEffect } from "react"
import { UserContext } from "../../App"
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage"
import "./uploadDataForm.css"
import {
	TextField,
	FormControlLabel,
	Checkbox,
	FormGroup,
	Stack,
	Button,
	Input,
	IconButton,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Divider
} from "@mui/material"
import { PhotoCamera, Send } from "@mui/icons-material"

/*
    Props
    handleUploadDataSubmit
*/

const UploadDataForm = (props) => {
	// User context
	const user = useContext(UserContext)
	// State to hold an error message and disable the upload data button if there is an error message
	const [errorMessage, setErrorMessage] = useState("")
	const [disableUpload, setDisableUpload] = useState(false)

	// State to hold data from the form
	const [formData, setFormData] = useState({
		formId: useId(),
		latitude: user.registration.latitude,
		longitude: user.registration.longitude,
		rainfallAmount: "",
		reportOtherWeather: false,
		otherWeather: "",
		otherWeatherPhoto: "",
		isHail: false,
		isSnow: false,
		isFrost: false,
		hailSize: "",
		hailPhoto: "",
		hailTime: "",
		snowAmount: "",
		snowTime: ""
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

	const handleSubmit = (event) => {
		event.preventDefault()
		/* eslint-disable react/prop-types */
		props.handleUploadDataSubmit(formData)
	}

	/*
		Sends the uploaded hail photo to Firebase storage and places the url link to that photo in Realtime firebase 
	*/
	const handleHailFileSubmit = (event) => {
		const { files } = event.target

		// Upload the iamge file to Firebase storage
		const storage = getStorage()
		const storageRef = ref(storage, `${user.id}/hailPhotos/${files[0].name}`)
		uploadBytes(storageRef, files[0]).then((snapshot) => {
			// Get the download link and update the state to hold the file image link
			getDownloadURL(storageRef).then((url) => {
				setFormData((prevFormData) => {
					return {
						...prevFormData,
						hailPhoto: url
					}
				})
			})
		})
	}

	/*
		Sends the uploaded other weather photo to Firebase storage and places the url link to that photo in Realtime firebase 
	*/
	const handleOtherWeatherFileSubmit = (event) => {
		const { files } = event.target

		// Upload the iamge file to Firebase storage
		const storage = getStorage()
		const storageRef = ref(storage, `${user.id}/otherWeather/${files[0].name}`)
		uploadBytes(storageRef, files[0]).then((snapshot) => {
			// Get the download link and update the state to hold the file image link
			getDownloadURL(storageRef).then((url) => {
				setFormData((prevFormData) => {
					return {
						...prevFormData,
						otherWeatherPhoto: url
					}
				})
			})
		})
	}

	/*
		If the value for rainfall is a negative value show error messsage and disable the upload data button
	*/
	useEffect(() => {
		if (formData.rainfallAmount < 0) {
			setErrorMessage("Rainfall cannot be negative")
			setDisableUpload(true)
		} else {
			setErrorMessage("")
			setDisableUpload(false)
		}
	}, [formData.rainfallAmount])

	return (
		<div id="form-container">
			<form id="form" onSubmit={handleSubmit}>
				<h1>Upload Data</h1>
				{/* Collect users id and location (latitude and longitude automatically and hide these inputs) */}
				<input
					type="text"
					hidden
					onChange={handleChange}
					name="userId"
					value={formData.userId}
				/>
				<input
					type="text"
					hidden
					onChange={handleChange}
					name="latitude"
					value={formData.latitude}
				/>
				<input
					type="text"
					hidden
					onChange={handleChange}
					name="longitude"
					value={formData.longitude}
				/>
				<TextField
					id="filled-number"
					label="Amount of rainfall (mm)"
					type="number"
					InputLabelProps={{
						shrink: true
					}}
					variant="filled"
					onChange={handleChange}
					name="rainfallAmount"
					value={formData.rainfallAmount}
					error={formData.rainfallAmount < 0}
					helperText={errorMessage}
				/>
				<FormControlLabel
					control={<Checkbox size="medium" />}
					label="Report Other Types of Weather"
					type="checkbox"
					id="report-other-types-of-weather"
					checked={formData.reportOtherWeather}
					onChange={handleChange}
					name="reportOtherWeather"
				/>

				{
					// Render additional form items if the addMoreData is selected
					formData.reportOtherWeather && (
						<FormGroup>
							<div id="add-more-data-checkbox-container">
								<FormControlLabel
									control={<Checkbox size="medium" />}
									label="Hail"
									type="checkbox"
									id="isHail"
									checked={formData.isHail}
									onChange={handleChange}
									name="isHail"
								/>
								<FormControlLabel
									control={<Checkbox size="medium" />}
									label="Snow"
									type="checkbox"
									id="isSnow"
									checked={formData.isSnow}
									onChange={handleChange}
									name="isSnow"
								/>
								<FormControlLabel
									control={<Checkbox size="medium" />}
									label="Frost"
									type="checkbox"
									id="isFrost"
									checked={formData.isFrost}
									onChange={handleChange}
									name="isFrost"
								/>
							</div>
							<Stack
								direction="row"
								alignItems="center"
								justifyContent="center"
								spacing={2}
							>
								<TextField
									id="filled-helperText"
									label="Other"
									helperText="eg: Centurion roads under water"
									variant="filled"
									onChange={handleChange}
									name="otherWeather"
									value={formData.otherWeather}
								/>
								<label htmlFor="icon-button-file">
									<Input
										style={{ display: "none" }}
										accept="image/*"
										id="icon-button-file"
										type="file"
										onChange={handleOtherWeatherFileSubmit}
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

							<Divider
								variant="fullWdith"
								sx={{ borderWidth: "0.5vh", borderColor: "Gray" }}
							/>
						</FormGroup>
					)
				}
				{
					// If hail selected show rest of form for hail input
					formData.isHail && (
						<FormGroup>
							<FormControl sx={{ m: 1, minWidth: 245 }}>
								<InputLabel id="demo-simple-select-helper-label">
									Hail Size Diameter (cm)
								</InputLabel>
								<Select
									labelId="hail-size"
									label="Hail Size Diameter (cm)"
									id="hailSize"
									value={formData.hailSize}
									onChange={handleChange}
									name="hailSize"
								>
									<MenuItem value={"0.5 - 0.9"}>0.5 - 0.9</MenuItem>
									<MenuItem value={"1.0 - 1.5"}>1.0 - 1.5</MenuItem>
									<MenuItem value={"1.6 - 2.0"}>1.6 - 2.0</MenuItem>
									<MenuItem value={"2.1 - 3.0"}>2.1 - 3.0</MenuItem>
									<MenuItem value={"3.1 - 4.0"}>3.1 - 4.0</MenuItem>
									<MenuItem value={"4.1 - 5.0"}>4.1 - 5.0</MenuItem>
									<MenuItem value={"5.1 - 6.0"}>5.1 - 6.0</MenuItem>
									<MenuItem value={"6.1 - 7.5"}>6.1 - 7.5</MenuItem>
									<MenuItem value={"7.6 - 9.0"}>7.6 - 9.0</MenuItem>
									<MenuItem value={"9.1 - 10.0"}>9.1 - 10.0</MenuItem>
									<MenuItem value={"> 10.0"}>&gt; 10.0</MenuItem>
								</Select>
							</FormControl>
							<Stack
								direction="row"
								alignItems="center"
								justifyContent="center"
								spacing={2}
							>
								<label htmlFor="contained-button-file">
									<Input
										style={{ display: "none" }}
										accept="image/*"
										id="contained-button-file"
										multiple
										type="file"
										onChange={handleHailFileSubmit}
									/>
									<Button variant="contained" component="span" size="small">
										Hail Photo
									</Button>
								</label>
								<label htmlFor="icon-button-file">
									<Input
										style={{ display: "none" }}
										accept="image/*"
										id="icon-button-file"
										type="file"
										onChange={handleHailFileSubmit}
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
							<TextField
								id="filled-basic"
								variant="filled"
								type="time"
								onChange={handleChange}
								helperText="Hail Time"
								name="hailTime"
								value={formData.hailTime}
								margin="dense"
							/>
							<Divider
								variant="fullWdith"
								sx={{ borderWidth: "0.5vh", borderColor: "Gray" }}
							/>
						</FormGroup>
					)
				}

				{
					// If snow selected show rest of form for snow input
					formData.isSnow && (
						<FormGroup>
							<FormControl sx={{ m: 1, minWidth: 245 }}>
								<InputLabel id="demo-simple-select-helper-label">
									Amount of Snow
								</InputLabel>
								<Select
									labelId="amount-of-snow"
									label="Amount of Snow"
									id="snowAmount"
									value={formData.snowAmount}
									onChange={handleChange}
									name="snowAmount"
								>
									<MenuItem value={"Light"}>Light</MenuItem>
									<MenuItem value={"Moderate"}>Moderate</MenuItem>
									<MenuItem value={"Heavy"}>Heavy</MenuItem>
								</Select>
							</FormControl>
							<TextField
								id="filled-basic"
								variant="filled"
								type="time"
								helperText="Snow Time"
								onChange={handleChange}
								name="snowTime"
								value={formData.snowTime}
								margin="dense"
							/>
							<Divider
								variant="fullWdith"
								sx={{ borderWidth: "0.5vh", borderColor: "Gray" }}
							/>
						</FormGroup>
					)
				}
				<Button
					variant="contained"
					type="submit"
					value="submit"
					disabled={disableUpload}
					size="medium"
					endIcon={<Send />}
				>
					Upload Data
				</Button>
			</form>
		</div>
	)
}

export default UploadDataForm
