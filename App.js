// In App.js in a new project
import 'react-native-gesture-handler';
import * as React from 'react';
import { View, Text,TouchableOpacity } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import Home from './screens/Home'
import Reporting from './screens/Reporting';
import LoginPol from './screens/LoginPol';
import AdminDrawer from './screens/AdminDrawer/AdminDrawer';
import File from './screens/File';
import Crimes from './screens/Crimes';
import AntDesign from "@expo/vector-icons/AntDesign";

const Stack = createNativeStackNavigator();


function App() {
  
  function CrimeHeader() {
    const navigation = useNavigation()
    return (
      <View style={{ flexDirection: "row",justifyItems:"space-between"}}>
      <TouchableOpacity onPress={()=>{navigation.navigate("Home")}}>
          <AntDesign name="arrowleft" size={24} color="black" />
           </TouchableOpacity>
          <Text style={{fontSize:20,marginLeft:100}}>Reported Crimes</Text>  
          <TouchableOpacity style={{fontSize:20,marginLeft:100}} onPress={()=>{navigation.navigate("Reporting")}}>
          <AntDesign name="plussquareo" size={24} color="black" />
           </TouchableOpacity>
  </View>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Crimes" component={Crimes}
          options={{ headerTitle: (props) => <CrimeHeader {...props} /> }}
        />
      
        <Stack.Screen name="Home" component={Home}
           options={{headerShown:false}}
        />
        <Stack.Screen name="Reporting" component={Reporting}
         options={{
          title:"Report a crime"
        }}
        />
        <Stack.Screen name="Login" component={Login}
           options={{
            title:"Login as Admin"
          }}
        />
        <Stack.Screen name="LoginPol" component={LoginPol}
          options={{
            title:"Login as police"
          }}
        /> 
        <Stack.Screen name="Admin" component={AdminDrawer}
          options={{
            headerShown: false,
            headerTitle : "Admin Dashboard"
          
          }}
      />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
