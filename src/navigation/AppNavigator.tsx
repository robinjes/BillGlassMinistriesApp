import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import AboutScreen from '../screens/AboutScreen';
import ChurchesScreen from '../screens/ChurchesScreen';
import EventsScreen from '../screens/EventsScreen';
import WaysToGiveScreen from '../screens/WaysToGiveScreen';
import MediaScreen from '../screens/MediaScreen';
import EquippingVolunteersScreen from '../screens/EquippingVolunteersScreen';
import StoreScreen from '../screens/StoreScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="Churches" component={ChurchesScreen} />
        <Stack.Screen name="Events" component={EventsScreen} />
        <Stack.Screen name="Ways to Give" component={WaysToGiveScreen} />
        <Stack.Screen name="Media" component={MediaScreen} />
        <Stack.Screen name="Equipping Volunteers" component={EquippingVolunteersScreen} />
        <Stack.Screen name="Store" component={StoreScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
