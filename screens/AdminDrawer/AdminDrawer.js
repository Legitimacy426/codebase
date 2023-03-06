
import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Dashboard from './Dashboard'
import AddPol from './AddPol';
import Logout from './Logout';

const Drawer = createDrawerNavigator();

export default function AdminDrawer() {
  return (
    
      <Drawer.Navigator initialRouteName="Dashboard">
      <Drawer.Screen name="Reports" component={Dashboard}
        options={{
          title:"Dashboard"
        }}
      />
      <Drawer.Screen name="AddPol" component={AddPol}
       options={{
        title:"Add Police"
      }}
      />
      <Drawer.Screen name="Logout" component={Logout}
       options={{
        title:"Logout"
      }}
      />
      </Drawer.Navigator>
 
  );
}