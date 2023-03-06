import firebase from 'firebase/compat/app'

import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
import { getFirestore } from "firebase/firestore"
import {getAuth} from "firebase/auth"
const firebaseConfig = {
    apiKey: "AIzaSyATvA93TCvNhTv6v5T_IuslxsVjxPP-eJA",
    authDomain: "crimereport-ce973.firebaseapp.com",
    projectId: "crimereport-ce973",
    storageBucket: "crimereport-ce973.appspot.com",
    messagingSenderId: "552693574896",
    appId: "1:552693574896:web:c207b2282d38ef55842635"
};
  
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}
const db = getFirestore()
const auth = getAuth()
export {firebase,db,auth}