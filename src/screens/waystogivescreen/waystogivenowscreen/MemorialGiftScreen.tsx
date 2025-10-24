import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

export default function MemorialGiftScreen() {
    return (
        <View style={styles.container}>
        <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Memorial Gift</Text>
        </View>
        <WebView
            source={{ uri: 'https://app.donorview.com/Donation/DonationInfo?prm=QEs0AW56GAQ7sA9er6riOXpWGJmuJlglYwY7lYABUeHWDXiMM3S37v-9ccUcNZ-i2d2IcDZY_grbONMSAsVRiMRTurZ6eSMmLJnaBCac2brw-fj_Qbw1S1gKvLbBhU1l_Unn1T3hpEi0RS38tIO4JWQad29Cy57E7SnsJBtKshMz_XF-4cPTNX3S_XQ_KasUzxCzS_ViDcgiVaXCA4yTEwqlzW3m0KJ6na6yH66uB26gYYonifVEWkVu99gk0GKo0' }}
            style={{ flex: 1 }}
        />
        </View>
    );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
  },
  headerContainer: {
    backgroundColor: '#1e3a5f',
    paddingVertical: 20,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  }
});
