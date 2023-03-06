import {
    View,
    Text,
    ImageBackground,
    Button,
    StyleSheet,
    TouchableOpacity,
    TextInput,
  } from "react-native";
  import React,{useState} from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { signInWithEmailAndPassword } from "firebase/auth";

  
  import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebaseConfig";
  const LoginPol = () => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigation = useNavigation();
     
  const handleSubmit = () => {
    if (!email || !password) {
      alert("Fill in all the fields")
      return
    }
    
   
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert("Success")
        // navigate to police dashboard======
        navigation.navigate('Admin')
      })
      .catch((e) => {
      alert(e.message)
    })
  }
    return (
      <View
        style={styles.wrapper}
      
      >
        <View style={styles.container}>
          <View style={styles.headlines}>

      
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={setPassword}
            />
            <TouchableOpacity  onPress={handleSubmit} style={styles.button}>
              <Text style={styles.text}>Continue</Text>
            </TouchableOpacity>
            
          </View>
         
        </View>
      
      </View>
    );
  };
  const styles = StyleSheet.create({
    wrapper: {
      position: "relative",
    },
    backCover: {
      backgroundColor: "#150b5eb9",
      position: "absolute",
  
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      opacity: 0.7,
    },
    container: {
      zIndex: 2,
      padding: 10,
      color: "black",
    },
    header: {
      marginTop: 50,
    },
    headlines: {
      padding: 15,
      marginTop: 100,
      alignSelf: "center",
      borderRadius: 5,
      backgroundColor: "#ffffff0e",
      width:350
     
    },
  
    button: {
      padding: 18,
      borderRadius:5,
      fontWeight: "bold",
      backgroundColor: "black",
      alignItems:"center",
      color: "white",
    },
    text: {
      color: "white",
      fontWeight:"bold"
   },
    bold: {
      fontWeight: "bold",
      color: "black",
      fontSize: 23,
      marginBottom: 20,
    },
    landlord: {
      color: "black",
      marginTop: 30,
    },
    input: {
      padding:12,
      
      borderColor: "black",
      borderWidth: 2,
      backgroundColor: "white",
      marginBottom: 14,
      borderRadius:5
    },
  });
  
  export default LoginPol;
  