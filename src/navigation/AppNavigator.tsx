import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import Navbar from '../components/Navbar';
import { useRef, useState } from 'react';
import { NavigationContainerRef } from '@react-navigation/native';
import AboutBillGlassScreen from '../screens/aboutscreen/AboutBillGlassScreen';
import AssistingTheChurchScreen from '../screens/aboutscreen/AssistingTheChurchScreen';
import StatementOfFaithScreen from '../screens/aboutscreen/StatementOfFaithScreen';
import MinistryStaffScreen from '../screens/aboutscreen/MinistryStaffScreen';
import PositionOpportunitiesScreen from '../screens/aboutscreen/PositionOpportunitiesScreen';
import JoinLocalTeamScreen from '../screens/aboutscreen/JoinLocalTeamScreen';
import PlatformGuestsScreen from '../screens/aboutscreen/PlatformGuestsScreen';
import FAQScreen from '../screens/aboutscreen/FAQScreen';
import ChurchesScreen from '../screens/ChurchesScreen';
import EventsScreen from '../screens/EventsScreen';
import WaysToGiveScreen from '../screens/WaysToGiveScreen';
import MediaScreen from '../screens/MediaScreen';
import EquippingVolunteersScreen from '../screens/EquippingVolunteersScreen';
import StoreScreen from '../screens/StoreScreen';


type RootStackParamList = {
  Home: undefined;
  'About Bill Glass Behind the Walls': undefined;
  'Assisting the Church': undefined;
  'Statement of Faith': undefined;
  'Ministry Staff': undefined;
  'Position Opportunities': undefined;
  'Join a Local Team': undefined;
  'Platform Guests': undefined;
  'Frequently Asked Questions': undefined;
  Churches: undefined;
  Events: undefined;
  'Ways to Give': undefined;
  Media: undefined;
  'Equipping Volunteers': undefined;
  Store: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();


// Layout wrapper to show Navbar on every screen
import { ReactNode } from 'react';
interface ScreenWithNavbarProps {
  children: ReactNode;
  navItems: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function AppNavigator() {
  const navItems = [
    'Home',
    'About',
    'Churches',
    'Events',
    'Ways to Give',
    'Media',
    'Equipping Volunteers',
    'Store',
    'Give',
    'Resources',
    'Contact',
  ];
  const navigationRef = useRef<NavigationContainerRef<any>>(null);
  const [currentRoute, setCurrentRoute] = useState('Home');
  return (
    <NavigationContainer
      ref={navigationRef}
      onStateChange={() => {
        const route = navigationRef.current?.getCurrentRoute();
        if (route) setCurrentRoute(route.name);
      }}
    >
      <Navbar navItems={navItems} currentRoute={currentRoute} />
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false, animation: 'none' }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="About Bill Glass Behind the Walls" component={AboutBillGlassScreen} />
        <Stack.Screen name="Assisting the Church" component={AssistingTheChurchScreen} />
        <Stack.Screen name="Statement of Faith" component={StatementOfFaithScreen} />
        <Stack.Screen name="Ministry Staff" component={MinistryStaffScreen} />
        <Stack.Screen name="Position Opportunities" component={PositionOpportunitiesScreen} />
        <Stack.Screen name="Join a Local Team" component={JoinLocalTeamScreen} />
        <Stack.Screen name="Platform Guests" component={PlatformGuestsScreen} />
        <Stack.Screen name="Frequently Asked Questions" component={FAQScreen} />
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
