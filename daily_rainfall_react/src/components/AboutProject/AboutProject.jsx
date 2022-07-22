/* eslint-disable react/prop-types */
import React from "react"
import "./aboutProject.css"
import { Button } from "@mui/material"

/*
	Props
	backToMap
*/

const AboutProject = (props) => {
	return (
		<div id="about-project-container">
			<p>
				<strong>
					<b>Project team</b>
				</strong>
				<br />
				The first iteration of the daily rainfall map was developed by{" "}
				<a href="https://github.com/Zelbe04" target="_blank" rel="noreferrer">
					Zelb&eacute; Boshoff
				</a>{" "}
				and then the current iterarion published at{" "}
				<a href="https://uprain.co.za/" target="_blank" rel="noreferrer">
					UPrain
				</a>{" "}
				was developed by{" "}
				<a href="https://github.com/Riley-5" target="_blank" rel="noreferrer">
					Riley Kamstra
				</a>
				. The work was supervised by{" "}
				<a
					href="https://github.com/vrautenbach"
					target="_blank"
					rel="noreferrer"
				>
					Victoria Rautenbach
				</a>{" "}
				and{" "}
				<a
					href="https://www.up.ac.za/geography-geoinformatics-and-meteorology/article/2662732/liesl-dyson"
					target="_blank"
					rel="noreferrer"
				>
					Liesl Dyson
				</a>{" "}
				from the{" "}
				<a
					href="https://www.up.ac.za/geography-geoinformatics-and-meteorology/"
					target="_blank"
					rel="noreferrer"
				>
					Department of Geography, Geoinformatics and Meteorology
				</a>{" "}
				at the University of Pretoria.
			</p>
			<p>
				<strong>
					<b>Data sources</b>
				</strong>
				<br />
				The daily rainfall map is created using the following data:
				<br />
				<ul>
					<li>
						<a
							href="https://sawx.co.za/rainfall-reenval/daily-recorded-rainfall-data-figures-south-africa/"
							target="_blank"
							rel="noreferrer"
						>
							South African Weather Service (SAWS) daily recorded rainfall
							figures
						</a>
					</li>
					<li>
						<a href="https://hsaf.meteoam.it/" target="_blank" rel="noreferrer">
							EUMETSAT Satellite Application Facility on Support to Operational
							Hydrology and Water Management (H SAF)
						</a>{" "}
						Accumulated precipitation at ground by blended MW and IR (H05B)
					</li>
					<li>
						User contributed data submitted thought the{" "}
						<a href="https://uprain.co.za/" target="_blank" rel="noreferrer">
							UPrain
						</a>{" "}
						app
					</li>
				</ul>
			</p>
			<Button id="back-to-map-btn" variant="text" onClick={props.backToMap}>
				Back to Map
			</Button>
		</div>
	)
}

export default AboutProject
