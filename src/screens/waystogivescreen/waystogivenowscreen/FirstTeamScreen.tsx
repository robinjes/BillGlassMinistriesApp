import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Linking } from 'react-native';
import { WebView } from 'react-native-webview';

export default function FirstTeamScreen() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdown2Open, setIsDropdown2Open] = useState(false);
  const [isDropdown3Open, setIsDropdown3Open] = useState(false);

  const handleEmailPress = () => {
    Linking.openURL('mailto:RondaT@behindthewalls.com');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>First Team</Text>
      </View>
      
      <View style={styles.contentContainer}>
        <View style={styles.contentRow}>
          <View style={styles.imageContainer}>
            <Image 
              source={require('../../../../assets/firstteam.jpg')} 
              style={styles.image}
              resizeMode="contain"
            />
          </View>
          
          <View style={styles.textContainer}>
            <TouchableOpacity 
              style={styles.dropdownHeader}
              onPress={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <Text style={styles.subheaderText}>What does it mean to be a First Team Member?</Text>
              <Text style={styles.dropdownChevron}>{isDropdownOpen ? '▲' : '▼'}</Text>
            </TouchableOpacity>
            
            {isDropdownOpen && (
              <View style={styles.dropdownContent}>
                <Text style={styles.bodyText}>
                  The First Team Recurring Gift Program consists of our most dedicated supporters who are committed to providing regular financial contributions to the ministry. It plays a vital role in powering our mission: to assist the church by equipping and igniting Christians to share their faith in Jesus Christ with the "least of these."
                </Text>
                
                <Text style={styles.bodyText}>
                  The First Team Recurring Gift Program is flexible, catering to your individual circumstances. You can choose to contribute monthly, or if you prefer, opt for quarterly or annual donations. With no minimum monthly gift requirement, you can give according to your capacity.
                </Text>
              </View>
            )}
            
            <TouchableOpacity 
              style={styles.dropdownHeader}
              onPress={() => setIsDropdown2Open(!isDropdown2Open)}
            >
              <Text style={styles.smallSubheaderText}>How do I become a First Team Member?</Text>
              <Text style={styles.dropdownChevron}>{isDropdown2Open ? '▲' : '▼'}</Text>
            </TouchableOpacity>
            
            {isDropdown2Open && (
              <View style={styles.dropdownContent}>
                <Text style={styles.bodyText}>
                  • Fill out our form below
                </Text>
                <Text style={styles.bodyText}>
                  • If you'd prefer a check or bank draft for your contribution, please call the office at 972.298.1101 and ask for Ronda or{' '}
                  <Text style={styles.emailLink} onPress={handleEmailPress}>
                    click here to email her
                  </Text>
                </Text>
              </View>
            )}
            
            <TouchableOpacity 
              style={styles.dropdownHeader}
              onPress={() => setIsDropdown3Open(!isDropdown3Open)}
            >
              <Text style={styles.smallSubheaderText}>As a First Team Member, you'll enjoy numerous benefits:</Text>
              <Text style={styles.dropdownChevron}>{isDropdown3Open ? '▲' : '▼'}</Text>
            </TouchableOpacity>
            
            {isDropdown3Open && (
              <View style={styles.dropdownContent}>
                <Text style={styles.bodyText}>
                  • Members who join at $25 or more per month will receive complimentary registration for you and your spouse to any Day of Champions event (excluding Special Ops events where bus fees apply).
                </Text>
                <Text style={styles.bodyText}>
                  • One complimentary black First Team Polo shirt per household.
                </Text>
              </View>
            )}
          </View>
        </View>
        
        <View style={styles.webviewContainer}>
          <WebView
            source={{ uri: 'https://app.donorview.com/Donation/DonationInfo?prm=QEs0AW56GAQ7sA9er6riOXpWGJmuJlglYwY7lYABUeHWDXiMM3S37v-9ccUcNZ-i2d2IcDZY_grbONMSAsVRiMRTurZ6eSMmLJnaBCac2br055CWcvXKT1PLwDGpAm9nIrTl-4d5jcxD-1a9dgN5waMC4jmsgqf6uCEBnk51ug4lz1tD9cM29bUZjMR8FByi0rPgHyQiss8mluUXrrd_glDkmF1I0Wffh-GkGqmW1tZ0v3xTO6VUOF18zFwnE-s10' }}
            style={styles.webview}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={true}
          />
        </View>
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
  headerContainer: {
    backgroundColor: '#1e3a5f',
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
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#fff',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  imageContainer: {
    flex: 1,
    marginRight: 20,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 8,
  },
  textContainer: {
    flex: 2,
    paddingLeft: 10,
  },
  subheaderText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e3a5f',
    marginBottom: 15,
    textAlign: 'left',
    flex: 1,
  },
  smallSubheaderText: {
    fontSize: 18.5,
    fontWeight: 'bold',
    color: '#1e3a5f',
    marginBottom: 15,
    textAlign: 'left',
    flex: 1,
  },
  dropdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  dropdownChevron: {
    fontSize: 16,
    color: '#1e3a5f',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  dropdownContent: {
    marginTop: 10,
  },
  bodyText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 15,
    textAlign: 'left',
  },
  emailLink: {
    color: '#1e3a5f',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
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
