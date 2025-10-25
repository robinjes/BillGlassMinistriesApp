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
import SocialMediaScreen from '../screens/media/SocialMediaScreen';
import PodcastScreen from '../screens/media/PodcastScreen';
import WhoIsBillGlassCardsScreen from '../screens/media/WhoIsBillGlassCardsScreen';
import PromoVideoScreen from '../screens/media/PromoVideoScreen';
import EquippingVolunteersScreen from '../screens/EquippingVolunteersScreen';
import StoreScreen from '../screens/StoreScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EvangelismEventsScreen from '../screens/eventsscreen/EvangelismEventsScreen';
import AfricaEvangelismEventsScreen from '../screens/eventsscreen/AfricaEvangelismEventsScreen';
import HowToRegisterScreen from '../screens/eventsscreen/HowToRegisterScreen';
import WhatToExpectScreen from '../screens/eventsscreen/WhatToExpectScreen';
import WhoCanServeScreen from '../screens/eventsscreen/WhoCanServeScreen';


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
  'Evangelism Events': undefined;
  'Africa Evangelism Events': undefined;
  'How to Register for an Event': undefined;
  'What to Expect at Our Events': undefined;
  'Who Can Serve on a Bill Glass Behind the Walls Event?': undefined;
  'Ways to Give': undefined;
  'Ways to Give Now': undefined;
  'Ways to Give Later': undefined;
  'First Team': undefined;
  '$75 to Life': undefined;
  'Financial Integrity': undefined;
  'ECFA Accredited': undefined;
  '4 Star Charity Navigator': undefined;
  'Financial Documents': undefined;
  'Donor Privacy Policy': undefined;
  'Donor Privacy': undefined;
  'Social Media': undefined;
  'Podcast': undefined;
  'Who is Bill Glass? Cards': undefined;
  'Promo Video': undefined;
  'Equipping Volunteers': undefined;
  Store: undefined;
  Profile: undefined;
  'Open Positions Form': undefined;
  PlatformGuestForm: undefined;
  JoinLocalTeamForm: undefined;
  'Greatest Need Support': undefined;
  'Support a Specific Event': undefined;
  'Other Ways to Give': undefined;
  'Memorial Gift': undefined;
  'Ways to Give Contact Form': undefined;
};
export type { RootStackParamList };
import OpenPositionsFormScreen from '../screens/aboutscreen/OpenPositionsFormScreen';
import PlatformGuestFormScreen from '../screens/aboutscreen/PlatformGuestFormScreen';
import JoinLocalTeamFormScreen from '../screens/aboutscreen/JoinLocalTeamFormScreen';
import WaysToGiveLaterScreen from '../screens/waystogivescreen/WaysToGiveLaterScreen';
import FirstTeamScreen from '../screens/waystogivescreen/waystogivenowscreen/FirstTeamScreen';
import SeventyFiveToLifeScreen from '../screens/waystogivescreen/SeventyFiveToLifeScreen';
import FinancialIntegrityScreen from '../screens/waystogivescreen/financialintegrity/FinancialIntegrityScreen';
import ECFAAccreditedScreen from '../screens/waystogivescreen/financialintegrity/ECFAAccreditedScreen';
import FourStarCharityNavigatorScreen from '../screens/waystogivescreen/financialintegrity/FourStarCharityNavigatorScreen';
import FinancialDocumentsScreen from '../screens/waystogivescreen/financialintegrity/FinancialDocumentsScreen';
import DonorPrivacyPolicyScreen from '../screens/waystogivescreen/financialintegrity/DonorPrivacyPolicyScreen';
import DonorPrivacyScreen from '../screens/waystogivescreen/DonorPrivacyScreen';
import GreatestNeedSupportScreen from '../screens/waystogivescreen/waystogivenowscreen/GreatestNeedSupportScreen';
import SupportSpecificEventScreen from '../screens/waystogivescreen/waystogivenowscreen/SupportSpecificEventScreen';
import OtherWaysToGiveScreen from '../screens/waystogivescreen/waystogivenowscreen/OtherWaysToGiveScreen';
import MemorialGiftScreen from '../screens/waystogivescreen/waystogivenowscreen/MemorialGiftScreen';
import WaysToGiveContactFormScreen from '../screens/waystogivescreen/WaysToGiveContactFormScreen';

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
    'About',
    'Churches',
    'Events',
    'Ways to Give',
    'Media',
    'Equipping Volunteers',
    'Store',
    'Profile',
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
        <Stack.Screen name="Open Positions Form" component={OpenPositionsFormScreen} />
        <Stack.Screen name="Join a Local Team" component={JoinLocalTeamScreen} />
        <Stack.Screen name="Platform Guests" component={PlatformGuestsScreen} />
        <Stack.Screen name="Frequently Asked Questions" component={FAQScreen} />
        <Stack.Screen name="Churches" component={ChurchesScreen} />
        <Stack.Screen name="Events" component={EventsScreen} />
        <Stack.Screen name="Evangelism Events" component={EvangelismEventsScreen} />
        <Stack.Screen name="Africa Evangelism Events" component={AfricaEvangelismEventsScreen} />
        <Stack.Screen name="How to Register for an Event" component={HowToRegisterScreen} />
        <Stack.Screen name="What to Expect at Our Events" component={WhatToExpectScreen} />
        <Stack.Screen name="Who Can Serve on a Bill Glass Behind the Walls Event?" component={WhoCanServeScreen} />
        <Stack.Screen name="Ways to Give" component={WaysToGiveScreen} />
        <Stack.Screen name="Ways to Give Now" component={WaysToGiveScreen} />
        <Stack.Screen name="Ways to Give Later" component={WaysToGiveLaterScreen} />
        <Stack.Screen name="First Team" component={FirstTeamScreen} />
        <Stack.Screen name="$75 to Life" component={SeventyFiveToLifeScreen} />
        <Stack.Screen name="Financial Integrity" component={FinancialIntegrityScreen} />
        <Stack.Screen name="ECFA Accredited" component={ECFAAccreditedScreen} />
        <Stack.Screen name="4 Star Charity Navigator" component={FourStarCharityNavigatorScreen} />
        <Stack.Screen name="Financial Documents" component={FinancialDocumentsScreen} />
        <Stack.Screen name="Donor Privacy Policy" component={DonorPrivacyPolicyScreen} />
        <Stack.Screen name="Donor Privacy" component={DonorPrivacyScreen} />
        <Stack.Screen name="Greatest Need Support" component={GreatestNeedSupportScreen} />
        <Stack.Screen name="Support a Specific Event" component={SupportSpecificEventScreen} />
        <Stack.Screen name="Other Ways to Give" component={OtherWaysToGiveScreen} />
        <Stack.Screen name="Memorial Gift" component={MemorialGiftScreen} />
        <Stack.Screen name="Ways to Give Contact Form" component={WaysToGiveContactFormScreen} />
        <Stack.Screen name="Social Media" component={SocialMediaScreen} />
        <Stack.Screen name="Podcast" component={PodcastScreen} />
        <Stack.Screen name="Who is Bill Glass? Cards" component={WhoIsBillGlassCardsScreen} />
        <Stack.Screen name="Promo Video" component={PromoVideoScreen} />
        <Stack.Screen name="Equipping Volunteers" component={EquippingVolunteersScreen} />
        <Stack.Screen name="Store" component={StoreScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
  <Stack.Screen name="PlatformGuestForm" component={PlatformGuestFormScreen} />
  <Stack.Screen name="JoinLocalTeamForm" component={JoinLocalTeamFormScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
