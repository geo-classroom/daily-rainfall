import React from "react"
import "./login.css"
import { Google, Facebook } from "@mui/icons-material"

/*
    Props
    signInWithGoogle
    signInWithFacebook
*/

const Login = (props) => {
	return (
		<div id="login-container">
			<h1>Login</h1>
			{/* eslint-disable react/prop-types */}
			<button id="sign-in-google-btn" onClick={props.signInWithGoogle}>
				<Google /> Sign in with Google
			</button>
			<button id="sign-in-facebook-btn" onClick={props.signInWithFacebook}>
				<Facebook /> Sign in with Facebook
			</button>
		</div>
	)
}

export default Login
