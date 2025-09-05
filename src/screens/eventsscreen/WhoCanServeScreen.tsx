import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { styles } from '../../styles/styles';

export default function WhoCanServeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.mainContentContainer}>
        <View style={styles.missionSection}>
          <Text style={styles.missionTitle}>Who Can Serve on a Bill Glass Behind the Walls Event?</Text>
          <View style={styles.yellowBar} />
          <Text style={styles.missionText}>
            We welcome Christians from all walks of life to join us in this vital ministry. 
            Whether you're a seasoned evangelist or new to ministry, there's a place for you 
            behind the walls.
          </Text>
        </View>

        <View style={styles.messageBox}>
          <Text style={styles.sectionTitle}>Basic Requirements</Text>
          <Text style={styles.bodyText}>
            To serve on a Bill Glass Behind the Walls event, you must:
            {'\n'}• Be a committed Christian with a personal relationship with Jesus Christ
            {'\n'}• Be at least 18 years old (some events may have higher age requirements)
            {'\n'}• Complete a background check and security clearance
            {'\n'}• Attend the required training sessions
            {'\n'}• Have a heart for sharing the Gospel with the incarcerated
            {'\n'}• Be willing to follow all facility rules and guidelines
          </Text>
        </View>

        <View style={styles.messageBox}>
          <Text style={styles.sectionTitle}>Experience Levels</Text>
          <Text style={styles.bodyText}>
            <Text style={styles.linkText}>First-Time Volunteers (Rookies):</Text>
            {'\n'}We especially welcome those new to prison ministry! Our training program will equip you with everything you need to serve effectively. Many of our most impactful volunteers started as rookies.
            {'\n\n'}<Text style={styles.linkText}>Experienced Volunteers:</Text>
            {'\n'}If you have previous ministry experience, you can serve as a team leader or mentor to newer volunteers. Your experience is valuable in helping others grow in their faith and ministry skills.
            {'\n\n'}<Text style={styles.linkText}>Ministry Leaders:</Text>
            {'\n'}Pastors, ministry leaders, and those with extensive evangelism experience can serve in leadership roles and help train other volunteers.
          </Text>
        </View>

        <View style={styles.messageBox}>
          <Text style={styles.sectionTitle}>Gender and Facility Access</Text>
          <Text style={styles.bodyText}>
            <Text style={styles.linkText}>Men's Facilities:</Text>
            {'\n'}• Men can serve in men's facilities without restrictions
            {'\n'}• Women may be eligible to serve in men's facilities with additional security clearance
            {'\n'}• Special training and forms are required for cross-gender ministry
            {'\n\n'}<Text style={styles.linkText}>Women's Facilities:</Text>
            {'\n'}• Women can serve in women's facilities without restrictions
            {'\n'}• Men may be eligible to serve in women's facilities with additional security clearance
            {'\n'}• Special training and forms are required for cross-gender ministry
            {'\n\n'}<Text style={styles.linkText}>Mixed Facilities:</Text>
            {'\n'}• Both men and women can serve in facilities that house both genders
            {'\n'}• Separate areas and protocols are maintained for safety
          </Text>
        </View>

        <View style={styles.messageBox}>
          <Text style={styles.sectionTitle}>Special Skills and Roles</Text>
          <Text style={styles.bodyText}>
            We welcome volunteers with various skills and backgrounds:
            {'\n'}• <Text style={styles.linkText}>Motorcycle Riders:</Text> For events requiring motorcycle ministry
            {'\n'}• <Text style={styles.linkText}>Musicians:</Text> To lead worship and provide musical ministry
            {'\n'}• <Text style={styles.linkText}>Counselors:</Text> To provide one-on-one counseling and support
            {'\n'}• <Text style={styles.linkText}>Teachers:</Text> To lead Bible studies and educational programs
            {'\n'}• <Text style={styles.linkText}>Translators:</Text> For events serving non-English speaking populations
            {'\n'}• <Text style={styles.linkText}>Medical Professionals:</Text> To provide health screenings and support
          </Text>
        </View>

        <View style={styles.messageBox}>
          <Text style={styles.sectionTitle}>Age Requirements</Text>
          <Text style={styles.bodyText}>
            <Text style={styles.linkText}>Minimum Age:</Text> 18 years old for most events
            {'\n'}<Text style={styles.linkText}>Youth Programs:</Text> Some events may allow 16-17 year olds with parental consent
            {'\n'}<Text style={styles.linkText}>Senior Volunteers:</Text> No maximum age limit - we welcome mature Christians of all ages
            {'\n'}<Text style={styles.linkText}>Family Ministry:</Text> Some events may allow families to serve together
          </Text>
        </View>

        <View style={styles.messageBox}>
          <Text style={styles.sectionTitle}>Physical Requirements</Text>
          <Text style={styles.bodyText}>
            While most events don't require special physical abilities, consider:
            {'\n'}• Ability to walk and stand for extended periods
            {'\n'}• Comfortable with security procedures and facility environments
            {'\n'}• Ability to communicate clearly and effectively
            {'\n'}• Emotional stability for ministry in challenging environments
            {'\n'}• Willingness to follow all safety protocols
          </Text>
        </View>

        <View style={styles.messageBox}>
          <Text style={styles.sectionTitle}>Disqualifying Factors</Text>
          <Text style={styles.bodyText}>
            The following may disqualify you from serving:
            {'\n'}• Recent criminal convictions or pending charges
            {'\n'}• History of violence or threatening behavior
            {'\n'}• Substance abuse issues that could affect ministry
            {'\n'}• Inability to pass required background checks
            {'\n'}• Refusal to complete required training or forms
          </Text>
        </View>

        <View style={styles.messageBox}>
          <Text style={styles.sectionTitle}>Getting Started</Text>
          <Text style={styles.bodyText}>
            Ready to serve? Here's how to get started:
            {'\n'}1. Browse our upcoming events and find one that interests you
            {'\n'}2. Complete the registration form for your chosen event
            {'\n'}3. Submit required background check and security forms
            {'\n'}4. Attend the pre-event training session
            {'\n'}5. Show up on event day ready to serve!
            {'\n\n'}Questions about eligibility? Contact our team at 972-298-1101 or info@behindthewalls.com
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
