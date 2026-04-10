import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';

const DONORVIEW_PROFILE_LOGIN_URL =
  'https://app.donorview.com/Portal/Account/Login?prm=7yIa__T7RNcHO6jE_PUDfS7f2F6VMIbIAAHTO2xf64nXdc8KQVoY9T2ibQvTG1aNGiCznfZKZKVR3Grp5GsAPaZ-rluIxEdRONUjcCFKouQA-QiUOP1-GzqPnBGCcpwPRg6_x2n95CyXksFjazgiyXKXVIFEBGjFOUlh4Xgcb9fuF24aVZIPiQJfEx4RXFIvQH3LhAEdpi32_xgzl-_mYw2';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{ uri: DONORVIEW_PROFILE_LOGIN_URL }}
        style={styles.webview}
        startInLoadingState
        setSupportMultipleWindows={false}
        originWhitelist={['*']}
        javaScriptEnabled
        domStorageEnabled
        thirdPartyCookiesEnabled
        sharedCookiesEnabled
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  webview: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
