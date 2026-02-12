import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import ListScreen from '../screens/ListScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { useAuth } from '../context/AuthContext';

const Stack = createNativeStackNavigator();

export default function AppStack() {
  const { logout } = useAuth();

  return (
    <Stack.Navigator
      id="AppStack"
      screenOptions={({ navigation }) => ({
        headerShown: true,
        headerBackVisible: true,
        headerRight: () => (
          <TouchableOpacity
            onPress={() => {
              logout();
            }}
            style={{ marginRight: 15, flexDirection: 'row', alignItems: 'center' }}
          >
            <MaterialCommunityIcons name="logout" size={24} color="#ff0000" />
          </TouchableOpacity>
        ),
      })}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: 'Início',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{
          headerTitle: 'Detalhes',
        }}
      />
      <Stack.Screen
        name="List"
        component={ListScreen}
        options={{
          headerTitle: 'Usuários',
        }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerTitle: 'Perfil',
        }}
      />
    </Stack.Navigator>
  );
}
