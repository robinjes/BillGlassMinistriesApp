import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from '../../styles/styles';

export default function HowToRegisterScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.mainContentContainer}>
        <View style={styles.missionSection}>
          <Text style={styles.missionTitle}>How to Register for an Event</Text>
          <View style={styles.yellowBar} />
          <Text style={styles.missionText}>
            Ready to join us behind the walls? Follow these simple steps to register for your 
            first Bill Glass Behind the Walls event and begin your journey of ministry.
          </Text>
        </View>

        <View style={styles.messageBox}>
          <Text style={styles.sectionTitle}>Step 1: Choose Your Event</Text>
          <Text style={styles.bodyText}>
            Browse our upcoming events and find one that fits your schedule and location. 
            Consider factors like:
            {'\n'}• Event date and location
            {'\n'}• Facility type (men's, women's, or mixed)
            {'\n'}• Special requirements (motorcycles, bikes, etc.)
            {'\n'}• Registration deadline
          </Text>
        </View>

        <View style={styles.messageBox}>
          <Text style={styles.sectionTitle}>Step 2: Complete Registration Form</Text>
          <Text style={styles.bodyText}>
            Click on your chosen event to access the registration form. You'll need to provide:
            {'\n'}• Personal contact information
            {'\n'}• Emergency contact details
            {'\n'}• Previous ministry experience
            {'\n'}• Special skills or certifications
            {'\n'}• Transportation preferences
          </Text>
        </View>

        <View style={styles.messageBox}>
          <Text style={styles.sectionTitle}>Step 3: Complete Security Clearance</Text>
          <Text style={styles.bodyText}>
            All volunteers must complete a security background check. This includes:
            {'\n'}• Background check form
            {'\n'}• Photo ID verification
            {'\n'}• Reference checks
            {'\n'}• Additional security forms for certain facilities
          </Text>
        </View>

        <View style={styles.messageBox}>
          <Text style={styles.sectionTitle}>Step 4: Attend Training</Text>
          <Text style={styles.bodyText}>
            Before the event, you'll participate in our Equip & Ignite training program:
            {'\n'}• Evangelism techniques and strategies
            {'\n'}• Facility-specific guidelines
            {'\n'}• Safety protocols and procedures
            {'\n'}• Team building and preparation
          </Text>
        </View>

        <View style={styles.messageBox}>
          <Text style={styles.sectionTitle}>Step 5: Event Day Preparation</Text>
          <Text style={styles.bodyText}>
            On the day of the event:
            {'\n'}• Arrive at the designated meeting location
            {'\n'}• Bring required identification
            {'\n'}• Wear appropriate clothing (guidelines provided)
            {'\n'}• Come with an open heart and ready to serve
          </Text>
        </View>

        <View style={styles.messageBox}>
          <Text style={styles.sectionTitle}>Registration Deadlines</Text>
          <Text style={styles.bodyText}>
            Registration deadlines vary by event, typically 2-4 weeks before the event date. 
            Some events fill up quickly, so we recommend registering as soon as possible. 
            Late registrations may be accepted on a case-by-case basis if space is available.
          </Text>
        </View>

        <View style={styles.messageBox}>
          <Text style={styles.sectionTitle}>Need Help?</Text>
          <Text style={styles.bodyText}>
            Our team is here to help you through the registration process. Contact us at:
            {'\n'}• Phone: 972-298-1101
            {'\n'}• Email: info@behindthewalls.com
            {'\n'}• Online: Visit our website for live chat support
          </Text>
          
          <TouchableOpacity style={styles.linkButton}>
            <Text style={styles.linkText}>Contact Our Team</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
