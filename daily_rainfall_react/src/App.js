import React from "react"
import "./styles.css"
// Firebase 
import { initializeApp } from "firebase/app"
import { config } from "./config/config"
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { getDatabase, onValue, ref } from "firebase/database"
// components
import Navbar from "./components/Navbar" 
import DateFilter from "./components/DateFilter"
import Map from "./components/Map"

// Initialize the Firebase app
initializeApp(config.firebaseConfig)
const auth = getAuth()
const db = getDatabase()

const App = () => {
    /*
        Sign the user in with Google gmail account
        Call the function getUser and pass in the signed in user
    */
    const signInWithGoogle = () => {
        signInWithPopup(auth, new GoogleAuthProvider())
        .then(result => {
            getUser(result.user)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    /*
        Function accepts a user as an input
        Gets all of the users that have added to the database
        If the signed in user exists then write the user to context
        Else register the user then write the user to context
    */
    const getUser = (user) => {
        const userRef = ref(db, `users/`)
        onValue(userRef, (snapshot) => {
            const existingUsers = snapshot.val()
            console.log(existingUsers)
            user.uid in existingUsers ?
                console.log("user exists") :
                console.log("register user")
        })
    }

    return (
        <div>
            <Navbar
                signInWithGoogle={() => signInWithGoogle()}
            />
            <DateFilter/>
            <Map/>
        </div>
    )
}

export default App