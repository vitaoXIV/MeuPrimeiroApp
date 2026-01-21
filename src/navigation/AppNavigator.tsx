import React from 'react';
import {createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';


export type RootStackParamList = {
    Home: undefined;
    Details: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
    return (
        <Stack.Navigator initial RouteName= "Home">
        <Stack.Screen
          name= "Home"
          component={HomeScreen}
          options={{ title: 'Início'}}
          />
         <Stack.Screen
          name= "Details"
          component={DetailsScreen}
          options={{ title: 'Detalhes'}}
            />
        </Stack.Navigator>
    );
}