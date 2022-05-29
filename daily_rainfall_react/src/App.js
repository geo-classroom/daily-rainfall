import React from "react"
import "./styles.css"

import Navbar from "./components/Navbar" 
import DateFilter from "./components/DateFilter"
import Map from "./components/Map"

function App() {
    return (
        <div>
            <Navbar/>
            <DateFilter/>
            <Map/>
        </div>
    )
}

export default App