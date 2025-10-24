import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { WebView } from 'react-native-webview';

export default function SeventyFiveToLifeScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.imageContainer}>
        <Image 
          source={require('../../../assets/75tolife.jpg')} 
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      
      <View style={styles.contentContainer}>
        <Text style={styles.subheaderText}>On average, seeing one decision for Christ will cost Bill Glass Behind the Walls about $75. The ministry calls this $75 TO LIFE. That $75 investment represents even more than one soul saved, it also represents:</Text>
        
        <Text style={styles.bulletText}>• One person evangelistically trained and sent to share the gospel Behind the Walls</Text>
        <Text style={styles.bulletText}>• Many inmates hear the gospel, even if they don't accept Christ that day</Text>
        <Text style={styles.bulletText}>• Many fallen-away believers repent of their sins and come back to the Lord</Text>
        <Text style={styles.bulletText}>• Incarcerated believers trained to share with other inmates and their families and friends</Text>
        <Text style={styles.bulletText}>• Newly trained evangelists coming back to their communities ready to share the gospel with others</Text>
      </View>
      
      <View style={styles.webviewContainer}>
        <WebView
          source={{ uri: 'https://app.donorview.com/Donation/DonationInfo?prm=QEs0AW56GAQ7sA9er6riOXpWGJmuJlglYwY7lYABUeHWDXiMM3S37v-9ccUcNZ-i2d2IcDZY_grbONMSAsVRiMRTurZ6eSMmLJnaBCac2bpRk5nz7uE60A-8202zvTmG11ch_hxzHr3zCk5nDTEgIl-ga-0luH89XsAluBhecxlwWxVTaWnt2awoLM5Qp8cHfrGJ3hYY9SVXHb9V8loFSEz5gFCdA5h6x5fhfnmVXOEjsX8VKAr6SjyFzgyVh1T-0' }}
          style={styles.webview}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
  },
  imageContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: '90%',
    height: 200,
    borderRadius: 8,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#fff',
  },
  subheaderText: {
    fontSize: 18,
    color: '#1e3a5f',
    fontWeight: 'bold',
    lineHeight: 26,
    marginBottom: 20,
    textAlign: 'left',
  },
  bulletText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 12,
    textAlign: 'left',
    paddingLeft: 10,
    lineHeight: 22,
  },
  webviewContainer: {
    marginTop: 20,
    height: 600,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  webview: {
    flex: 1,
  }
});
