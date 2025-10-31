import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function DonorPrivacyPolicyScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.contentContainer}>
        <Text style={styles.updateText}>Latest update: June 20, 2019</Text>
        
        <Text style={styles.bodyText}>
          As a donor submitting personally identifying information ("Personal Information") to us or any of our staff, you consent to the terms and conditions of the policy and to our processing and use of Personal Information for the purposes stated below.
        </Text>
        
        <Text style={styles.subheaderText}>Personal Information</Text>
        
        <Text style={styles.bodyText}>
          "Personal Information" is information that identifies you personally, such as your name, address, telephone number, and email address. We collect and store the personally identifiable information that you have provided us via one of the email addresses identified on our website or when you otherwise contact us in person, by phone or email, with a question. We collect your name, email address and other contact information if you register for an event. We also collect your name, email address, telephone number and payment information when you make a contribution, either on our website, at a special event, over the phone or by mailing in a check. The above list provides a sample of personal information that may be collected by Bill Glass Ministries dba Bill Glass Behind the Walls. From time to time, we may collect personal information from you in ways not described above.
        </Text>
        
        <Text style={styles.subheaderText}>Use and Disclosure of Personal Information</Text>
        
        <Text style={styles.bodyText}>
          We never rent or exchange lists we maintain that may include your Personal Information, collected on the website or through any other activities, such as offline gifts, with other third parties. Only agents acting on direct behalf of this organization will ever have access to this information. We use this information to provide you with gift receipts, potential follow up phone calls or emails for the purpose of expressing our gratitude for your support, and to offer the opportunity to contribute to future needs. Should you ever wish to opt out of offers for future needs, please contact our donor manager at Donations@BehindtheWalls.com.
        </Text>
        
        <Text style={styles.bodyText}>
          We will not send you mailings on behalf of other organizations.
        </Text>
        
        <Text style={styles.bodyText}>
          We will collect payment information, billing address and other information necessary to process a donation or event registration. Your payment information is immediately encrypted, but our system never receives the full card information and only the last 4 digits is ever available to us. Our software is encrypted using 256 bit encryption, and it is PCI Certified to comply with the highest standards of the Payment Card Industry standards.
        </Text>
        
        <Text style={styles.bodyText}>
          We will use your information to comply with the law or in the good faith belief that such action is necessary to conform to the requirements of law or comply with legal process served on us.
        </Text>
        
        <Text style={styles.bodyText}>
          We will use the personal information to protect against potential fraud. We may verify with third parties the information collected in the course of processing a gift, event registration or other donation. If you use a credit or debit card on the website, we may use card authorization and fraud screening services to verify that your card information and address matches the information that you supplied to us and that the card being used has not been reported lost or stolen.
        </Text>
        
        <Text style={styles.bodyText}>
          You have the right to review information that we have collected about you. To review that information please contact us in writing. Except as described in this Privacy Policy or at the time we request the information, we do not otherwise disclose your personal information to any third parties.
        </Text>
        
        <Text style={styles.subheaderText}>Changes to the Donor Privacy Policy</Text>
        
        <Text style={styles.bodyText}>
          We reserve the right to change this Donor Privacy Policy from time to time. When we do, we will note the last update at the top of this Donor Privacy Policy page.
        </Text>
        
        <Text style={styles.bodyText}>
          You can learn more by reading our general Privacy Policy.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: '#b8b8b8',
  },
  scrollContent: {
    flexGrow: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  updateText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 20,
    textAlign: 'left',
    fontStyle: 'italic',
  },
  subheaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e3a5f',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'left',
  },
  bodyText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 15,
    textAlign: 'left',
  }
});
