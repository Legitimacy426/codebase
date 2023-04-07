import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import { Marker } from 'react-native-maps';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function Map() {
    const navigation = useNavigation
  const { post } = useRoute().params
 
  return (
    <View style={styles.container}>
          <MapView style={styles.map}
          
         
          >
   
    <Marker
    
    coordinate={{ latitude : post.latitude , longitude : post.longitude }}
      title={post.location}
      description={post.description}
    />   
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});