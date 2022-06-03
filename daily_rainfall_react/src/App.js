import React, { createContext, useState } from "react"
import "./styles.css"
// Firebase 
import { initializeApp } from "firebase/app"
import { config } from "./config/config"
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth"
import { getDatabase, onValue, ref, set } from "firebase/database"
// components
import Navbar from "./components/Navbar" 
import DateFilter from "./components/DateFilter"
import Map from "./components/Map"

// Initialize the Firebase app
initializeApp(config.firebaseConfig)
const auth = getAuth()
const db = getDatabase()

// Set the UserContext
export const UserContext = createContext() 

const App = () => {
    // Set state to hold a user object
    const [user, setUser] = useState({})

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
            user.uid in existingUsers ?
                writeUserData(user) :
                console.log("register user")
        })
    }

    /*
        Takes a user as an argument 
        saves the users data to context
    */
    const writeUserData = (user) => {
        setUser({
            id: user.id,
            username: user.displayName,
            email: user.email,
            phone: user.phoneNumber
        })
    }

    /*
        Logout the user
    */
    const logout = () => {
        signOut(auth).then(() => {
            // Set use state to empty object
            setUser({})
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <div>
            <UserContext.Provider value={user}>
                <Navbar
                    signInWithGoogle={() => signInWithGoogle()}
                    logout={() => logout()}
                />
                <DateFilter/>
                <Map/>
            </UserContext.Provider>
        </div>
    )
}

export default App