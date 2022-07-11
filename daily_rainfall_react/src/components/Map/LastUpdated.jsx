import { useEffect } from "react"
import L from "leaflet"

/*
    Props:
    mapState
*/

const LastUpdated = (props) => {
	/* eslint-disable react/prop-types */
	useEffect(() => {
		if (props.mapState) {
			const lastUpdated = L.control({ position: "topleft" })

			lastUpdated.onAdd = () => {
				const div = L.DomUtil.create("div", "last-updated")
				div.innerText = "Last Updated: "
				return div
			}
			lastUpdated.addTo(props.mapState)
		}
	}, [props.mapState])
	return null
}

export default LastUpdated
