import { useMap } from "react-leaflet"
import "leaflet.heat"
import L from "leaflet"
import data from "../data"

const Heatmap = () => {
  const map = useMap()
  const points = data.map((point) => {
    return [point.latitude, point.longitude, point.rainfallAmount]
  })

  L.heatLayer(points).addTo(map)
}

export default Heatmap
