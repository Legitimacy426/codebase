import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import useFetchPost from "../hooks/useFetchPost";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
const Post = () => {
  const navigation = useNavigation();
  const { id } = useRoute().params;
  console.log(id);
  const { post, isPendingP } = useFetchPost(id);
  const [comment, setComment] = useState("");
  const handleUpdate = () => {
    if (!comment) {
      alert("Please write something");
      return;
    }
    alert("Processing..");
    const docRef = doc(db, "posts", id);
    updateDoc(docRef, {
      comment: comment,
    })
      .then(() => {
        alert("post updated successifully");
      })
      .catch((e) => {
        alert("Error updating");
      });
  };
  const handleDelete = () => {
    alert("deleting ...");
    const docRef = doc(db, "posts", id);

    deleteDoc(docRef)
      .then(() => {
        alert("post deleted successifully");
        navigation.navigate("Reports");
      })
      .catch((e) => {
        alert("something went wrong retry");
      });
  };
  return (
    <ScrollView>
      <View style={styles.crimes}>
        {!isPendingP && (
          <View style={styles.crime}>
            <View style={{}}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  padding: 10,
                }}
              >
                <View style={{ borderWidth: 1, padding: 4, borderRadius: 30 }}>
                  <Entypo name="location-pin" color={"black"} size={19} />
                </View>
                <Text style={{ fontSize: 15 }}>{post?.location}</Text>
              </View>
            </View>
            <Image
              source={{ uri: post?.image }}
              style={{ height: 300, width: 410 }}
              resizeMode="cover"
            />
            <View>
              <View style={{ padding: 10 }}>
                <Text style={{ fontWeight: "bold" }}>{post?.description}</Text>
                {post.comment != "" ? (
                  <Text>{post.comment} </Text>
                ) : (
                  <Text>{post.status} </Text>
                )}
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <TextInput
                    style={styles.input}
                    placeholder={"write something .."}
                    onChangeText={setComment}
                    multiline={true}
                  />

                  <TouchableOpacity
                    style={{
                      borderColor: "grey",
                      borderWidth: 1,
                      padding: 10,
                      borderRadius: 5,
                    }}
                    onPress={() => {
                      handleUpdate();
                    }}
                  >
                    <Text>send</Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 20,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      borderWidth: 1,
                      borderColor: "red",
                      padding: 5,
                      borderRadius: 5,
                    }}
                    onPress={() => {
                      handleDelete();
                    }}
                  >
                    <Text>Delete</Text>
                  </TouchableOpacity>
                  {post.latitude && (
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("map", { post: post });
                      }}
                    >
                      <Text>View on Map</Text>
                    </TouchableOpacity>
                  )}
                  {!post.latitude && (
                    <Text style={{ color: "grey" }}>Countrywide</Text>
                  )}
                </View>
              </View>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  crimes: {
    margin: 10,
    justifyContent: "center",
  },
  crime: {
    borderWidth: 1,
    borderColor: "#0000002c",
    marginTop: 5,
    overflow: "hidden",
    borderRadius: 5,
    backgroundColor: "white",
  },
  input: {
    padding: 5,

    borderColor: "grey",
    borderWidth: 1,
    backgroundColor: "white",

    borderRadius: 5,
    width: 320,
    marginRight: 5,
  },
});

export default Post;
