import React, { useState } from "react"
import "./styles.css"
// Firebase 
import { initializeApp } from "firebase/app"
import { config } from "./config/config"
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth"
import { getDatabase, set, ref } from "firebase/database"
// components
import Navbar from "./components/Navbar" 
import DateFilter from "./components/DateFilter"
import Map from "./components/Map"

// Initialize the Firebase app
initializeApp(config.firebaseConfig)
const auth = getAuth()

function App() {
    const [currentUser, setCurrentUser] = useState("")

    // Sign the user in with Google gmail account
    function signInWithGoogle() {
        signInWithPopup(auth, new GoogleAuthProvider())
        .then(result => {
            // Calls function writeUserData
            WriteUserData(result.user)
            // Set the the currentUser to the signed in user 
            setCurrentUser(auth.currentUser.displayName)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    // Saves the data from the signed in user to the database
    function WriteUserData(user) {
        const db = getDatabase()
        set(ref(db, `users/${user.uid}`), {
            username: user.displayName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            isRegistered: false
        })
    }

    function logout() {
        signOut(auth).then(() => {
            setCurrentUser("")
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <div>
            <Navbar
                signInWithGoogle={() => signInWithGoogle()}
                currentUser={currentUser}
                logout={() => logout()}
            />
            <DateFilter/>
            <Map/>
        </div>
    )
}

export default App