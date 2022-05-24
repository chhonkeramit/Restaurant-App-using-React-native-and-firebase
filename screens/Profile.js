import { NavigationContainer } from "@react-navigation/native";
import { useState,useEffect} from "react";
import { View,Text,Image,StyleSheet, Pressable,ActivityIndicator,Button} from "react-native";
import { TextInput } from "react-native-gesture-handler";
// import DummyUIManager from "react-native/Libraries/ReactNative/DummyUIManager";
import { auth, fireDB } from '../firebase'
import SigninScreen from "./SigninScreen";
// import { useNavigation } from '@react-navigation/core'

export default function Profile( { navigation }) {

    const [email, setEmail] = useState('');

const remove = () => {
    const user = auth.currentUser;

user.delete().then(() => {
    alert("User Deleted.Now you can't access the account with the same user email!")
   navigation.navigate('SigninScreen');// User deleted.

}).catch((error) => {
// An error ocurred
console.log(error)
// ...
});
}

const updateUser = () => {
    const user = auth.currentUser;

user.updateEmail(email).then(() => {
  alert("User Updated!")
  // updateUser();
  navigation.replace("Profile")
}).catch((error) => {
  // An error occurred
  // ...
});




}

    return(
        <View style={styles.container}>
                  <Button color='gray' title="Go back" onPress={() => navigation.navigate("Tab")} />

            <Button title="Log Out" onPress={() => {navigation.replace("Signin")}}></Button>
            <Image style = {styles.imagestyle} source={{ uri: 'https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659652_1280.png' }}></Image>
        <Text style={{fontWeight:'bold'}}>User Name :{auth.currentUser?.email}</Text>
        <Button
        color='orangered'
        title="Delete User"
        onPress={remove}
        >
             </Button> 
        
        <TextInput
          placeholder="Update Your Email"
        //   value={email}
          onChangeText={text => setEmail(text)}
          style={{color:'black',fontWeight:'bold',textAlign:'center'}}
        />

       
             <Button
        color='orangered'
        title="Update User"
        onPress={updateUser}
        ></Button>
      
        </View>
    )

}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    imagestyle:{
        width: 100,
         padding: 10,
         borderRadius : 50,
         height: 150,
         alignItems:'center',
         justifyContent:'center'

    },
  });
  