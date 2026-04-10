import React, { useRef, useState } from 'react';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Navbar from '../components/Navbar';
import HomeScreen from '../screens/app/HomeScreen';
import ChurchesScreen from '../screens/app/ChurchesScreen';
import EventsScreen from '../screens/app/EventsScreen';
import WaysToGiveScreen from '../screens/app/WaysToGiveScreen';
import EquippingVolunteersScreen from '../screens/app/EquippingVolunteersScreen';
import StoreScreen from '../screens/app/StoreScreen';
import ProfileScreen from '../screens/app/ProfileScreen';
import AboutBillGlassScreen from '../screens/about/AboutBillGlassScreen';
import AssistingTheChurchScreen from '../screens/about/AssistingTheChurchScreen';
import StatementOfFaithScreen from '../screens/about/StatementOfFaithScreen';
import MinistryStaffScreen from '../screens/about/MinistryStaffScreen';
import PositionOpportunitiesScreen from '../screens/about/PositionOpportunitiesScreen';
import JoinLocalTeamScreen from '../screens/about/JoinLocalTeamScreen';
import PlatformGuestsScreen from '../screens/about/PlatformGuestsScreen';
import FAQScreen from '../screens/about/FAQScreen';
import OpenPositionsFormScreen from '../screens/about/OpenPositionsFormScreen';
import PlatformGuestFormScreen from '../screens/about/PlatformGuestFormScreen';
import JoinLocalTeamFormScreen from '../screens/about/JoinLocalTeamFormScreen';
import WaysToGiveLaterScreen from '../screens/giving/WaysToGiveLaterScreen';
import FirstTeamScreen from '../screens/giving/now/FirstTeamScreen';
import SeventyFiveToLifeScreen from '../screens/giving/SeventyFiveToLifeScreen';
import FinancialIntegrityScreen from '../screens/giving/financial-integrity/FinancialIntegrityScreen';
import ECFAAccreditedScreen from '../screens/giving/financial-integrity/ECFAAccreditedScreen';
import FourStarCharityNavigatorScreen from '../screens/giving/financial-integrity/FourStarCharityNavigatorScreen';
import FinancialDocumentsScreen from '../screens/giving/financial-integrity/FinancialDocumentsScreen';
import DonorPrivacyPolicyScreen from '../screens/giving/financial-integrity/DonorPrivacyPolicyScreen';
import DonorPrivacyScreen from '../screens/giving/DonorPrivacyScreen';
import GreatestNeedSupportScreen from '../screens/giving/now/GreatestNeedSupportScreen';
import SupportSpecificEventScreen from '../screens/giving/now/SupportSpecificEventScreen';
import OtherWaysToGiveScreen from '../screens/giving/now/OtherWaysToGiveScreen';
import MemorialGiftScreen from '../screens/giving/now/MemorialGiftScreen';
import WaysToGiveContactFormScreen from '../screens/giving/WaysToGiveContactFormScreen';
import SocialMediaScreen from '../screens/media/SocialMediaScreen';
import PodcastScreen from '../screens/media/PodcastScreen';
import WhoIsBillGlassCardsScreen from '../screens/media/WhoIsBillGlassCardsScreen';
import PromoVideoScreen from '../screens/media/PromoVideoScreen';
import EvangelismEventsScreen from '../screens/events/EvangelismEventsScreen';
import AfricaEvangelismEventsScreen from '../screens/events/AfricaEvangelismEventsScreen';
import HowToRegisterScreen from '../screens/events/HowToRegisterScreen';
import CreatingPortalAccountScreen from '../screens/events/CreatingPortalAccountScreen';
import WhatToExpectScreen from '../screens/events/WhatToExpectScreen';
import ActionStepsScreen from '../screens/events/ActionStepsScreen';
import WhoCanServeScreen from '../screens/events/WhoCanServeScreen';
import EventRegistrationScreen from '../screens/events/EventRegistrationScreen';
import EvangelismEventDetailScreen from '../screens/events/EvangelismEventDetailScreen';
import EventWebViewScreen from '../screens/events/EventWebViewScreen';
import GolfChallengeScreen from '../screens/events/GolfChallengeScreen';
import SixthAnnualGolfChallengeRegistrationScreen from '../screens/events/SixthAnnualGolfChallengeRegistrationScreen';
import FirstAnnualMissouriGolfChallengeRegistrationScreen from '../screens/events/FirstAnnualMissouriGolfChallengeRegistrationScreen';

export type RootStackParamList = {
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
  '2026 Africa Evangelism Events': undefined;
  'Registering for Events': undefined;
  'Creating a Portal Account': undefined;
  'What to Expect at Our Events': undefined;
  'Action Steps': undefined;
  'Who Can Serve on a Bill Glass Behind the Walls Event?': undefined;
  '6th Annual Golf Challenge': undefined;
  '6th Annual Golf Challenge Registration': undefined;
  '1st Annual Missouri Golf Challenge': undefined;
  '1st Annual Missouri Golf Challenge Registration': undefined;
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
  Podcast: undefined;
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
  'Event Registration': { eventId: string };
  'Evangelism Event Detail': { eventId: string };
  'Event WebView': { url: string; title?: string; headerStyle?: 'default' | 'navy' };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

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
  const navigationRef = useRef<NavigationContainerRef<RootStackParamList>>(null);
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
        <Stack.Screen name="2026 Africa Evangelism Events" component={AfricaEvangelismEventsScreen} />
        <Stack.Screen name="Registering for Events" component={HowToRegisterScreen} />
        <Stack.Screen name="Creating a Portal Account" component={CreatingPortalAccountScreen} />
        <Stack.Screen name="What to Expect at Our Events" component={WhatToExpectScreen} />
        <Stack.Screen name="Action Steps" component={ActionStepsScreen} />
        <Stack.Screen name="Who Can Serve on a Bill Glass Behind the Walls Event?" component={WhoCanServeScreen} />
        <Stack.Screen name="6th Annual Golf Challenge" component={GolfChallengeScreen} />
        <Stack.Screen
          name="6th Annual Golf Challenge Registration"
          component={SixthAnnualGolfChallengeRegistrationScreen}
        />
        <Stack.Screen name="1st Annual Missouri Golf Challenge" component={GolfChallengeScreen} />
        <Stack.Screen
          name="1st Annual Missouri Golf Challenge Registration"
          component={FirstAnnualMissouriGolfChallengeRegistrationScreen}
        />
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
        <Stack.Screen name="Event Registration" component={EventRegistrationScreen} />
        <Stack.Screen name="Evangelism Event Detail" component={EvangelismEventDetailScreen} />
        <Stack.Screen name="Event WebView" component={EventWebViewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
