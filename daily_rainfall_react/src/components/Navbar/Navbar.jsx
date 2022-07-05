import React, { useContext } from "react"
import { UserContext } from "../../App"
import { DropButton, Button } from "grommet"
import "./navbar.css"

/*
    Props:
		login
        logout
        uploadData
        showLogin
*/

const Navbar = (props) => {
	// Get the user context
	const user = useContext(UserContext)

	return (
		<div id="navbar-container">
			<h1 id="main-heading">UP Daily Rainfall</h1>
			<h4 id="responsive-heading">UP Daily Rainfall</h4>
			{
				// If user signed in change Welcome to show username
				<h2>{user.username ? user.username : "Welcome"}</h2>
			}
			<div id="navbar-btn-container">
				<div id="button-menu">
					<button>About Project</button>
					{
						// If user signed in show logout button else show login button
						user.username ? (
							/* eslint-disable react/prop-types */
							<button onClick={props.logout}>Logout</button>
						) : (
							<button onClick={props.login}>Login</button>
						)
					}
					{
						// If user signed in enable button
						<button disabled={!user.username} onClick={props.uploadData}>
							Upload Data
						</button>
					}
				</div>

				<DropButton
					id="drop-menu"
					label="Menu"
					dropContent={
						<div id="drop-menu-content">
							<Button secondary size="small">
								About Project
							</Button>
							{
								// If user signed in show logout button else show login button
								user.username ? (
									/* eslint-disable react/prop-types */
									<Button secondary size="small" onClick={props.logout}>
										Logout
									</Button>
								) : (
									<Button secondary size="small" onClick={props.login}>
										Login
									</Button>
								)
							}
							{
								// If user signed in enable button
								<Button
									secondary
									size="small"
									disabled={!user.username}
									onClick={props.uploadData}
								>
									Upload Data
								</Button>
							}
						</div>
					}
				/>
			</div>
		</div>
	)
}

export default Navbar
