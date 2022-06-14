import React, { createContext, useState } from "react"
import "./styles.css"
// Firebase 
import { initializeApp } from "firebase/app"
import { config } from "./config/config"
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth"
import { getDatabase, onValue, ref, set, update, push } from "firebase/database"
// components
import Navbar from "./components/Navbar" 
import Map from "./components/Map"
import UserRegistrationForm from "./components/UserRegistrationForm"
import UploadDataForm from "./components/UploadDataForm"

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
    // Set state to hold a user object
    const [user, setUser] = useState({})
    // Set state to hold the rainfall data
    const [rainfallData, setRainfallData] = useState({})
    // Set state for user registration form, upload data from and map
    const [mapFormToggle, setMapFormToggle] = useState(
        {
            showMap: true,
            showUploadDataForm: false,
            showUserRegistrationForm: false
        }
    )

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
        const existingUsers = ref(db, `users/`)
        onValue(existingUsers, (snapshot) => {
            const existingUsersObj = snapshot.val()
            existingUsersObj === null || !(user.uid in existingUsersObj) ?
                // Save user in the db then write user to context
                saveUserData(user) :
                // Write user to context
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
    */
    const logout = () => {
        signOut(auth).then(() => {
            // Set use state to empty object -> clears context
            setUser({})
            // Show map
            setMapFormToggle((prevMapFormToggle) => {
                return (
                    {
                        showMap: true,
                        showUploadDataForm: false,
                        showUserRegistrationForm: false
                    }
                )
            })
        }).catch((error) => {
            console.log(error)
        })
    }

    /*
        If user is registered show the upload data form and hide map
        Else show user registration form and hide map
    */
   const uploadData = () => {
        user.isRegistered ? 
            setMapFormToggle((prevMapFormToggle) => {
                return (
                    {
                        ...prevMapFormToggle,
                        showMap: false,
                        showUploadDataForm: true
                    }
                )
            }) :
            setMapFormToggle((prevMapFormToggle) => {
                return (
                    {
                        ...prevMapFormToggle,
                        showMap: false,
                        showUserRegistrationForm: true
                    }
                )
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
            return (
                {
                    ...prevUser,
                    isRegistered: true,
                    registration: formData
                }
            )
        })

        setMapFormToggle((prevMapFormToggle) => {
            return (
                {
                    ...prevMapFormToggle,
                    showMap: true,
                    showUserRegistrationForm: false
                }
            )
        })

        update(ref(db, `users/${user.id}`), {
            isRegistered: true,
            registration: formData
        })
    }

    /*
        User submits rainfall data
        Set the data to the rainfall state
        Hide the upload data form and show the map
        Send the rainfall data to the db
    */
    const handleUploadDataSubmit = (formData) => {
        setRainfallData(formData)

        setMapFormToggle((prevMapFormToggle) => {
            return (
                {
                    ...prevMapFormToggle,
                    showMap: true,
                    showUploadDataForm: false
                }
            )
        })

        /* 
            TODO
            How to append the data to a user
            Push works but creates a new key which is a problem
        */
        const today = new Date()
        const date = `${today.getDate()}-${today.getMonth()+1}-${today.getFullYear()}` 
        set(ref(db, `rainfallData/${user.id}`), {
            [date]: formData
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
                    signInWithGoogle={() => signInWithGoogle()}
                    logout={() => logout()}
                    uploadData={() => uploadData()}
                />
                {mapFormToggle.showMap && <Map/>}
                <div style={mapFormToggle.showUserRegistrationForm || mapFormToggle.showUploadDataForm ? formComponentStyle : {}}>
                    {mapFormToggle.showUserRegistrationForm && <UserRegistrationForm handleUserRegistrationSubmit={handleUserRegistrationSubmit}/>}
                    {mapFormToggle.showUploadDataForm && <UploadDataForm handleUploadDataSubmit={handleUploadDataSubmit}/>}
                </div>
            </UserContext.Provider>
        </div>
    )
}

export default App