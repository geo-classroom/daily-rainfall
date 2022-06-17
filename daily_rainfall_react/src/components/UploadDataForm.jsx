import React, { useState, useContext, createRef } from "react"
import { UserContext } from "../App"

/*
    Props
    handleUploadDataSubmit
*/

const UploadDataForm = (props) => {
    // User context
    const user = useContext(UserContext)

    // State to hold data from the form
    const [formData, setFormData] = useState(
        {
            latitude: user.registration.latitude,
            longitude: user.registration.longitude,
            rainfallAmount: "",
            isHail: false,
            isSnow: false,
            isFrost: false,
            hailSize: "",
            //hailPhoto: createRef(),
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
        props.handleUploadDataSubmit(formData)
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
                    type="number" 
                    placeholder="Amount of rainfall (ml)"
                    onChange={handleChange}
                    name="rainfallAmount"
                    value={formData.rainfallAmount}
                />
                {
                    // Render additional form items if the addMoreData is selected
                    user.registration.addMoreData &&  
                        <div id="add-more-data-checkbox-container">
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
                        </div>
                }
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
                {
                /* 
                    TODO 
                    Allow users to upload files for pictures of hail 
                */
                }
                {/* {
                    formData.isHail &&
                        <input 
                            type="file" 
                            ref={formData.hailPhoto}
                        />
                } */}
                {
                    // If hail selected show rest of form for hail input
                    formData.isHail && 
                        <input 
                            type="time" 
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
                            type="time"
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