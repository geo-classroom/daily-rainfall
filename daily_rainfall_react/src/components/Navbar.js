import React from "react"

/*
    Props:
        signInWithGoogle
        currentUser
        Logout
*/

function Navbar(props) {
    return (
        <div id="navbar-container">
            <h1>UP Rainfall Project</h1>
            {
                // If user signed in change Welcome to show username
                props.currentUser ? 
                <h2>{props.currentUser}</h2> : 
                <h2>Welcome</h2>
            }
            <div id="navbar-btn-container">
                <button>About Project</button>
                {
                    // If user signed in show logout button else show login button
                    props.currentUser ? 
                    <button onClick={props.logout}>Logout</button> :
                    <button onClick={props.signInWithGoogle}>Login</button>
                    
                }
                <button>Upload Data</button>
            </div>
        </div>
    )
}

export default Navbar