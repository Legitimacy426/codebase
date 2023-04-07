import * as React from "react";
import { Button, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Dashboard from "./Dashboard";
import AddPol from "./AddPost";
import Logout from "./Logout";
import Post from "./Post";
import Map from "./Map";

const Drawer = createDrawerNavigator();

export default function AdminDrawer() {
  return (
    <Drawer.Navigator initialRouteName="Dashboard">
      <Drawer.Screen
        name="Reports"
        component={Dashboard}
        options={{
          title: "Reports",
        }}
      />
      <Drawer.Screen
        name="Post"
        component={AddPol}
        options={{
          title: "Add post",
        }}
      />
      <Drawer.Screen
        name="Logout"
        component={Logout}
        options={{
          title: "Logout",
        }}
      />
      <Drawer.Screen
        name="post"
        component={Post}
        options={{
          title: " ",
        }}
      />
      <Drawer.Screen
        name="map"
        component={Map}
        options={{
          title: " ",
        }}
      />
    </Drawer.Navigator>
  );
}
