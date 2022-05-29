import React from "react"

function Navbar() {
    return (
        <div id="navbar-container">
            <h1>UP Rainfall Project</h1>
            {/* If user signed in change Welcome to show username */}
            <h2>Welcome</h2>
            <div id="navbar-btn-container">
                <button>About Project</button>
                <button>Login</button>
                <button>Upload Data</button>
            </div>
        </div>
    )
}

export default Navbar