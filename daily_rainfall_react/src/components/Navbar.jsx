import React, { useContext } from "react"
import { UserContext } from "../App"
// import Login from "./Login"

/*
    Props:
        signInWithGoogle
        signInWithFacebook
        logout
        uploadData
        showLogin
*/

const Navbar = (props) => {
	// Get the user context
	const user = useContext(UserContext)

	return (
		<div id="navbar-container">
			<h1>UP Rainfall Project</h1>
			{
				// If user signed in change Welcome to show username
				<h2>{user.username ? user.username : "Welcome"}</h2>
			}
			<div id="navbar-btn-container">
				<button>About Project</button>
				{
					// If user signed in show logout button else show login button
					user.username ? (
						/* eslint-disable react/prop-types */
						<button onClick={props.logout}>Logout</button>
					) : (
						<>
							<button onClick={props.signInWithGoogle}>
								Sign in with Google
							</button>
							<button onClick={props.signInWithFacebook}>
								Sign in with Facebook
							</button>
						</>
					)
				}
				{
					// If user signed in enable button
					<button disabled={!user.username} onClick={props.uploadData}>
						Upload Data
					</button>
				}
			</div>
		</div>
	)
}

export default Navbar
