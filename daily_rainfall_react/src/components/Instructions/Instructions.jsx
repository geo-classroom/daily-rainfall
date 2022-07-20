import React from "react"
import "./instructions.css"
import { Button } from "@mui/material"

/*
	Props
	backToMap
*/

const Instructions = (props) => {
	return (
		<div id="instructions-container">
			<h3>Setting up Raingauge</h3>
			<ul>
				<li>Open Areas</li>
				<ul>
					<li>
						Place raingauge twice as far from obstacles as the obstacle is high.
						If a nearby tree is 10m tall, place raingauge 20m away from the tree
					</li>
					<li>Place raingauge 1m off of the ground</li>
				</ul>
				<li>Developed Areas</li>
				<ul>
					<li>
						Place raingauge as far from from obstacles as the obstacle is high.
						If a tree is 2m tall, place rainguage at least 2m away from the tree
					</li>
					<li>Place raingauge 1m off of the ground</li>
				</ul>
				<li>Ensure the raingauge is as level and vertical as possible</li>
				<li>Place raingauge in a location that is easily accessible</li>
			</ul>
			<h3>Reading the Raingauge</h3>
			<ul>
				<li>Read te raingauge at approximately the same time every morning</li>
				<li>
					If there has been rain the line where the water level is will have a
					concave shape (called the meniscus), read the level from the{" "}
					<b>bottom</b> of the meniscus
				</li>
				<li>
					If the water level is between two values on the raingauge record the
					lowest value. Value between 5ml and 5.5mm, record 5mm
				</li>
				<li>If you have not received any rainfall record 0mm</li>
			</ul>
			<h3>Uploading the Data</h3>
			<ul>
				<li>Go to app</li>
				<li>Login with either your Gmail or Facebook account</li>
				<li>Click on the upload data button</li>
				<li>
					Fill out the registration form, you will only have to do this once
				</li>
				<li>
					When registering and providing your location, move the marker to your
					location, a popup will appear and you can submit the coordinates
				</li>
				<li>Upload the measured rainfall amount</li>
			</ul>
			{/* eslint-disable react/prop-types */}
			<Button id="back-to-map-btn" variant="text" onClick={props.backToMap}>
				Back to Map
			</Button>
		</div>
	)
}

export default Instructions
