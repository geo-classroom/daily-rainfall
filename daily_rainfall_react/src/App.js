import React from "react"
import "./styles.css"
// Firebase 
import { initializeApp } from "firebase/app"
import { config } from "./config/config"
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
// components
import Navbar from "./components/Navbar" 
import DateFilter from "./components/DateFilter"
import Map from "./components/Map"

// Initialize the Firebase app
initializeApp(config.firebaseConfig)

function App() {
    const auth = getAuth()
    const signInWithGoogle = async () => {
        signInWithPopup(auth, new GoogleAuthProvider())
        .then(response => {
            console.log(response.user.uid)
        })
        .catch((error) => {
            console.log(error)
        })
    }


    return (
        <div>
            <Navbar
                googleSignIn={() => signInWithGoogle()}
            />
            <DateFilter/>
            <Map/>
        </div>
    )
}

export default App