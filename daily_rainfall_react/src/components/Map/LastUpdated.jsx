import { useEffect, useState } from "react"
import L from "leaflet"
import { onChildAdded, getDatabase, ref } from "firebase/database"

/*
    Props:
    mapState
*/

const LastUpdated = (props) => {
	/* eslint-disable react/prop-types */
	// State to hold the date and time of the most recent date and time in the database
	const [dateTime, setDateTime] = useState({
		date: "",
		time: ""
	})

	/*  
        Add a container on the map 
        Container holds text to show when the map was last updated
    */
	useEffect(() => {
		// Get todays date
		const today = new Date()
		const date = `${today.getDate()}-${
			today.getMonth() + 1
		}-${today.getFullYear()}`

		// Get latest date in the database
		const db = getDatabase()
		const latestDate = ref(db, `rainfallData/`)
		onChildAdded(latestDate, (data) => {
			// Loop through the object to get the latest time in the database for the given date
			const timeArr = Object.keys(data.val())
			Math.max(
				timeArr.map((time) => {
					if (data.key !== date || time < "10:30") {
						return setDateTime({
							date,
							time: "10:30"
						})
					} else {
						return setDateTime({
							date: data.key,
							time: `${time}:00`
						})
					}
				})
			)
		})

		if (props.mapState) {
			const lastUpdated = L.control({ position: "topleft" })

			lastUpdated.onAdd = () => {
				const div = L.DomUtil.create("div", "last-updated")
				div.innerHTML = `<h2>Last Updated: ${dateTime.date} ${dateTime.time}</h2>`
				return div
			}
			lastUpdated.addTo(props.mapState)
		}
	}, [dateTime.date, dateTime.time])
	return null
}

export default LastUpdated
