import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AntDesign from "@expo/vector-icons/AntDesign";
import { SelectList } from "react-native-dropdown-select-list";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { db, firebase } from "../firebaseConfig";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import places from "./data/places";
import crimeCategories from "./data/categories";

const storage = getStorage();

const Reporting = () => {
  const [selectedcat, setSelectedCat] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [uploading, setUploading] = useState(false);
  const [filenames, setFileName] = useState("");
  const [selectedConstituency, setSelectedConstituency] = useState(null);

  const pick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    const source = { uri: result.assets[0].uri };

    setImage(source);
  };
  const upload = async () => {
    setUploading(true);
    if (!selectedcat || !description || !image || !selectedConstituency) {
      alert("All fields are required");
      return;
    }
    alert("posting please wait...");
    console.log(selectedConstituency);
    const response = await fetch(image.uri);
    const blob = await response.blob();
    const filename = image.uri.substring(image.uri.lastIndexOf("/") + 1);

    const storageRef = ref(storage, filename);
    uploadBytes(storageRef, blob)
      .then((snapshot) => {
        console.log("uploaded");
        getDownloadURL(snapshot.ref).then((url) => {
          const imageUrl = url;
          const post = {
            image: imageUrl,
            description: description,
            createdAt: serverTimestamp(),
            status: "pending",
            location: selectedConstituency.label,
            latitude: selectedConstituency.latitude,
            longitude: selectedConstituency.longitude,
            category: selectedcat,
            comment: "",
          };
          const postRef = collection(db, "posts");
          addDoc(postRef, post)
            .then(() => {
              alert("Crime reported and is being processed");
            })
            .catch((e) => {
              console.log(e);
            });
        });
      })
      .catch((err) => {
        console.log(err);
      });

    setUploading(false);

    setFileName(filenames);
    setImage(null);
  };

  return (
    <View>
      <View style={styles.wrapper}>
        <Text style={{ marginBottom: 10 }}>Location</Text>
        <Picker
          style={{
            backgroundColor: "white",
            color: "black",
            // marginTop: 10,
            marginBottom: 10,
            // marginRight: 20,
            // marginLeft: 20,
          }}
          selectedValue={selectedConstituency}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedConstituency(itemValue)
          }
        >
          <Picker.Item label="Select location.." value={null} />
          {places.map((constituency, index) => (
            <Picker.Item
              key={index}
              label={constituency.label}
              value={constituency}
            />
          ))}
        </Picker>
        {/* category */}
        <Text style={{ marginBottom: 10 }}>Category</Text>
        <Picker
          style={{
            backgroundColor: "white",
            color: "black",
            // marginTop: 10,
            marginBottom: 10,
            // marginRight: 20,
            // marginLeft: 20,
          }}
          selectedValue={selectedcat}
          onValueChange={(itemValue, itemIndex) => setSelectedCat(itemValue)}
        >
          <Picker.Item label="Select crime category" value={null} />
          {crimeCategories.map((cat, index) => (
            <Picker.Item key={index} label={cat.name} value={cat.name} />
          ))}
        </Picker>
        <Text style={{ marginBottom: 10 }}>Description</Text>
        <TextInput
          style={styles.input}
          placeholder="Describe the crime..."
          onChangeText={setDescription}
          multiline={true}
        />

        <TouchableOpacity onPress={pick} style={{ alignItems: "center" }}>
          <AntDesign name="pluscircleo" size={20} color="black" />
          <Text>Add photo</Text>
        </TouchableOpacity>

        {image && <Image source={{ uri: image.uri }} style={styles.image} />}

        <TouchableOpacity style={styles.login} onPress={upload}>
          <Text style={{ color: "white" }}> Report</Text>
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
  image: {
    flex: 1,
    borderWidth: 1,
    borderColor: "black",
    minHeight: 300,
  },
});

export default Reporting;
