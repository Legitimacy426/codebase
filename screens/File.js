import { View, Text,StyleSheet,Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { firebase } from '../firebaseConfig'
import { getStorage, ref, getDownloadURL,uploadBytes } from "firebase/storage";
const storage = getStorage()

const File = () => {
    const [image, setImage] = useState(null)
    const [uploading, setUploading] = useState(false)
    const [filenames,setFileName] = useState('')
    
    const pick = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality:1
        })
        const source = { uri: result.uri }
     
        setImage(source)
        
    }
    const upload = async () => {
        setUploading(true)
        const response = await fetch(image.uri)
        const blob = await response.blob()
        const filename = image.uri.substring(image.uri.lastIndexOf('/') + 1)
       
            const storageRef = ref(storage, filename);
            uploadBytes(storageRef, blob).then( (snapshot) => {
            console.log('uploaded');
                getDownloadURL(snapshot.ref).then(url => {
                   const imageUrl = url
                    // add Doc
            });
            }).catch(err => {
                console.log(err)
            })
       
        setUploading(false)
        alert("uploaded")
        setFileName(filenames)
        setImage(null)

       
    }
  

   
  return (
    <View style={styles.container}>
 <TouchableOpacity onPress={pick} >
       <Text>pick image</Text>       
          </TouchableOpacity>
          <View>
              {image && <Image source={{ uri: image.uri }} style={{ width: 300, height: 300 }} />}
              <TouchableOpacity onPress={upload}>
                  <Text>Upload</Text>
              </TouchableOpacity>
          </View>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
        marginTop:100,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding:100
    }
})
export default File