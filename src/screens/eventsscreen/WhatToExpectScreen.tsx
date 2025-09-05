import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { styles } from '../../styles/styles';

export default function WhatToExpectScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.mainContentContainer}>
        <View style={styles.missionSection}>
          <Text style={styles.missionTitle}>What to Expect at Our Events</Text>
          <View style={styles.yellowBar} />
          <Text style={styles.missionText}>
            Every Bill Glass Behind the Walls event is designed to equip, encourage, and empower 
            you to share the Gospel effectively. Here's what you can expect when you join us.
          </Text>
        </View>

        <View style={styles.messageBox}>
          <Text style={styles.sectionTitle}>Pre-Event Training</Text>
          <Text style={styles.bodyText}>
            Before entering any facility, you'll receive comprehensive training:
            {'\n'}• <Text style={styles.linkText}>Equip & Ignite Training:</Text> Learn effective evangelism techniques
            {'\n'}• <Text style={styles.linkText}>Facility Guidelines:</Text> Understand specific rules and protocols
            {'\n'}• <Text style={styles.linkText}>Safety Briefing:</Text> Learn security procedures and emergency protocols
            {'\n'}• <Text style={styles.linkText}>Team Building:</Text> Connect with fellow volunteers and build relationships
          </Text>
        </View>

        <View style={styles.messageBox}>
          <Text style={styles.sectionTitle}>Event Day Schedule</Text>
          <Text style={styles.bodyText}>
            A typical event day includes:
            {'\n'}• <Text style={styles.linkText}>Early Morning:</Text> Check-in, final briefing, and prayer
            {'\n'}• <Text style={styles.linkText}>Morning:</Text> Travel to facility and security processing
            {'\n'}• <Text style={styles.linkText}>Midday:</Text> Behind the walls ministry and Gospel conversations
            {'\n'}• <Text style={styles.linkText}>Afternoon:</Text> Debriefing, testimonies, and celebration
            {'\n'}• <Text style={styles.linkText}>Evening:</Text> Follow-up training and next steps
          </Text>
        </View>

        <View style={styles.messageBox}>
          <Text style={styles.sectionTitle}>Behind the Walls Ministry</Text>
          <Text style={styles.bodyText}>
            Inside the facility, you'll have opportunities to:
            {'\n'}• Share your personal testimony with inmates
            {'\n'}• Lead small group discussions and Bible studies
            {'\n'}• Provide one-on-one counseling and prayer
            {'\n'}• Distribute Bibles and Christian literature
            {'\n'}• Connect inmates with local churches and resources
          </Text>
        </View>

        <View style={styles.messageBox}>
          <Text style={styles.sectionTitle}>Facility Types</Text>
          <Text style={styles.bodyText}>
            We serve in various correctional facilities:
            {'\n'}• <Text style={styles.linkText}>State Prisons:</Text> Long-term facilities for serious offenses
            {'\n'}• <Text style={styles.linkText}>County Jails:</Text> Short-term detention and pre-trial facilities
            {'\n'}• <Text style={styles.linkText}>Juvenile Centers:</Text> Facilities for youth offenders
            {'\n'}• <Text style={styles.linkText}>Federal Facilities:</Text> High-security federal prisons
            {'\n'}• <Text style={styles.linkText}>Detention Centers:</Text> Immigration and other specialized facilities
          </Text>
        </View>

        <View style={styles.messageBox}>
          <Text style={styles.sectionTitle}>What to Bring</Text>
          <Text style={styles.bodyText}>
            Essential items for the event:
            {'\n'}• Valid photo identification (required)
            {'\n'}• Comfortable, modest clothing (no jeans, shorts, or revealing attire)
            {'\n'}• Closed-toe shoes (no sandals or flip-flops)
            {'\n'}• Bible and notepad
            {'\n'}• Water bottle and snacks (if allowed)
            {'\n'}• Positive attitude and open heart
          </Text>
        </View>

        <View style={styles.messageBox}>
          <Text style={styles.sectionTitle}>Safety and Security</Text>
          <Text style={styles.bodyText}>
            Your safety is our top priority:
            {'\n'}• All volunteers undergo background checks
            {'\n'}• Security briefings before entering facilities
            {'\n'}• Experienced team leaders guide every group
            {'\n'}• Emergency protocols and communication systems
            {'\n'}• Professional security staff at all facilities
          </Text>
        </View>

        <View style={styles.messageBox}>
          <Text style={styles.sectionTitle}>Impact and Results</Text>
          <Text style={styles.bodyText}>
            Our events consistently produce remarkable results:
            {'\n'}• Hundreds of Gospel conversations each event
            {'\n'}• Dozens of new believers and rededications
            {'\n'}• Inmates trained to share their faith
            {'\n'}• Lasting relationships and follow-up ministry
            {'\n'}• Transformed lives and communities
          </Text>
        </View>

        <View style={styles.messageBox}>
          <Text style={styles.sectionTitle}>Follow-Up and Support</Text>
          <Text style={styles.bodyText}>
            After the event, we provide:
            {'\n'}• Debriefing sessions and testimonies
            {'\n'}• Resources for continued ministry
            {'\n'}• Connection to local churches and ministries
            {'\n'}• Ongoing training opportunities
            {'\n'}• Prayer support and encouragement
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
