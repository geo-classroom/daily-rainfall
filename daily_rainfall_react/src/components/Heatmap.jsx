import { useEffect } from "react"
import { useMap } from "react-leaflet"
import "leaflet.heat"
import L from "leaflet"

const Heatmap = (props) => {
  const map = useMap()
  useEffect(() => {
    const points = props.rainfallData.map((point) => {
      return [point.latitude, point.longitude, point.rainfallAmount]
    })

    L.heatLayer(points).addTo(map)
  }, [])
}

export default Heatmap
