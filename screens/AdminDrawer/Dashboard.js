import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import useFetchAdminPosts from "../hooks/useFetchAdminPosts";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const Dashboard = () => {
  const navigation = useNavigation();
  const [comment, setComment] = useState("");
  const [random, setRandom] = useState(100);
  console.log(random);
  const Item = ({ item }) => (
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
          <Text style={{ fontSize: 15 }}>{item.location}</Text>
        </View>
      </View>
      <Image
        source={{ uri: item.image }}
        style={{ height: 300, width: 410 }}
        resizeMode="cover"
      />
      <View>
        <View style={{ padding: 10 }}>
          <Text>
            {item.category} - {item.description}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            {item.comment != "" ? (
              <Text>{item.comment} </Text>
            ) : (
              <Text>{item.status} </Text>
            )}

            <TouchableOpacity
              onPress={() => {
                navigation.navigate("post", { id: item.id });
              }}
            >
              <Text>View</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
  const date = 1;
  const { posts } = useFetchAdminPosts("posts", random);
  console.log(posts);
  return (
    <View style={styles.crimes}>
      <View>
        <TouchableOpacity
          style={{ alignSelf: "center" }}
          onPress={() => {
            setRandom(Math.random());
          }}
        >
          <FontAwesome name="refresh" color={"black"} size={20} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={posts}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
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
    padding: 12,
    marginTop: 5,
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "white",
    marginBottom: 14,
    borderRadius: 5,
  },
});
export default Dashboard;
