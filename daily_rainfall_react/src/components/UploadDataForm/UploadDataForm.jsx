import React, { useState, useContext, useId } from "react"
import { UserContext } from "../../App"
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage"
import "./uploadDataForm.css"

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
				<input
					type="number"
					placeholder="Amount of rainfall (ml)"
					onChange={handleChange}
					name="rainfallAmount"
					value={formData.rainfallAmount}
				/>
				<label>
					<input
						type="checkbox"
						id="showMore"
						checked={formData.showMore}
						onChange={handleChange}
						name="showMore"
					/>
					Show More
				</label>

				{
					// Render additional form items if the addMoreData is selected
					formData.showMore && (
						<div id="add-more-data-checkbox-container">
							<label>
								<input
									type="checkbox"
									id="isHail"
									checked={formData.isHail}
									onChange={handleChange}
									name="isHail"
								/>
								Hail
							</label>
							<label>
								<input
									type="checkbox"
									id="isSnow"
									checked={formData.isSnow}
									onChange={handleChange}
									name="isSnow"
								/>
								Snow
							</label>
							<label>
								<input
									type="checkbox"
									id="isFrost"
									checked={formData.isFrost}
									onChange={handleChange}
									name="isFrost"
								/>
								Frost
							</label>
						</div>
					)
				}
				{
					// If hail selected show rest of form for hail input
					formData.isHail && (
						<input
							type="text"
							placeholder="Hail size"
							onChange={handleChange}
							name="hailSize"
							value={formData.hailSize}
						/>
					)
				}
				{formData.isHail && (
					<input
						type="file"
						onChange={(event) => {
							const { files } = event.target

							// Upload the iamge file to Firebase storage
							const storage = getStorage()
							const storageRef = ref(
								storage,
								`${user.id}/hailPhotos/${files[0].name}`
							)
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
						}}
					/>
				)}
				{
					// If hail selected show rest of form for hail input
					formData.isHail && (
						<input
							type="time"
							placeholder="Time of hail"
							onChange={handleChange}
							name="hailTime"
							value={formData.hailTime}
						/>
					)
				}
				{
					// If snow selected show rest of form for snow input
					formData.isSnow && (
						<select
							id="snowAmount"
							value={formData.snowAmount}
							onChange={handleChange}
							name="snowAmount"
						>
							<option value="Light">Light</option>
							<option value="Moderate">Moderate</option>
							<option value="Heavy">Heavy</option>
						</select>
					)
				}
				{
					// If snow selected show rest of form for snow input
					formData.isSnow && (
						<input
							type="time"
							placeholder="Time of snow"
							onChange={handleChange}
							name="snowTime"
							value={formData.snowTime}
						/>
					)
				}
				<input
					type="submit"
					value="submit"
					disabled={formData.isHail && !formData.hailPhoto}
				/>
			</form>
		</div>
	)
}

export default UploadDataForm
