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
			<h3>Setting up Rain gauge</h3>
			<ul>
				<li>The rain gauge should be placed 1m off the ground.</li>
				<li>Ensure the rauge is as level and vertical as possible.</li>
				<li>Place rain gauge in a location that is easily accessible.</li>
				<li>
					In an <b>open areas</b>, place rain gauge twice as far from obstacles
					as the obstacle is high. For example, if a nearby tree is 10m tall,
					place the rain gauge 20m away from the tree.
				</li>
				<li>
					In a <b>developed areas</b>, place rain gauge as far from obstacles as
					the obstacle is high. For example, if a tree is 2m tall, place the
					rainguage at least 2m away from the tree.
				</li>
			</ul>
			<h3>Reading the Rain gauge</h3>
			<ul>
				<li>
					<b>
						The rain gauge should be read as close as possible to 08h00 everyday
					</b>
					. The daily rainfall in South Africa is captured within a 24 hours
					cycle that runs from 08h00 to 08h00. For example, if there is rain at
					14h00, submit it at 08h00 <b>the next day</b>.
				</li>
				<li>
					If there has been rain, the line where the water level is will have a
					concave shape (called the meniscus), read the level from the bottom of
					the meniscus.
				</li>
				<li>
					If the water level is between two values on the rain gauge record the
					lowest value. For example, if the value is between 5mm and 5.5mm, it
					should be recorded as 5mm.
				</li>
				<li>
					If the water level is between two values on the rain gauge record the
					lowest value. For example, if the value is between 5mm and 5.5mm, it
					should be recorded as 5mm.
				</li>
			</ul>
			<h3>Uploading the Data</h3>
			<ul>
				<li>
					Go to app,{" "}
					<a href="https://uprain.co.za/" target="_blank" rel="noreferrer">
						UPrain
					</a>
					.
				</li>
				<li>
					Login with either your Gmail or Facebook account (apologies, at the
					moment, we only support login with Gmail or Facebook).
				</li>
				<li>
					Click on the &#8220;UPLOAD DATA&#8221; button in the top right corner.
				</li>
				<li>
					Fill out the registration form by providing your location and the type
					of rain gauge. Once you are done, you will be asked to complete your
					registration. You will only be required to complete this form once.
				</li>
				<li>
					Once the registration is done, you can upload the measured rainfall
					amount and additional observations about either hail, frost or snow.
				</li>
			</ul>
			{/* eslint-disable react/prop-types */}
			<Button id="back-to-map-btn" variant="text" onClick={props.backToMap}>
				Back to Map
			</Button>
		</div>
	)
}

export default Instructions
