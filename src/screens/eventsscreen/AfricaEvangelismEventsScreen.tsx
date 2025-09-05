import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { styles } from '../../styles/styles';

export default function AfricaEvangelismEventsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.mainContentContainer}>
        <View style={styles.missionSection}>
          <Text style={styles.missionTitle}>Africa Evangelism Events</Text>
          <View style={styles.yellowBar} />
          <Text style={styles.missionText}>
            Join us in taking the Gospel to correctional facilities across Africa. These special events 
            provide unique opportunities to serve in international settings and make a lasting impact 
            in the lives of inmates and their communities.
          </Text>
        </View>

        <View style={styles.messageBox}>
          <Text style={styles.sectionTitle}>Upcoming Africa Events</Text>
          <Text style={styles.bodyText}>
            We have exciting opportunities to serve in Africa throughout the year. These events typically 
            include training sessions, behind-the-walls ministry, and community outreach programs.
          </Text>
          
          <Text style={styles.bodyText}>
            <Text style={styles.linkText}>Lesotho, Africa DOC</Text> - August 11-17
            {'\n'}Schedule: Arrive in Lesotho: Friday, August 8, Equip & Ignite Training: Sunday, August 10, 
            Behind the Walls: Monday-Sunday, August 11-17, Depart from Lesotho: Monday, August 18
          </Text>
          
          <Text style={styles.bodyText}>
            <Text style={styles.linkText}>Malawi, Africa DOC</Text> - September 25-27
            {'\n'}Schedule: Arrive in Malawi: Monday, September 22, Equip & Ignite Training: Wednesday, 
            September 24, Behind the Walls: Thursday-Saturday, September 25-27, Depart from Malawi: Sunday, September 28
          </Text>
        </View>

        <View style={styles.messageBox}>
          <Text style={styles.sectionTitle}>What to Expect</Text>
          <Text style={styles.bodyText}>
            • International travel and cultural immersion
            {'\n'}• Specialized training for African correctional facilities
            {'\n'}• Opportunities to serve in both men's and women's facilities
            {'\n'}• Community outreach and follow-up programs
            {'\n'}• Life-changing experiences and lasting relationships
          </Text>
        </View>

        <View style={styles.messageBox}>
          <Text style={styles.sectionTitle}>Requirements</Text>
          <Text style={styles.bodyText}>
            • Valid passport and necessary travel documents
            {'\n'}• Completion of standard security clearance
            {'\n'}• Participation in pre-trip training sessions
            {'\n'}• Commitment to full event duration
            {'\n'}• Open heart for cross-cultural ministry
          </Text>
        </View>

        <View style={styles.messageBox}>
          <Text style={styles.sectionTitle}>Registration</Text>
          <Text style={styles.bodyText}>
            Registration for Africa events typically opens 2-3 months before the event date. 
            Space is limited, so early registration is recommended. Contact our team for more 
            information about upcoming opportunities and registration deadlines.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
