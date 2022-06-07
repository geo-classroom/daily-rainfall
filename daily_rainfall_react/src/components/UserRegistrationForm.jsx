import React from "react"

/*
    TODO
    Fix from from html to jsx
*/

const UserRegistrationForm = () => {
    return (
        <div id="user-registration-from-container">
            <form id="user-registration-from">
                <h1>Register</h1>
                <div>
                    <input type="checkbox" id="permissionForLocation"/>
                    <label for="permissionForLocation">Permission to show location</label>
                </div>
                <div>
                    <input type="text" disabled placeholder="Location of raingauge"/>
                    <button type="button">Get Location</button>
                </div>
                <select>
                    <option value="" selected disabled hidden>Type of raingauge</option>
                    <option value="Option 1">Option 1</option>
                    <option value="Option 2">Option 2</option>
                    <option value="Option 3">Option 3</option>
                </select>
                <input type="image"/>
                <div>
                    <input type="checkbox" id="addMoreData"/>
                    <label for="addMoreData">Add more Data</label>
                </div>
            </form>
        </div>
    )
}

export default UserRegistrationForm