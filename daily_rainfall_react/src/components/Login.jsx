import React from "react"

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
				Sign in with Google
			</button>
			<button id="sign-in-facebook-btn" onClick={props.signInWithFacebook}>
				Sign in with Facebook
			</button>
		</div>
	)
}

export default Login
