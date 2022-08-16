import { Button } from "@mui/material"
import React from "react"
import "./instructions.css"

/*
	Props
	backToMap
*/

const Instructions = (props) => {
	return (
		<div id="instructions-container">
			<h3>Registration and uploading</h3>
			<ul>
				<li>
					To register, navigate to{" "}
					<a href="https://uprain.co.za/" target="_blank" rel="noreferrer">
						UPrain
					</a>
					.
				</li>
				<li>
					Login with either your Gmail or Facebook account (at the moment, we
					only support login with Gmail or Facebook).
				</li>
				<li>Click on the “UPLOAD DATA” button in the top right corner.</li>
				<li>
					The first time you try to upload data, you will be asked to complete
					your profile. For this you will be asked to confirm the following (the
					process is demonstrated{" "}
					<a
						href="https://youtu.be/EDd2OocdWdk"
						target="_blank"
						rel="noreferrer"
					>
						here
					</a>
					):
					<ul>
						<li>
							{" "}
							The location of the rain gauge (once you select the “Permission to
							show Location”, you will see a map with your current location and
							you will be able to move the pin around on the map).
						</li>
						<li>Type of rain gauge.</li>
						<li>If available, a photo of the rain gauge.</li>
					</ul>
				</li>
				<li>
					Once the registration is done, you can upload the measured rainfall
					amount and additional observations about either hail, frost or snow.
				</li>
				<li>
					If you have any comments or suggestions, please share your thoughts
					with us at <a href="mailto: uprain@up.ac.za">uprain@up.ac.za</a>
				</li>
			</ul>
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
			{/* eslint-disable react/prop-types */}
			<Button id="back-to-map-btn" variant="outlined" onClick={props.backToMap}>
				Back to Map
			</Button>
		</div>
	)
}

export default Instructions
