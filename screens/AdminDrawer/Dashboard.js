import { View, Text, Image, StyleSheet ,FlatList} from 'react-native'
import React from 'react'
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import useFetchPosts from '../hooks/useFectchPosts';
const Dashboard = () => {
  const Item = ({ item }) => (
    <View style={styles.crime}>
    <View style={{}}>
      <View style={{flexDirection:"row",justifyContent:"space-between",padding:10}}>
       <View style={{borderWidth:1,padding:4,borderRadius:30}}><Entypo name='location-pin' color={"black"} size={19} /></View>
          <Text style={{ fontSize: 15 }}>{ item.location}</Text>
        </View>
    </View>
    <Image source={{uri : item.image}} style={{ height:300,width:410 }}
    resizeMode="cover"
    />
    <View>
      <View style={{padding:10}}>
          <Text>{ item.description}</Text>
        <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:10}}>
            <Text>{ item.status}</Text>
            <Text style={{}}>Posted on {Date(item.createdAt).slice(0,16) }</Text>
        </View>
        
      </View>
    </View>

</View>
  )
  const { posts } = useFetchPosts('posts')
  console.log(posts)
  return (
    <View style={styles.crimes}>
    
    <FlatList data={posts}
            renderItem={({ item }) => <Item item={item} />}
                keyExtractor={item => item.pid} />
    </View>
  )

}

  const styles = StyleSheet.create({
    crimes: {
      margin: 10,
      justifyContent:"center"
    },
    crime: {
      borderWidth: 1,
      borderColor:"#0000002c",
      marginTop:5,
      overflow:"hidden",
      borderRadius:5,
      backgroundColor:"white"
    }
  })
export default Dashboard