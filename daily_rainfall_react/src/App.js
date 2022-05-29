import React from "react"
import "./styles.css"

import Navbar from "./components/Navbar" 
import DateFilter from "./components/DateFilter"

function App() {
    return (
        <div>
            <Navbar/>
            <DateFilter/>
        </div>
    )
}

export default App