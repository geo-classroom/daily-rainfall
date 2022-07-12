import React from "react"
import "./instructions.css"

const AboutProject = () => {
	return (
		<div id="about-project-container">
			<h3>Setting up Raingauge</h3>
			<ul>
				<li>Open Areas</li>
				<ul>
					<li>
						Place raingauge twice as far from obstacles as the obstacle is high.
						If a nearby tree is 10m tall, place raingauge 20m away from the tree
					</li>
					<li>
						Place raingauge +-2ft off of the ground. This will improve rain
						catchment by reducing the effect of wind speed
					</li>
				</ul>
				<li>Developed Areas</li>
				<ul>
					<li>
						Place raingauge as far from from obstacles as the obstacle is high.
						If a tree is 2m tall, place rainguage at least 2m away from the tree
					</li>
					<li>
						Place raingauge +-5ft off of the ground. This will reduce the impact
						from nearby obstacles
					</li>
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
					lowest value. Value between 5ml and 5.5ml, record 5ml
				</li>
				<li>If you have not received any rainfall record 0ml</li>
			</ul>

			<h3>Uploading the Data</h3>
			<ul>
				<li>Go to app</li>
				<li>Login with either your Gmail or Facebook account</li>
				<li>Click on the upload data button</li>
				<li>
					Fill out the registration form, you will only have to do this once
				</li>
				<li>Upload the measured rainfall amount</li>
			</ul>
		</div>
	)
}

export default AboutProject
