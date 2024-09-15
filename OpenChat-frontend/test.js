const { initializeApp } = require("firebase/app");

const firebaseConfig = {
    apiKey: "AIzaSyANBSKPufh6OwwRsxju3NwFcW_zFepXzS0",
    authDomain: "openchat-c8c21.firebaseapp.com",
    projectId: "openchat-c8c21",
    storageBucket: "openchat-c8c21.appspot.com",
    messagingSenderId: "15768721681",
    appId: "1:15768721681:web:277feeb064f65bf21a94b0",
    measurementId: "G-WEVSMS6985"
  };

const app = initializeApp(firebaseConfig)


const { getDatabase, ref } = require("firebase/database")

const db = getDatabase(app) // <-- Pass in the initialized app

//Creating the reference (The path in db you are trying to read/write/update)
const dbRef = ref("/User_data")


const { set, update } = require("firebase/database")

const newUserName = "user1122"
const userRef = ref(`User_data/${newUserName}`)
 
set(userRef, {name: newUserName, age: 11})
update(userRef, {age: 12})