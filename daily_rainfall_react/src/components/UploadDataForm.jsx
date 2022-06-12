import React, { useState, useContext } from "react"
import { UserContext } from "../App"

const UploadDataForm = () => {
    // User context
    const user = useContext(UserContext)

    // State to hold data from the form
    const [formData, setFormData] = useState(
        {
            userId: user.id,
            //latitude: user.registration.latitude,
            //longitude: user.registration.longitude,
            rainfallAmount: "",
            isHail: false,
            isSnow: false,
            isFrost: false,
            hailSize: "",
            hailTime: "",
            snowAmount: "",
            snowTime: ""
        }
    )

    /*
        As the form data changes in the form the state will be updated along with it
    */
    const handleChange = (event) => {
        const { name, value, type, checked } = event.target
        setFormData((prevFormData) => {
            return (
                {
                    ...prevFormData,
                    [name]: type === "checkbox" ? checked : value
                }
            )
        })
    }

    /*
        Console log the form when submitted
        TODO
        Send form to the App component
    */
    const handleSubmit = (event) => {
        event.preventDefault()
        console.table(formData)
    }


    return (
        <div id="form-container">
            <form id="form" onSubmit={handleSubmit}>
                <h1>Upload Data</h1>
                {/* Collect users id and location (latitude and longitude automatically and hide these inputs) */}
                <input 
                    type="text"
                    hidden
                    onChange={handleChange}
                    name="userId"
                    value={formData.userId}
                />
                <input 
                    type="text"
                    hidden
                    onChange={handleChange}
                    name="latitude"
                    value={formData.latitude}
                />
                <input
                    type="text"
                    hidden
                    onChange={handleChange}
                    name="longitude"
                    value={formData.longitude}
                /> 
                <input 
                    type="text" 
                    placeholder="Amount of rainfall (ml)"
                    onChange={handleChange}
                    name="rainfallAmount"
                    value={formData.rainfallAmount}
                />
                <label>
                    <input 
                        type="checkbox"
                        id="isHail"
                        checked={formData.isHail}
                        onChange={handleChange}
                        name="isHail"
                    />
                    Hail
                </label>
                <label>
                    <input 
                        type="checkbox"
                        id="isSnow"
                        checked={formData.isSnow}
                        onChange={handleChange}
                        name="isSnow"
                    />
                    Snow
                </label>
                <label>
                    <input 
                        type="checkbox"
                        id="isFrost"
                        checked={formData.isFrost}
                        onChange={handleChange}
                        name="isFrost"
                    />
                    Frost
                </label>
                {
                    // If hail selected show rest of form for hail input
                    formData.isHail && 
                        <input 
                            type="text" 
                            placeholder="Hail size"
                            onChange={handleChange}
                            name="hailSize"
                            value={formData.hailSize}
                        />
                }  
                {/* <input 
                    type="file" 
                    ref={formData.hailPhoto}
                    onChange={handleChange}
                /> */}
                {
                    // If hail selected show rest of form for hail input
                    formData.isHail && 
                        <input 
                            type="text" 
                            placeholder="Time of hail"
                            onChange={handleChange}
                            name="hailTime"
                            value={formData.hailTime}
                        />
                }
                {
                    // If snow selected show rest of form for snow input
                    formData.isSnow && 
                        <select
                            id="snowAmount"
                            value={formData.snowAmount}
                            onChange={handleChange}
                            name="snowAmount"
                        >
                            <option value="Option 1">Option 1</option>
                            <option value="Option 2">Option 2</option>
                            <option value="Option 3">Option 3</option>
                        </select>
                }
                {
                    // If snow selected show rest of form for snow input
                    formData.isSnow && 
                        <input 
                            type="text"
                            placeholder="Time of snow"
                            onChange={handleChange}
                            name="snowTime"
                            value={formData.snowTime}
                        />
                }
                <input type="submit" value="submit"/>
            </form>
        </div>
    )
}

export default UploadDataForm