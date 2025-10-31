import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { WebView } from 'react-native-webview';


export default function GreatestNeedSupportScreen() {
    return (
        <View style={styles.container}>
        <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Greatest Need Support</Text>
        </View>
        <WebView
            source={{ uri: 'https://app.donorview.com/Donation/DonationInfo?prm=QEs0AW56GAQ7sA9er6riOXpWGJmuJlglYwY7lYABUeHWDXiMM3S37v-9ccUcNZ-i2d2IcDZY_grbONMSAsVRiMRTurZ6eSMmLJnaBCac2bpRk5nz7uE60A-8202zvTmG11ch_hxzHr3zCk5nDTEgIl-ga-0luH89XsAluBhecxlwWxVTaWnt2awoLM5Qp8cHfrGJ3hYY9SVXHb9V8loFSEz5gFCdA5h6x5fhfnmVXOEjsX8VKAr6SjyFzgyVh1T-0' }}
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
