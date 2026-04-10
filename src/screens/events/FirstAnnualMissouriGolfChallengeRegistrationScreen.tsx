import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

/** DonorView: 1st Annual Bill Glass Behind the Walls Missouri Golf Challenge — tickets & sponsorship */
const DONORVIEW_MISSOURI_GOLF_REGISTRATION_URL =
  'https://app.donorview.com/Event/EventInfo?prm=QEs0AW56GAQ7sA9er6riOXpWGJmuJlglYwY7lYABUeHWDXiMM3S37v-9ccUcNZ-i2d2IcDZY_grbONMSAsVRiMRTurZ6eSMmLJnaBCac2boNyihL1GMyyQUk6Z57zKtGGmqClyeFXo1-R1ERiNyGbfmbGQ8kHu53YMpNA1eNIoYHlALC4GU7V67OcuYW1HVX2aP_0Bor-BD50k9fiXZcflAq7_Om8QETeTb9egdM7F27JmZp7CXSGt36AebNIlmd0';

/** Matches `FirstTeamScreen` / 6th golf registration header band. */
export default function FirstAnnualMissouriGolfChallengeRegistrationScreen() {
  return (
    <View style={styles.screen}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>1st Annual Missouri Golf Challenge</Text>
        <Text style={styles.headerSubtitle}>Registration</Text>
      </View>
      <WebView
        source={{ uri: DONORVIEW_MISSOURI_GOLF_REGISTRATION_URL }}
        style={styles.webview}
        startInLoadingState
        setSupportMultipleWindows={false}
        originWhitelist={['*']}
        nestedScrollEnabled
        javaScriptEnabled
        domStorageEnabled
      />
    </View>
  );
}

const NAVY = '#1e3a5f';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    backgroundColor: NAVY,
    paddingVertical: 20,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    minHeight: 80,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  headerSubtitle: {
    marginTop: 6,
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    opacity: 0.95,
  },
  webview: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
