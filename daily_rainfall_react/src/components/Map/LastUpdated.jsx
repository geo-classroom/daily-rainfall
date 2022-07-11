import { useEffect } from "react"
import L from "leaflet"

/*
    Props:
    mapState
*/

const LastUpdated = (props) => {
	/* eslint-disable react/prop-types */

	/*  
        Add a container on the map 
        Container holds text to show when the map was last updated
    */
	useEffect(() => {
		if (props.mapState) {
			const lastUpdated = L.control({ position: "topleft" })

			lastUpdated.onAdd = () => {
				const div = L.DomUtil.create("div", "last-updated")
				div.innerHTML = "<h2>Last Updated: </h2>"
				return div
			}
			lastUpdated.addTo(props.mapState)
		}
	}, [props.mapState])
	return null
}

export default LastUpdated
