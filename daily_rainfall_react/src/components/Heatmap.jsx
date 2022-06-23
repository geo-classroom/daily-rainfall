import { useMap } from "react-leaflet"
import "leaflet.heat"
import L from "leaflet"
import data from "../data"

/*
  Props
  rainfallData
*/

const Heatmap = (props) => {
  console.log(props.rainfallData)
  const map = useMap()
  const points = data.map((point) => {
    return [point.latitude, point.longitude, point.rainfallAmount]
  })

  L.heatLayer(points).addTo(map)
}

export default Heatmap
