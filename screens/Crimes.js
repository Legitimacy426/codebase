import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import useFetchPosts from "./hooks/useFectchPosts";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const Crimes = () => {
  const [random, setRandom] = useState(100);
  const navigation = useNavigation();
  const { posts, isPendingP } = useFetchPosts("posts", random);
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
          <Text style={{ fontWeight: "bold" }}>
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
            <Text style={{ color: "grey" }}>
              {" "}
              {Date(item.createdAt).slice(0, 16)}
            </Text>
          </View>
          {/* <Text style={{marginTop:15}}>{item.comment }</Text> */}
        </View>
      </View>
    </View>
  );

  return (
    <View>
      {isPendingP && <ActivityIndicator size="large" color="black" />}
      {!isPendingP && (
        <>
          <View>
            <TouchableOpacity
              style={{
                alignSelf: "center",
                marginTop: 10,
                position: "absolute",
                zIndex: 22,
              }}
              onPress={() => {
                setRandom(Math.random());
              }}
            >
              <FontAwesome name="refresh" color={"black"} size={20} />
            </TouchableOpacity>
          </View>
          <FlatList
            data={posts}
            contentContainerStyle={styles.crimes}
            renderItem={({ item }) => <Item item={item} />}
            keyExtractor={(item) => item.pid}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  crimes: {
    margin: 10,
    justifyContent: "center",
    overflow: "scroll",
  },
  crime: {
    borderWidth: 1,
    borderColor: "#0000002c",
    marginBottom: 5,
    overflow: "hidden",
    borderRadius: 5,
    backgroundColor: "white",
  },
});
export default Crimes;
