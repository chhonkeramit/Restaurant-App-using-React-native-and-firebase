import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import SignupScreen from './screens/SignupScreen';
import HomeScreen  from './screens/HomeScreen';
import SigninScreen  from './screens/SigninScreen';
import ViewCart from './screens/ViewCart';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { fireDB } from './firebase';
import Profile from './screens/Profile';
// import Container from './container';
import Tab from './Tab';
import 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import locationMap from './locationMap'
import ConfirmCart from './screens/ConfirmCart'

const Stack = createNativeStackNavigator();

export default function App() {
 
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen options={{ headerShown: false }} name="Signin" component={SigninScreen} />

        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Tab" component={Tab}  />

        <Stack.Screen name="HomeScreen" component={HomeScreen} 
         options={{ title:'Menu'}}/>
         <Stack.Screen name="ViewCart" component={ViewCart} />
         <Stack.Screen name="Profile" component={Profile} />
         <Stack.Screen name="locationMap" component={locationMap} />
         <Stack.Screen name="ConfirmCart" component={ConfirmCart} />

      </Stack.Navigator>
    </NavigationContainer>

      
    
  );

  
}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
