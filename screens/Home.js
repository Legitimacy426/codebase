import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={{ alignSelf: "center", marginTop: 40 }}>
          <Text style={{ fontSize: 30 }}>Report ANONYMOUSLY</Text>
        </View>
        <Image
          source={require("../assets/notification.png")}
          style={{
            marginTop: 60,
            height: 300,
            width: 400,
            alignSelf: "center",
          }}
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Crimes");
          }}
          style={styles.button}
        >
          <Text style={{ color: "black", alignSelf: "center" }}>
            View Reports
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.login]}
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text style={{ color: "white" }}>Continue as Police</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    padding: 24,
  },
  headline: {
    marginTop: 200,
    fontSize: 52,
    fontWeight: "bold",
    alignSelf: "center",
    color: "black",
  },
  button: {
    alignSelf: "center",

    marginTop: 50,
    padding: 20,
    borderRadius: 50,
    width: 300,
    backgroundColor: "transparent",
    color: "black",
    borderWidth: 3,
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
export default Home;
