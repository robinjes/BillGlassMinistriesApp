import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { styles } from '../../styles/styles';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { fetchEventsResponse } from '../../services/eventsService';

const AFRICA_INTEREST_FORM_URL = 'https://form.jotform.com/billglass/africa-interest-form';
const AFRICA_GIVING_URL =
  'https://app.donorview.com/Donation/DonationInfo?prm=QEs0AW56GAQ7sA9er6riOXpWGJmuJlglYwY7lYABUeHWDXiMM3S37v-9ccUcNZ-i2d2IcDZY_grbONMSAsVRiMRTurZ6eSMmLJnaBCac2brmW2XwKebjm6ij5hRSH3wv6MXsn8vEfXGbnJAZGsHHhFiLHmMg1E0VfC_v3jymLZBv5ysUaq_O40-w5jHc5WtJUc-8qK2iUT0TrXGvUZdmeD_Y3QSLXWOqws2z2Bo-40aZdw_zATliqTw-q4P4BVSb0';

/** Matches behindthewalls.com africaevents list (see .size-20 / rgb(27, 54, 93)) */
const LIST_COLOR = '#1b365d';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function AfricaEvangelismEventsScreen() {
  const navigation = useNavigation<Nav>();
  const [africaLines, setAfricaLines] = useState<string[]>([]);
  const [listLoading, setListLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetchEventsResponse();
        if (!cancelled) setAfricaLines(res.africaEvangelismLines ?? []);
      } finally {
        if (!cancelled) setListLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const openInterestForm = () => {
    void Linking.openURL(AFRICA_INTEREST_FORM_URL);
  };

  const goToGivingPage = () => {
    navigation.navigate('Event WebView', {
      url: AFRICA_GIVING_URL,
      title: 'Africa Events Giving Page',
      headerStyle: 'navy',
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={localStyles.scrollContent}>
      <View style={localStyles.page}>
        <View style={[styles.missionSection, localStyles.missionSectionTight]}>
          <View style={styles.eventScreenTitleBlock}>
            <Text style={[styles.missionTitle, styles.eventScreenMissionTitle, localStyles.missionTitleTight, localStyles.boldCenter]}>
              2026 Africa Evangelism Events
            </Text>
            <View style={[styles.yellowBar, localStyles.yellowBarTight]} />
          </View>
        </View>

        <View style={localStyles.block}>
          <Text style={localStyles.darkBlue}>
            Below is the list of Africa Evangelism events for 2026. To serve on an event you must{' '}
            <Text style={localStyles.grayLink} onPress={openInterestForm}>
              complete this form
            </Text>{' '}
            which includes your contact information and a letter from your pastor for review. Submitting the form
            does not guarantee you are approved for the event.
          </Text>
        </View>

        <View style={localStyles.gapSmall} />

        <View style={localStyles.block}>
          <Text style={localStyles.darkBlue}>
            Please note: If approved, you will be responsible for all flight and lodging costs. In country
            transportation is provided.{' '}
            <Text style={localStyles.red}>All events require uploading a color picture of your passport.</Text>
          </Text>
        </View>

        <View style={localStyles.gapSmall} />

        <View style={localStyles.block}>
          <Text style={localStyles.redSmall}>
            Note: In country transportation will be provided from the arrival date through the departure date
            listed below and to and from places related to the event. Should you want transportation outside of the
            event, you will need to make those arrangements on your own.
          </Text>
        </View>

        <View style={localStyles.gapBeforeButton} />

        <TouchableOpacity style={localStyles.supportButton} onPress={goToGivingPage} activeOpacity={0.85}>
          <Text style={localStyles.supportButtonText}>Support the Ministry in Africa</Text>
        </TouchableOpacity>

        <View style={localStyles.gapAfterButton} />
        <View style={localStyles.fullBleedDivider} />

        {listLoading ? (
          <View style={localStyles.listLoading}>
            <ActivityIndicator color={LIST_COLOR} />
          </View>
        ) : (
          <View style={localStyles.listBlock}>
            {africaLines.map((line, i) => (
              <Text
                key={`${i}-${line.slice(0, 24)}`}
                style={[localStyles.listLine, i < africaLines.length - 1 && localStyles.listLineSpacing]}
              >
                {line}
              </Text>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const PAGE_PAD = 20;

const localStyles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
  page: {
    backgroundColor: '#ffffff',
    paddingHorizontal: PAGE_PAD,
    paddingTop: 12,
    paddingBottom: 24,
    alignItems: 'center',
  },
  missionSectionTight: {
    marginBottom: 0,
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  missionTitleTight: {
    marginBottom: 8,
    textAlign: 'center',
    width: '100%',
  },
  yellowBarTight: {
    marginTop: 0,
    marginBottom: 0,
    alignSelf: 'center',
  },
  boldCenter: {
    fontWeight: '700',
  },
  block: {
    marginBottom: 0,
    alignSelf: 'stretch',
  },
  darkBlue: {
    color: '#1e3a5f',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    fontWeight: '700',
  },
  grayLink: {
    color: '#6c757d',
    fontSize: 16,
    lineHeight: 24,
    textDecorationLine: 'underline',
    fontWeight: '700',
  },
  red: {
    color: '#b00020',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '700',
  },
  redSmall: {
    color: '#b00020',
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
    fontWeight: '700',
  },
  gapSmall: {
    height: 18,
  },
  gapBeforeButton: {
    height: 22,
  },
  gapAfterButton: {
    height: 12,
  },
  fullBleedDivider: {
    alignSelf: 'stretch',
    marginHorizontal: -PAGE_PAD,
    height: 1,
    backgroundColor: '#d8d8d8',
    marginBottom: 20,
  },
  listLoading: {
    paddingVertical: 16,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  listBlock: {
    alignSelf: 'stretch',
    paddingBottom: 8,
  },
  listLine: {
    color: LIST_COLOR,
    fontSize: 20,
    lineHeight: 30,
    textAlign: 'center',
    fontWeight: '400',
    fontFamily: 'System',
  },
  listLineSpacing: {
    marginBottom: 6,
  },
  supportButton: {
    backgroundColor: '#6eb5e8',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'center',
    maxWidth: '100%',
  },
  supportButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
});
