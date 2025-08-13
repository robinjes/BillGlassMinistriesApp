import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import Navbar from '../components/Navbar';
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
function ScreenWithNavbar({ children, navItems, activeTab, setActiveTab }: ScreenWithNavbarProps) {
  return (
    <>
      <Navbar navItems={navItems} activeTab={activeTab} onTabChange={setActiveTab} />
      {children}
    </>
  );
}

export default function AppNavigator() {
  const [activeTab, setActiveTab] = React.useState('Home');
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
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home">
          {() => <ScreenWithNavbar navItems={navItems} activeTab={activeTab} setActiveTab={setActiveTab}><HomeScreen /></ScreenWithNavbar>}
        </Stack.Screen>
        <Stack.Screen name="About Bill Glass Behind the Walls">
          {() => <ScreenWithNavbar navItems={navItems} activeTab={activeTab} setActiveTab={setActiveTab}><AboutBillGlassScreen /></ScreenWithNavbar>}
        </Stack.Screen>
        <Stack.Screen name="Assisting the Church">
          {() => <ScreenWithNavbar navItems={navItems} activeTab={activeTab} setActiveTab={setActiveTab}><AssistingTheChurchScreen /></ScreenWithNavbar>}
        </Stack.Screen>
        <Stack.Screen name="Statement of Faith">
          {() => <ScreenWithNavbar navItems={navItems} activeTab={activeTab} setActiveTab={setActiveTab}><StatementOfFaithScreen /></ScreenWithNavbar>}
        </Stack.Screen>
        <Stack.Screen name="Ministry Staff">
          {() => <ScreenWithNavbar navItems={navItems} activeTab={activeTab} setActiveTab={setActiveTab}><MinistryStaffScreen /></ScreenWithNavbar>}
        </Stack.Screen>
        <Stack.Screen name="Position Opportunities">
          {() => <ScreenWithNavbar navItems={navItems} activeTab={activeTab} setActiveTab={setActiveTab}><PositionOpportunitiesScreen /></ScreenWithNavbar>}
        </Stack.Screen>
        <Stack.Screen name="Join a Local Team">
          {() => <ScreenWithNavbar navItems={navItems} activeTab={activeTab} setActiveTab={setActiveTab}><JoinLocalTeamScreen /></ScreenWithNavbar>}
        </Stack.Screen>
        <Stack.Screen name="Platform Guests">
          {() => <ScreenWithNavbar navItems={navItems} activeTab={activeTab} setActiveTab={setActiveTab}><PlatformGuestsScreen /></ScreenWithNavbar>}
        </Stack.Screen>
        <Stack.Screen name="Frequently Asked Questions">
          {() => <ScreenWithNavbar navItems={navItems} activeTab={activeTab} setActiveTab={setActiveTab}><FAQScreen /></ScreenWithNavbar>}
        </Stack.Screen>
        <Stack.Screen name="Churches">
          {() => <ScreenWithNavbar navItems={navItems} activeTab={activeTab} setActiveTab={setActiveTab}><ChurchesScreen /></ScreenWithNavbar>}
        </Stack.Screen>
        <Stack.Screen name="Events">
          {() => <ScreenWithNavbar navItems={navItems} activeTab={activeTab} setActiveTab={setActiveTab}><EventsScreen /></ScreenWithNavbar>}
        </Stack.Screen>
        <Stack.Screen name="Ways to Give">
          {() => <ScreenWithNavbar navItems={navItems} activeTab={activeTab} setActiveTab={setActiveTab}><WaysToGiveScreen /></ScreenWithNavbar>}
        </Stack.Screen>
        <Stack.Screen name="Media">
          {() => <ScreenWithNavbar navItems={navItems} activeTab={activeTab} setActiveTab={setActiveTab}><MediaScreen /></ScreenWithNavbar>}
        </Stack.Screen>
        <Stack.Screen name="Equipping Volunteers">
          {() => <ScreenWithNavbar navItems={navItems} activeTab={activeTab} setActiveTab={setActiveTab}><EquippingVolunteersScreen /></ScreenWithNavbar>}
        </Stack.Screen>
        <Stack.Screen name="Store">
          {() => <ScreenWithNavbar navItems={navItems} activeTab={activeTab} setActiveTab={setActiveTab}><StoreScreen /></ScreenWithNavbar>}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
