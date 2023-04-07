import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import AntDesign from "@expo/vector-icons/AntDesign";
import { SelectList } from "react-native-dropdown-select-list";
import React, { useState, useRef, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";

import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
const storage = getStorage();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const AddPol = () => {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [uploading, setUploading] = useState(false);
  const [filenames, setFileName] = useState("");
  async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: description,
        data: {
          data: description,
        },
      },
      trigger: { seconds: 2 },
    });
  }

  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    return token;
  }
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  // notification
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

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
    if (!description || !image || !title) {
      alert("All fields are required");
      return;
    }
    alert("posting please wait...");

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
            status: "Verified",
            location: "General",
            category: "Urgent",
            comment: "",
          };
          const postRef = collection(db, "posts");
          addDoc(postRef, post)
            .then(async () => {
              alert("Posted successifully");
              await schedulePushNotification();
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
      <View style={styles.container}></View>

      <View style={styles.wrapper}>
        <TextInput
          style={styles.input}
          placeholder="Title / headline"
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          onChangeText={setDescription}
        />
        <TouchableOpacity onPress={pick} style={{ alignItems: "center" }}>
          <AntDesign name="pluscircleo" size={20} color="black" />
          <Text>Pick photo</Text>
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

export default AddPol;
