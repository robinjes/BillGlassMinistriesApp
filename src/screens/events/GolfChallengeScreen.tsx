import React, { useMemo } from 'react';
import { View, Text, ScrollView, Image, Pressable, StyleSheet, useWindowDimensions } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { styles } from '../../styles/styles';
import type { RootStackParamList } from '../../navigation/AppNavigator';

const GOLF_6_IMAGE = require('../../../assets/other/6thannualgolf.png');
const GOLF_MISSOURI_IMAGE = require('../../../assets/other/1stannualgolf.png');

type GolfRouteName = '6th Annual Golf Challenge' | '1st Annual Missouri Golf Challenge';

type GolfRoute = RouteProp<RootStackParamList, GolfRouteName>;
type Nav = NativeStackNavigationProp<RootStackParamList>;

const SIGN_UP_LABEL = 'Click to Sign Up/Sponsor';

type GolfRegistrationRoute =
  | '6th Annual Golf Challenge Registration'
  | '1st Annual Missouri Golf Challenge Registration';

const GOLF_LANDING: Record<
  GolfRouteName,
  { image: typeof GOLF_6_IMAGE; registrationScreen: GolfRegistrationRoute; a11yEventName: string }
> = {
  '6th Annual Golf Challenge': {
    image: GOLF_6_IMAGE,
    registrationScreen: '6th Annual Golf Challenge Registration',
    a11yEventName: '6th Annual Golf Challenge',
  },
  '1st Annual Missouri Golf Challenge': {
    image: GOLF_MISSOURI_IMAGE,
    registrationScreen: '1st Annual Missouri Golf Challenge Registration',
    a11yEventName: '1st Annual Missouri Golf Challenge',
  },
};

export default function GolfChallengeScreen() {
  const { name } = useRoute<GolfRoute>();
  const navigation = useNavigation<Nav>();
  const { height: windowH } = useWindowDimensions();
  const title = name;
  const landing = GOLF_LANDING[name];

  const imageBoxHeight = useMemo(() => {
    const target = Math.round(windowH * 0.62);
    return Math.max(280, Math.min(620, target));
  }, [windowH]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={local.scrollContent}>
      <View style={local.main}>
        <View style={local.titleSection}>
          <View style={styles.eventScreenTitleBlock}>
            <Text style={[styles.missionTitle, styles.eventScreenMissionTitle, local.missionTitleTight]}>
              {title}
            </Text>
            <View style={styles.yellowBar} />
          </View>
        </View>

        <Pressable
          onPress={() => navigation.navigate(landing.registrationScreen)}
          style={({ pressed }) => [local.signUpLink, pressed && local.signUpLinkPressed]}
          accessibilityRole="button"
          accessibilityLabel={`${SIGN_UP_LABEL}, open ${landing.a11yEventName} registration`}
        >
          <Text style={local.signUpHeader}>{SIGN_UP_LABEL}</Text>
          <View style={[local.imageBox, { height: imageBoxHeight }]}>
            <Image
              source={landing.image}
              style={local.imageFill}
              resizeMode="contain"
              accessibilityIgnoresInvertColors
            />
          </View>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const local = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  main: {
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  titleSection: {
    marginBottom: 10,
  },
  missionTitleTight: {
    marginBottom: 10,
  },
  signUpLink: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 4,
    borderRadius: 10,
  },
  signUpLinkPressed: {
    opacity: 0.88,
  },
  signUpHeader: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e3a5f',
    textAlign: 'center',
    marginBottom: 4,
    fontFamily: 'System',
  },
  imageBox: {
    width: '100%',
    maxWidth: 560,
    alignSelf: 'center',
  },
  imageFill: {
    width: '100%',
    height: '100%',
  },
});
