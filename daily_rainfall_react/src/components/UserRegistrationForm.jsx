import React, { createRef, useState } from "react"

/*
    Props
    handleUserRegistrationSubmit
*/

const UserRegistrationForm = (props) => {
    /*
        State to hold the data from the form
    */
    const [formData, setFormData] = useState(
        {
            permissionToShowLocation: false,
            latitude: "",
            longitude: "",
            raingaugeType: "",
            // raingaugePhoto: createRef(),
            addMoreData: false
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
        Submits the form data to the App component
    */
    const handleSubmit = (event) => {
        event.preventDefault()
        props.handleUserRegistrationSubmit(formData)
    }

    /*
        Gets the current location of the user 
        Sets the latitude and longitude to the state of the form so that the form fields update
    */
    const getLocation = () => {
        navigator.geolocation.getCurrentPosition(success, error)  
    }

    /* 
        Succesful postion returned from getLocation 
        Update the formData fields
    */
    const success = (position) => {
        const { latitude, longitude } = position.coords
        setFormData((prevFormData) => {
            return (
                {
                    ...prevFormData,
                    latitude: latitude,
                    longitude: longitude
                }
            )
        })
    }

    /*
        If an error is returned from getLocation 
        Console log the error
    */
    const error = (error) => {
        console.log(error)
    }

    return (
        <div id="form-container">
            <form id="form" onSubmit={handleSubmit}>
                <h1>Register</h1>
                <label>
                    <input 
                        type="checkbox"
                        id="permissionToShowLocation"
                        checked={formData.permissionToShowLocation}
                        onChange={handleChange}
                        name="permissionToShowLocation"
                    />
                    Permission to show Location
                </label>
                <input 
                    type="text" 
                    placeholder="Latitude"
                    onChange={handleChange}
                    name="latitude"
                    value={formData.latitude}
                    disabled 
                />
                <input 
                    type="text" 
                    placeholder="Longitude"
                    onChange={handleChange}
                    name="longitude"
                    value={formData.longitude}
                    disabled 
                />
                <button type="button" onClick={getLocation}>Get Location</button>
                <select
                    id="raingaugeType"
                    value={formData.raingaugeType}
                    onChange={handleChange}
                    name="raingaugeType"
                >
                    <option value="Option 1">Option 1</option>
                    <option value="Option 2">Option 2</option>
                    <option value="Option 3">Option 3</option>
                </select>
                {
                /* 
                    TODO 
                    Allow users to upload files for pictures of hail 
                */
                }
                {/* <input 
                    type="file" 
                    ref={formData.raingaugePhoto}
                /> */}
                <label>
                    <input 
                        type="checkbox"
                        id="addMoreData"
                        checked={formData.addMoreData}
                        onChange={handleChange}
                        name="addMoreData"
                    /> 
                    Add more Data
                </label>
                {/* Wait for location coordinates to load before allowing user to submit */}
                <input disabled={!formData.latitude} type="submit" value="submit"/>
            </form>
        </div>
    )
}

export default UserRegistrationForm