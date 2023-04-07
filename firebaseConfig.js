import firebase from 'firebase/compat/app'

import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
import { getFirestore } from "firebase/firestore"
import {getAuth} from "firebase/auth"
const firebaseConfig = {
    apiKey: "AIzaSyAVO4dX8U4BNF6LrFXa1N2Z4j50YAhZ7ao",
    authDomain: "crimereportingapp-55420.firebaseapp.com",
    projectId: "crimereportingapp-55420",
    storageBucket: "crimereportingapp-55420.appspot.com",
    messagingSenderId: "421795109950",
    appId: "1:421795109950:web:12a013c92f2c7692ee456f"
};
  
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}
const db = getFirestore()
const auth = getAuth()
export {firebase,db,auth}