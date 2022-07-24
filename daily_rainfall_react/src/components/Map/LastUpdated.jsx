import { useEffect, useState } from "react"
import L from "leaflet"

/*
    Props:
    mapState
*/

const LastUpdated = (props) => {
	/* eslint-disable react/prop-types */
	// State to hold the date and time of the most recent date and time in the database
	const [date] = useState(new Date())

	const time = date.toLocaleTimeString("en-ZA", {
		hour: "numeric",
		minute: "numeric"
	})

	useEffect(() => {
		if (time >= "10:30") {
			/*  
				Add a container on the map 
				Container holds text to show when the map was last updated
    		*/
			if (props.mapState) {
				const lastUpdated = L.control({ position: "topleft" })

				lastUpdated.onAdd = () => {
					const div = L.DomUtil.create("div", "last-updated")
					// Formats the date to be day, month, year. eg: 24 July 2022
					div.innerHTML = `<h2>24-hour rainfall ending at 10h30 on ${date.toLocaleDateString(
						"en-ZA",
						{ day: "numeric", month: "long", year: "numeric" }
					)}</h2>`
					return div
				}

				props.mapState.addControl(lastUpdated)
			}
		} else {
			/*
				If the time is earlier than 10:30 display the previous date 
			*/

			/*  
				Add a container on the map 
				Container holds text to show when the map was last updated
    		*/
			if (props.mapState) {
				const lastUpdated = L.control({ position: "topleft" })

				lastUpdated.onAdd = () => {
					const div = L.DomUtil.create("div", "last-updated")
					// Formats the date to be day, month, year. eg: 24 July 2022
					div.innerHTML = `<h2>24-hour rainfall ending at 10h30 on ${
						date.getDate() - 1
					} ${date.toLocaleString("default", {
						month: "long"
					})} ${date.getFullYear()}</h2>`
					return div
				}

				props.mapState.addControl(lastUpdated)
			}
		}
	}, [props.mapState, date])
	return null
}

export default LastUpdated
