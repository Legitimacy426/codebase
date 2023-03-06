import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { SelectList } from "react-native-dropdown-select-list";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { db, firebase } from '../firebaseConfig'
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { addDoc, collection, getDocs, query,serverTimestamp,where } from "firebase/firestore"
const storage = getStorage()

const Reporting = () => {
  const [selected, setSelected] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('')
  const [location,setLocation] = useState('')
  const [uploading, setUploading] = useState(false)
  const [filenames,setFileName] = useState('')
  const data = [
    { key: "1", value: "Rape", },
    { key: "2", value: "Robbery" },
    { key: "3", value: "Buglerry" },
    { key: "4", value: "Suicide" },
    { key: "5", value: "Kidnap" },
    { key: "6", value: "Drugs" },
    { key: "7", value: "Traffic" },
    { key: "8", value: "Other" },
  ];

  const pick = async () => {
    let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality:1
    })
    const source = { uri: result.uri }
 
    setImage(source)
    
  }
  const upload = async () => {
    setUploading(true)
    if (!location || !description || !image || !selected) {
      alert("All fields are required")
      return
    }
    alert("posting please wait...")

    const response = await fetch(image.uri)
    const blob = await response.blob()
    const filename = image.uri.substring(image.uri.lastIndexOf('/') + 1)
   
        const storageRef = ref(storage, filename);
        uploadBytes(storageRef, blob).then( (snapshot) => {
        console.log('uploaded');
            getDownloadURL(snapshot.ref).then(url => {
              const imageUrl = url
              const post = {
                image: imageUrl,
                description: description,
                createdAt: serverTimestamp(),
                status: "pending",
                location: location,
                category:selected
              }
              const postRef = collection(db, "posts")
              addDoc(postRef, post).then(() => {
                alert("posted")
              })
                .catch((e) => {
                console.log(e)
              })
        });
        }).catch(err => {
            console.log(err)
        })
   
    setUploading(false)
 
    setFileName(filenames)
    setImage(null)

   
}

  return (
    <View>
      <View style={styles.container}>
        <SelectList
          setSelected={(val) => setSelected(val)}
          data={data}
          save="value"
          placeholder=""
        />

      </View>

      <View style={styles.wrapper}>
      <TextInput
            style={styles.input}
          placeholder="Describe the crime..."
          onChangeText={setDescription}
          multiline={true}
        />
      <TextInput
            style={styles.input}
          placeholder="Location"
          onChangeText={setLocation}
        />
        <TouchableOpacity onPress={pick} style={{alignItems:"center"}}>
          <AntDesign name="pluscircleo" size={20} color="black" />
          <Text>Add photo</Text>
        </TouchableOpacity>
        
        {image && <Image source={{ uri: image.uri }} style={styles.image} />}


          <TouchableOpacity style={styles.login} onPress={upload}>
                 <Text style={{color:"white"}}> Report</Text>
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
    padding:20
  },
  input: {
    padding:12,
    marginTop:5,
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "white",
    marginBottom: 14,
    borderRadius:5
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
    alignItems:"center"
  },
  image: {
    flex: 1,
    borderWidth: 1,
    borderColor: "black",
    minHeight:300
  }
});

export default Reporting;
