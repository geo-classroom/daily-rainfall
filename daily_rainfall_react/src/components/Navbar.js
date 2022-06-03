import React, { useContext } from "react"
import { UserContext } from "../App"

/*
    Props:
        signInWithGoogle
        logout
*/

const Navbar = (props) => {
    // Get the user context
    const user = useContext(UserContext)

    return (
        <div id="navbar-container">
            <h1>UP Rainfall Project</h1>
            {
                // If user signed in change Welcome to show username
                user.username ? <h2>{user.username}</h2> : <h2>Welcome</h2>
            }
            <div id="navbar-btn-container">
                <button>About Project</button>
                {
                    // If user signed in show logout button else show login button
                    user.username ? 
                        <button onClick={props.logout}>Logout</button> :
                        <button onClick={props.signInWithGoogle}>Login</button>     
                }
                <button>Upload Data</button>
            </div>
        </div>
    )
}

export default Navbar