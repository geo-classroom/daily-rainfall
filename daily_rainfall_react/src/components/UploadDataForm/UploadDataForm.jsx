import React, { useState, useContext, useId } from "react"
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
	MenuItem
} from "@mui/material"
import { PhotoCamera, Send } from "@mui/icons-material"

/*
    Props
    handleUploadDataSubmit
*/

const UploadDataForm = (props) => {
	// User context
	const user = useContext(UserContext)

	// State to hold data from the form
	const [formData, setFormData] = useState({
		formId: useId(),
		latitude: user.registration.latitude,
		longitude: user.registration.longitude,
		rainfallAmount: "",
		showMore: false,
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

	const handleFileSubmit = (event) => {
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
					label="Amount of rainfall (ml)"
					type="number"
					InputLabelProps={{
						shrink: true
					}}
					variant="filled"
					onChange={handleChange}
					name="rainfallAmount"
					value={formData.rainfallAmount}
				/>
				<FormControlLabel
					control={<Checkbox size="medium" />}
					label="Show More"
					type="checkbox"
					id="showMore"
					checked={formData.showMore}
					onChange={handleChange}
					name="showMore"
				/>

				{
					// Render additional form items if the addMoreData is selected
					formData.showMore && (
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
					)
				}
				{
					// If hail selected show rest of form for hail input
					formData.isHail && (
						<FormGroup>
							<TextField
								id="standard-basic"
								label="Hail Size (cm)"
								variant="standard"
								type="text"
								onChange={handleChange}
								name="hailSize"
								value={formData.hailSize}
								margin="dense"
							/>
							<Stack direction="row" alignItems="center" spacing={2}>
								<label htmlFor="contained-button-file">
									<Input
										style={{ display: "none" }}
										accept="image/*"
										id="contained-button-file"
										multiple
										type="file"
										onChange={handleFileSubmit}
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
										onChange={handleFileSubmit}
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
								name="hailTime"
								value={formData.hailTime}
								margin="dense"
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
								onChange={handleChange}
								name="snowTime"
								value={formData.snowTime}
								margin="dense"
							/>
						</FormGroup>
					)
				}
				<Button
					variant="contained"
					type="submit"
					value="submit"
					disabled={formData.isHail && !formData.hailPhoto}
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
