import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { styles as themeStyles } from '../../styles/styles';
import type { RootStackParamList } from '../../navigation/AppNavigator';

const PRAYER_BANNER = require('../../../assets/prayer/prayer-requests-banner.png');

const PRAYER_REQUEST_FORM_URL =
  'https://forms.office.com/Pages/ResponsePage.aspx?id=eSRxayZ390C4AXtX6cLElgaZ5PZEVcdJqQczWzdiwwpUNEowUEI4OVRXSzZIMFBXTjcwVjRZM0lQTi4u';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function PrayerRequestsScreen() {
  const navigation = useNavigation<Nav>();
  const { width } = useWindowDimensions();
  const bannerHeight = Math.round(Math.min(width * 0.55, 280));

  const openPrayerForm = () => {
    navigation.navigate('Event WebView', {
      url: PRAYER_REQUEST_FORM_URL,
      title: 'Prayer Requests',
      headerStyle: 'navy',
    });
  };

  return (
    <ScrollView style={themeStyles.container} contentContainerStyle={localStyles.scrollContent}>
      <View style={themeStyles.mainContentContainer}>
        <View style={[themeStyles.missionSection, localStyles.titleSection]}>
          <View style={themeStyles.eventScreenTitleBlock}>
            <Text style={[themeStyles.missionTitle, themeStyles.eventScreenMissionTitle]}>
              Prayer Requests
            </Text>
            <View style={themeStyles.yellowBar} />
          </View>
        </View>

        <Image
          source={PRAYER_BANNER}
          style={[localStyles.banner, { height: bannerHeight }]}
          resizeMode="contain"
          accessibilityLabel="Behind the Walls Prayer Requests — Devote yourselves to prayer, Colossians 4:2"
        />

        <View style={localStyles.bodyBlock}>
          <Text style={localStyles.needPrayerHeading}>Need Prayer?</Text>
          <Text style={localStyles.bodyText}>
            Do you need prayer or want to share a Praise report?
          </Text>
          <Text style={[localStyles.bodyText, localStyles.bodyTextSpaced]}>
            The Bill Glass Behind the Walls staff meets weekly to pray for you!
          </Text>
          <TouchableOpacity onPress={openPrayerForm} activeOpacity={0.7} accessibilityRole="link">
            <Text style={localStyles.formLink}>Click here to submit your praise or request</Text>
          </TouchableOpacity>
        </View>

        <View style={localStyles.footerBar} />
      </View>
    </ScrollView>
  );
}

const NAVY = '#1e3a5f';
const LINK_BLUE = '#6eb5e8';

const localStyles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 32,
  },
  titleSection: {
    marginBottom: 20,
    alignItems: 'center',
  },
  banner: {
    width: '100%',
    alignSelf: 'center',
    marginBottom: 28,
  },
  bodyBlock: {
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  needPrayerHeading: {
    fontSize: 22,
    fontWeight: '700',
    color: NAVY,
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: 'System',
  },
  bodyText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    lineHeight: 24,
    fontFamily: 'System',
  },
  bodyTextSpaced: {
    marginTop: 4,
    marginBottom: 20,
  },
  formLink: {
    fontSize: 16,
    fontWeight: '700',
    color: LINK_BLUE,
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontFamily: 'System',
  },
  footerBar: {
    marginTop: 32,
    height: 6,
    backgroundColor: NAVY,
    borderRadius: 2,
    alignSelf: 'stretch',
  },
});
