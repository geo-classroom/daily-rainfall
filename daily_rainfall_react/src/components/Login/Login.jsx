import React from "react"
import "./login.css"
import { Facebook, Google } from "@mui/icons-material"
import { Button, createTheme, ThemeProvider } from "@mui/material"

/*
    Props
    signInWithGoogle
    signInWithFacebook
*/

const Login = (props) => {
	// Custom theme colours for the login buttons

	const theme = createTheme({
		status: {
			danger: "#e53e3e"
		},
		palette: {
			primary: {
				main: "#0971f1",
				darker: "#053e85"
			},
			google: {
				main: "#cf4332",
				contrastText: "#FFFFFF"
			},
			facebook: {
				main: "#1877F2",
				contrastText: "#FFFFFF"
			}
		}
	})

	return (
		<div id="login-container">
			<h1>Login</h1>
			{/* eslint-disable react/prop-types */}
			<ThemeProvider theme={theme}>
				<Button
					startIcon={<Google />}
					variant="contained"
					size="medium"
					color="google"
					onClick={props.signInWithGoogle}
				>
					Sign in with Google
				</Button>
				<Button
					startIcon={<Facebook />}
					variant="contained"
					size="medium"
					color="facebook"
					onClick={props.signInWithFacebook}
				>
					Continue with Facebook
				</Button>
			</ThemeProvider>
		</div>
	)
}

export default Login
