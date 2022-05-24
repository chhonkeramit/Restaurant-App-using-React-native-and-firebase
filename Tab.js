// import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import Profile from './screens/Profile';
import Icon from 'react-native-vector-icons/FontAwesome';
import locationMap from './locationMap'
import ViewCart from './screens/ViewCart';
const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
        <Tab.Navigator 
        screenOptions={ ({route}) => ({
            "tabBarActiveTintColor": "orangered",
            "tabBarInactiveTintColor": "gray",
            "tabBarStyle": [
                {
                "display": "flex"
                },
                null
            ],
            "tabBarIcon" : ( {focused, color, size} ) => {
                let iconName;

                if (route.name === "HomeScreen"){
                    iconName = focused ? 'list' : 'bars';
                }else if (route.name === "Profile"){
                    iconName = focused ? 'gear' : 'gears';
                }
                // else if (route.name === "ViewCart"){
                // iconName = focused ? 'cart-plus' : 'cart-plus';
                // }
                else if (route.name === "locationMap"){
                    iconName = focused ? 'rocket' : 'rocket';
                
            }
                return <Icon name={iconName} size={size} color={color} />;
            }
        }) } 
        
        >
            <Tab.Screen options={{ 
                headerStyle: {
                backgroundColor: '#F13507'
                  },
                 headerTintColor: "white"}} 
                 name='HomeScreen' component={HomeScreen} />

           {/* <Tab.Screen component={ViewCart} name="ViewCart" 
            options={{ 
                headerStyle: {
                backgroundColor: 'orangered'
                  },
                 headerTintColor: "white"}} /> */}

            <Tab.Screen component={locationMap} name="locationMap" 
            options={{ 
                headerStyle: {
                backgroundColor: 'green'
                  },
                 headerTintColor: "white"}} />
            <Tab.Screen options={{ 
                headerStyle: {
                backgroundColor: 'gray'
                  },
                 headerTintColor: "white"}} 
            
            name='Profile' component={Profile} />
            
           

        </Tab.Navigator>
    )
}
export default Tabs;