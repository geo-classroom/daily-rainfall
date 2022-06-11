import React, { useState } from "react"

const UploadDataForm = () => {
    // State to hold data from the form
    const [formData, setFormData] = useState(
            {
                userId: "",
                latitude: "",
                longitude: "",
                rainfallAmount: "",
                isHail: false,
                isSnow: false,
                isFrost: false,
                hailSize: "",
                hailTime: "",
                snowTime: ""
            }
        )

    return (
        <div id="form-container">
            <form id="form">
                <h1>Upload Data</h1>
                {/* 
                Collect users id and location (latitude and longitude automatically and hide these inputs)
                <input type="text"/>
                <input type="text"/>
                <input type="text"/> 
                */}
                <input type="text" placeholder="Amount of rainfall (ml)"/>
                <label>
                    <input type="checkbox"/>
                    Hail
                </label>
                <label>
                    <input type="checkbox"/>
                    Snow
                </label>
                <label>
                    <input type="checkbox"/>
                    Frost
                </label>
                <input type="text" placeholder="Hail size"/>
                {/* <input 
                    type="file" 
                    ref={formData.hailPhoto}
                    onChange={handleChange}
                /> */}
                <input type="text" placeholder="Time of hail"/>
                <select>
                    <option value="Option 1">Option 1</option>
                    <option value="Option 2">Option 2</option>
                    <option value="Option 3">Option 3</option>
                </select>
                <input type="text" placeholder="Time of snow"/>
            </form>
        </div>
    )
}

export default UploadDataForm