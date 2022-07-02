import React, { createContext, useState } from "react"
import "./styles.css"
// Firebase
import { initializeApp } from "firebase/app"
import { config } from "./config/config"
import {
	FacebookAuthProvider,
	getAuth,
	GoogleAuthProvider,
	linkWithPopup,
	signInWithPopup,
	signOut
} from "firebase/auth"
import { getDatabase, onValue, ref, set, update } from "firebase/database"
// components
import Navbar from "./components/Navbar"
import Map from "./components/Map"
import UserRegistrationForm from "./components/userRegistration/UserRegistrationForm"
import UploadDataForm from "./components/UploadDataForm"
import Login from "./components/Login"

// Initialize the Firebase app
initializeApp(config.firebaseConfig)
const auth = getAuth()
const db = getDatabase()

/*
  Set the user context
  Export it so that the other components can import and use it
*/
export const UserContext = createContext()

const App = () => {
	// Sign in providers
	const googleProvider = new GoogleAuthProvider()
	const facebookProvider = new FacebookAuthProvider()

	// Set state to hold a user object
	const [user, setUser] = useState({})
	// Set state for user registration form, upload data from and map
	const [mapFormToggle, setMapFormToggle] = useState({
		showMap: true,
		showUploadDataForm: false,
		showUserRegistrationForm: false,
		showLogin: false
	})

	/*
    	Hides the forms and shows the map
  	*/
	const hideFormShowMap = () => {
		setMapFormToggle({
			showMap: true,
			showUploadDataForm: false,
			showUserRegistrationForm: false,
			showLogin: false
		})
	}

	/*
		Login
		Hide map
		Show login options
	*/
	const login = () => {
		setMapFormToggle((prevMapFormToggle) => {
			return {
				...prevMapFormToggle,
				showMap: false,
				showLogin: true
			}
		})
	}

	/*
		Sign the user in with Google gmail account
		Call the function getUser and pass in the signed in user
		call hideFormShowMap function
  	*/
	const signInWithGoogle = () => {
		signInWithPopup(auth, googleProvider)
			.then((result) => {
				hideFormShowMap()
				getUser(result.user)
			})
			.catch(() => {
				alert(
					"In order to link your acccount with Facebook you will be redirected to the Facebook sign in, once you have signed in link your Google account"
				)
				// Sign in with facebook then link account to google
				signInWithPopup(auth, facebookProvider).then((result) => {
					linkWithPopup(result.user, googleProvider)
				})
			})
	}

	/*
		Sign the user in with Facebook account
		Call the function getUser and pass in the signed in user
  	*/
	const signInWithFacebook = () => {
		signInWithPopup(auth, facebookProvider)
			.then((result) => {
				hideFormShowMap()
				getUser(result.user)
			})
			.catch(() => {
				alert(
					"In order to link your acccount with Google you will be redirected to the Google sign in, once you have signed in link your Facebook account"
				)
				// Sign in with google then link account to facebook
				signInWithPopup(auth, googleProvider).then((result) => {
					linkWithPopup(result.user, facebookProvider)
				})
			})
	}

	/*
		Function accepts a user as an input
		Gets all of the users that have added to the database
		If the signed in user exists then write the user to context
		Else register the user then write the user to context
  	*/
	const getUser = (user) => {
		const existingUsers = ref(db, `users/`)
		onValue(existingUsers, (snapshot) => {
			const existingUsersObj = snapshot.val()
			existingUsersObj === null || !(user.uid in existingUsersObj)
				? // Save user in the db then write user to context
				  saveUserData(user)
				: // Write user to context
				  writeUserData(user)
		})
	}

	/*
		Takes a user as an argument 
		saves the users data to context
  	*/
	const writeUserData = (user) => {
		// Get user from db
		const userRef = ref(db, `users/${user.uid}`)
		onValue(userRef, (snapshot) => {
			const userObj = snapshot.val()
			// Write user to context
			setUser(userObj)
		})
	}

	/*
		Takes user as an argument
		Save the user data to the db
		Wrtie use to context by calling WriteUserData
  	*/
	const saveUserData = (user) => {
		set(ref(db, `users/${user.uid}`), {
			id: user.uid,
			username: user.displayName,
			email: user.email,
			phone: user.phoneNumber,
			isRegistered: false
		})
		writeUserData(user)
	}

	/*
    	Logout the user
		Set the user state to an empty object
		Show the map
  	*/
	const logout = () => {
		signOut(auth)
			.then(() => {
				// Set use state to empty object -> clears context
				setUser({})
				// Show map
				hideFormShowMap()
			})
			.catch((error) => {
				console.log(error)
			})
	}

	/*
		If user is registered show the upload data form and hide map
		Else show user registration form and hide map
  	*/
	const uploadData = () => {
		user.isRegistered
			? setMapFormToggle((prevMapFormToggle) => {
					return {
						...prevMapFormToggle,
						showMap: false,
						showUploadDataForm: true
					}
			  })
			: setMapFormToggle((prevMapFormToggle) => {
					return {
						...prevMapFormToggle,
						showMap: false,
						showUserRegistrationForm: true
					}
			  })
	}

	/*
		User submits user registration form
		Update user state  
		hide user registration form show map
		update the user in the database
  	*/
	const handleUserRegistrationSubmit = (formData) => {
		setUser((prevUser) => {
			return {
				...prevUser,
				isRegistered: true,
				registration: formData
			}
		})

		hideFormShowMap()

		update(ref(db, `users/${user.id}`), {
			isRegistered: true,
			registration: formData
		})
	}

	/*
		User submits rainfall data
		Hide the upload data form and show the map
		Send the rainfall data to the db
  	*/
	const handleUploadDataSubmit = (formData) => {
		hideFormShowMap()

		const today = new Date()
		const date = `${today.getDate()}-${
			today.getMonth() + 1
		}-${today.getFullYear()}`

		const hours = today.getHours()

		update(ref(db, `rainfallData/${date}/${hours}`), {
			[user.id]: formData
		})
	}

	const formComponentStyle = {
		height: "90vh",
		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	}

	return (
		<div>
			<UserContext.Provider value={user}>
				<Navbar
					login={() => login()}
					logout={() => logout()}
					uploadData={() => uploadData()}
				/>
				{mapFormToggle.showMap && <Map />}
				<div
					style={
						mapFormToggle.showUserRegistrationForm ||
						mapFormToggle.showUploadDataForm ||
						mapFormToggle.showLogin
							? formComponentStyle
							: {}
					}
				>
					{mapFormToggle.showUserRegistrationForm && (
						<UserRegistrationForm
							handleUserRegistrationSubmit={handleUserRegistrationSubmit}
						/>
					)}
					{mapFormToggle.showUploadDataForm && (
						<UploadDataForm handleUploadDataSubmit={handleUploadDataSubmit} />
					)}
					{mapFormToggle.showLogin && (
						<Login
							signInWithGoogle={() => signInWithGoogle()}
							signInWithFacebook={() => signInWithFacebook()}
						/>
					)}
				</div>
			</UserContext.Provider>
		</div>
	)
}

export default App
