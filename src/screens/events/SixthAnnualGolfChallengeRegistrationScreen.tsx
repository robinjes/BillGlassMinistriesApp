import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

/** DonorView: 6th Annual Bill Glass Behind the Walls Golf Challenge — tickets & sponsorship */
const DONORVIEW_GOLF_REGISTRATION_URL =
  'https://app.donorview.com/Event/EventInfo?prm=QEs0AW56GAQ7sA9er6riOXpWGJmuJlglYwY7lYABUeHWDXiMM3S37v-9ccUcNZ-i2d2IcDZY_grbONMSAsVRiMRTurZ6eSMmLJnaBCac2brx7qLCwpzkGmOoi1sKMQzhWI5dnJwjM4XcVbLWuJM19VuUIZQQTTow1l0VRhbhZM3ydWkWIuHpeQF2R7mkK0VNLHim-Ay4sAb3nmUlgmIKDI6d3vOaC6v3XvHSVpFG4OuzyqdwX-vhnvZQ3mALrOjE0';

/** Matches `FirstTeamScreen` header band (navy bar + white type). */
export default function SixthAnnualGolfChallengeRegistrationScreen() {
  return (
    <View style={styles.screen}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>6th Annual Golf Challenge</Text>
        <Text style={styles.headerSubtitle}>Registration</Text>
      </View>
      <WebView
        source={{ uri: DONORVIEW_GOLF_REGISTRATION_URL }}
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
