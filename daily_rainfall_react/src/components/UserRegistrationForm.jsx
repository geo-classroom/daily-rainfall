import React, { useContext, useState } from "react"
// Firebase
import { getDatabase, ref, update, set } from "firebase/database"
// Import USerContext
import { UserContext } from "../App"

const UserRegistrationForm = () => {
    // User context
    const user = useContext(UserContext)

    /*
        State to hold the data from the form
    */
    const [formData, setFormData] = useState(
        {
            permissionToShowLocation: false,
            latitude: "",
            longitude: "",
            typeOfRaingauge: "",
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
        TODO    
        Sends the data to the db
    */
    const handleSubmit = (event) => {
        event.preventDefault()
        console.table(formData)
        
        // NOT WORKING
        // const db = getDatabase()
        // update(ref(db, `users/${user.id}`), {
        //     ...user,
        //     isRegistered: true,
        //     reistration: formData
        // })
    }

    /*
        Gets the current location of the user 
        Sets the latitude and longitude to the state of the form so that the form fields update
    */
    const getLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
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
        })
    }

    return (
        <div id="user-registration-from-container">
            <form id="user-registration-from" onSubmit={handleSubmit}>
                <h1>Register</h1>
                <div>
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
                </div>
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
                    id="typeOfRaingauge"
                    value={formData.typeOfRaingauge}
                    onChange={handleChange}
                    name="typeOfRaingauge"
                >
                    <option value="Option 1">Option 1</option>
                    <option value="Option 2">Option 2</option>
                    <option value="Option 3">Option 3</option>
                </select>
                <input type="image"/>
                <div>
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
                    
                </div>
                <input type="submit" value="submit"/>
            </form>
        </div>
    )
}

export default UserRegistrationForm