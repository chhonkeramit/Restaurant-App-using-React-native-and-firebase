import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { Alert,KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { auth,fireDB } from '../firebase'
import { UserDetails, UserDetailsCollectionRef } from '../models/userDetails';


const SignupScreen = () => {

  const [userDetails, setUserDetails] = useState([]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setname] = useState('');
  const [contact, setcontact] = useState('');
  const [location, setlocation] = useState('');

  const navigation = useNavigation();

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged(user => {
  //     if (user) {
  //       navigation.replace("Home")
  //     }
  //   })
  //    return unsubscribe;
  // }, []);

  useEffect(() => {
    //const ref = fireDB.collection('userDetails');
    UserDetailsCollectionRef.onSnapshot((query) => {
      const objs = [];
      //console.log("after snapshot query ==", {query});
      query.forEach((doc) => {
        //console.log("inside for each loop value =", {doc})
        objs.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      //console.log({objs})
      setUserDetails(objs);
    })
  }, []);

  const handleSignOut = () => {
    auth.signOut()
      .then(() => {
        console.log("signed out from here");
        navigation.replace("Signin");
      })
      .catch(error => alert(error.message));
  }
  const handleSignUp = async () => {
    if(password.length >= 8 && password.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$/))
    {
    auth.createUserWithEmailAndPassword(email,password)
    .then(userCredentials => {
      const user = userCredentials.user;
      alert("Registered Successfully");
      console.log("Registered user with email:", user.email);
      const currentUserId = auth.currentUser.uid;
      const dataObj = {uid: currentUserId, name:name,contact:contact,location:location,completed:false,email:email};
      const detailInstance = new UserDetails(dataObj);
      console.log(detailInstance);
      detailInstance.addUserDetails();
    })
    .catch(error => alert(error.message));
  }
  else
{
  alert("Password should have a minimum 8 characters in length and 1 upper case and 1 lowercase letter and one numeric character");
}
// await detailInstance.addUserDetails();
navigation.replace("Home")
}

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
      
      <View style={styles.inputContainer}>
      <TextInput
          placeholder="Enter Name"
          value={name}
          onChangeText={text => setname(text)}
          style={styles.input}
        />
         <TextInput
          placeholder="Enter Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
       
        <TextInput
          placeholder="Enter Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />

         <TextInput
          placeholder="Enter Contact Number"
          value={contact}
          onChangeText={text => setcontact(text)}
          style={styles.input}
        />

        <TextInput
          placeholder="Address"
          value={location}
          onChangeText={text => setlocation(text)}
          style={styles.input}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Sign Up</Text>
        </TouchableOpacity>
        <Text></Text>
        <TouchableOpacity
          onPress={
            handleSignOut
          }
        style={styles.button}
      >
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default SignupScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
})
