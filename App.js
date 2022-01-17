/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Temperature from './screens/Temperature';
import SpO2 from './screens/SpO2';
import HeartBeat from './screens/HeartBeat';


const Tab = createBottomTabNavigator();

const App=()=>{
  return(
    <NavigationContainer>
    <Tab.Navigator screenOptions={
      { tabBarActiveTintColor: "#f0590e",
        tabBarLabelStyle: {
      fontSize: 20,
      marginBottom:10
    }}} >
      <Tab.Screen  name="HeartRate" options={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#f0590e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
       
      }} component={HeartBeat} />
      <Tab.Screen name="Temp" options={{
        title:'Temperature',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#f0590e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }} component={Temperature} />
      <Tab.Screen name="SpO2" options={{
       
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#f0590e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }} component={SpO2} />

    </Tab.Navigator>
  </NavigationContainer>
  )
}


export default App;
