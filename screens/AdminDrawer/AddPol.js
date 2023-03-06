import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { SelectList } from "react-native-dropdown-select-list";
import React, { useState } from "react";
import { auth, db } from "../../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const AddPol = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [location,setLocation] = useState('')
  const handleSubmit = () => {
    if (!email || !password || !location) {
      alert("All fields are required")
      return
    }
    alert("Processing...")
    createUserWithEmailAndPassword(auth, email, password).then((credentials) => {
      const uid = credentials.user.uid
      const user = {
        userId : uid,
        email: email,
        station: location,
        createdAt: serverTimestamp(),
        password: password,
        role:"police"
      }
      const userRef = collection(db,'users')
      addDoc(userRef, user)
        .then(() => {
        alert("Police added successifully")
        }).catch((e) => {
        alert(e.message)
      })
    }).catch((e) => {
      console.log(e)
      alert(e.message)
  })
}



  return (
    <View>
      <View style={styles.container}>
        
      </View>

      <View style={styles.wrapper}>
       
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          onChangeText={setEmail}
         
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={setPassword}
         
        />
        <TextInput style={styles.input}
          onChangeText={setLocation}
          placeholder="Police Station" />
     
        <TouchableOpacity
          style={styles.login}
          onPress={handleSubmit}
        >
          <Text style={{ color: "white" }}> Create</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  wrapper: {
    padding: 20,
  },
  input: {
    padding: 12,
    marginTop: 5,
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "white",
    marginBottom: 14,
    borderRadius: 5,
  },
  login: {
    backgroundColor: "black",
    padding: 20,

    alignSelf: "center",
    marginTop: 20,
    color: "white",
    borderRadius: 50,
    width: 300,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AddPol;
