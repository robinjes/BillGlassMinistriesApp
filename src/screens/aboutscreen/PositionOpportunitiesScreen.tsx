import React from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/AppNavigator';

export default function PositionOpportunitiesScreen() {
  // ...existing code...
  // ...existing code...
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Position Opportunities</Text>
      </View>
      <View style={styles.subHeaderContainer}>
        <Text style={styles.subHeaderText}>
          To show interest in a position,{' '}
          <Text
            style={styles.linkText}
            onPress={() => navigation.navigate('Open Positions Form')}
          >
            click here
          </Text>
          {' '}to complete the form and submit your resume.
        </Text>
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
  {/* Slideshow removed, now only in PlatformGuestsScreen */}
        <View style={styles.positionDescriptionContainer}>
          <View style={styles.positionHeaderContainer}>
            <Text style={styles.positionHeaderText}>Regional Director</Text>
          </View>
          <Text style={styles.positionDescriptionText}>
            The purpose of the regional director is to provide leadership in their respective territory. The regional director will establish new relationships while maintaining and strengthening existing ones as it relates to the mission of the organization by raising up teams and volunteers by equipping and igniting teammates in preparation for sharing their faith in the areas of Day of Champions events and beyond. Be a valuable team member and follow the lead of respective home office team members in the areas of development, IT, Communications, and Finance.
          </Text>
        </View>
          <View style={styles.buttonContainer}>
            <Text style={styles.fullJobButton} onPress={() => Linking.openURL('https://irp.cdn-website.com/cb495078/files/uploaded/Regional_Director+%281%29.pdf')}>
              Full Job Description
            </Text>
          </View>
        {/* Second position section with 'test' text */}
        <View style={styles.positionDescriptionContainer}>
          <View style={styles.positionHeaderContainer}>
            <Text style={styles.positionHeaderText}>Chief Development Officer
</Text>
          </View>
          <Text style={styles.positionDescriptionText}>The purpose is to lead in the planning, organizing, and directing of Bill Glass Behind the Walls development endeavors, embrace the mission and statement of faith for the ministry. This is an on-site position in the Duncanville, TX office.</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Text style={styles.fullJobButton} onPress={() => Linking.openURL('https://irp.cdn-website.com/cb495078/files/uploaded/Bill+Glass+-+Director+of+Development.pdf')}>
            Full Job Description
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  // ...existing code...
  slideshowContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
    marginBottom: 32,
    position: 'relative',
  },
  slideshowTouch: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  slideshowImage: {
    width: 340,
    height: 220,
    borderRadius: 12,
    backgroundColor: '#eee',
  },
  arrowLeft: {
    position: 'absolute',
    left: 10,
    top: '50%',
    transform: [{ translateY: -16 }],
    backgroundColor: 'rgba(30,58,95,0.7)',
    borderRadius: 20,
    padding: 8,
    zIndex: 2,
  },
  arrowRight: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -16 }],
    backgroundColor: 'rgba(30,58,95,0.7)',
    borderRadius: 20,
    padding: 8,
    zIndex: 2,
  },
  arrowText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subHeaderContainer: {
    width: '100%',
    paddingVertical: 18,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  subHeaderText: {
    color: '#1e3a5f',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  linkText: {
    textDecorationLine: 'underline',
    color: '#4fc3f7',
    fontWeight: 'bold',
  },
  positionHeaderContainer: {
    width: '100%',
    backgroundColor: '#fff',
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 64,
    marginBottom: 0,
    paddingLeft: 0,
  },
  positionHeaderText: {
    color: '#1e3a5f',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 1,
    alignSelf: 'center',
  },
  positionDescriptionContainer: {
    width: '94%',
    alignSelf: 'center',
    marginTop: 18,
    marginBottom: 12,
  },
  positionDescriptionText: {
    fontSize: 16,
    color: '#222',
    textAlign: 'left',
    lineHeight: 22,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
    marginBottom: 24,
    width: '100%',
  },
  fullJobButton: {
    backgroundColor: '#f7b731',
    color: '#1e3a5f',
    fontWeight: 'bold',
    fontSize: 18,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    overflow: 'hidden',
    textAlign: 'center',
    elevation: 2,
  },
  container: { flex: 1, backgroundColor: '#fff' },
  headerContainer: {
    width: '100%',
    backgroundColor: '#1e3a5f',
    paddingVertical: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 1,
  },
  // ...existing code...
  webviewContainer: {
    flex: 1,
    width: '100%',
    height: 600,
    marginTop: 16,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#e3eaf5',
  },
});
