import { View, Text } from 'react-native'
import React,{useEffect} from 'react'
import { useNavigation } from '@react-navigation/native'
import { auth } from '../../firebaseConfig'
import { signOut } from 'firebase/auth'


const Logout = () => {
  const navigation = useNavigation()
  const handleSignOut = () => {
    signOut(auth).then(() => {
       
       navigation.navigate('Home')
      }).catch((e) => {
        alert(e.message)
      })
  
    }
  useEffect(() => {
      handleSignOut()
  },[])
  
  return (
    <View style={{flex:1}}>
      <Text>Logging out ...</Text>
    </View>
  )
}

export default Logout