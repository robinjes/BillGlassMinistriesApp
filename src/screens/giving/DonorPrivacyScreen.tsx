import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function DonorPrivacyScreen() {
  const [isPersonalInfoOpen, setIsPersonalInfoOpen] = useState(false);
  const [isUseDisclosureOpen, setIsUseDisclosureOpen] = useState(false);
  const [isChangesOpen, setIsChangesOpen] = useState(false);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Donor Privacy</Text>
      </View>
      
      <View style={styles.contentContainer}>
        <Text style={styles.bodyText}>
          As a donor submitting personally identifying information ("Personal Information") to us or any of our staff, you consent to the terms and conditions of the policy and to our processing and use of Personal Information for the purposes stated below.
        </Text>
        
        <TouchableOpacity 
          style={styles.dropdownHeader}
          onPress={() => setIsPersonalInfoOpen(!isPersonalInfoOpen)}
        >
          <Text style={styles.dropdownHeaderText}>Personal Information</Text>
          <Text style={styles.dropdownChevron}>{isPersonalInfoOpen ? '▲' : '▼'}</Text>
        </TouchableOpacity>
        
        {isPersonalInfoOpen && (
          <View style={styles.dropdownContent}>
            <Text style={styles.dropdownText}>
              "Personal Information" is information that identifies you personally, such as your name, address, telephone number, and email address. We collect and store the personally identifiable information that you have provided us via one of the email addresses identified on our website or when you otherwise contact us in person, by phone or email, with a question. We collect your name, email address and other contact information if you register for an event. We also collect your name, email address, telephone number and payment information when you make a contribution, either on our website, at a special event, over the phone or by mailing in a check. The above list provides a sample of personal information that may be collected by Bill Glass Ministries dba Bill Glass Behind the Walls. From time to time, we may collect personal information from you in ways not described above.
            </Text>
          </View>
        )}
        
        <TouchableOpacity 
          style={styles.dropdownHeader}
          onPress={() => setIsUseDisclosureOpen(!isUseDisclosureOpen)}
        >
          <Text style={styles.dropdownHeaderText}>Use and Disclosure of Personal Information</Text>
          <Text style={styles.dropdownChevron}>{isUseDisclosureOpen ? '▲' : '▼'}</Text>
        </TouchableOpacity>
        
        {isUseDisclosureOpen && (
          <View style={styles.dropdownContent}>
            <Text style={styles.dropdownText}>
              We never rent or exchange lists we maintain that may include your Personal Information, collected on the website or through any other activities, such as offline gifts, with other third parties. Only agents acting on direct behalf of this organization will ever have access to this information. We use this information to provide you with gift receipts, potential follow up phone calls or emails for the purpose of expressing our gratitude for your support, and to offer the opportunity to contribute to future needs. Should you ever wish to opt out of offers for future needs, please contact our donor manager at Donations@BehindtheWalls.com.
            </Text>
            <Text style={styles.dropdownText}>
              We will not send you mailings on behalf of other organizations.
            </Text>
            <Text style={styles.dropdownText}>
              We will collect payment information, billing address and other information necessary to process a donation or event registration. Your payment information is immediately encrypted, but our system never receives the full card information and only the last 4 digits is ever available to us. Our software is encrypted using 256 bit encryption, and it is PCI Certified to comply with the highest standards of the Payment Card Industry standards.
            </Text>
            <Text style={styles.dropdownText}>
              We will use your information to comply with the law or in the good faith belief that such action is necessary to conform to the requirements of law or comply with legal process served on us.
            </Text>
            <Text style={styles.dropdownText}>
              We will use the personal information to protect against potential fraud. We may verify with third parties the information collected in the course of processing a gift, event registration or other donation. If you use a credit or debit card on the website, we may use card authorization and fraud screening services to verify that your card information and address matches the information that you supplied to us and that the card being used has not been reported lost or stolen.
            </Text>
            <Text style={styles.dropdownText}>
              You have the right to review information that we have collected about you. To review that information please contact us in writing. Except as described in this Privacy Policy or at the time we request the information, we do not otherwise disclose your personal information to any third parties.
            </Text>
          </View>
        )}
        
        <TouchableOpacity 
          style={styles.dropdownHeader}
          onPress={() => setIsChangesOpen(!isChangesOpen)}
        >
          <Text style={styles.dropdownHeaderText}>Changes to the Donor Privacy Policy</Text>
          <Text style={styles.dropdownChevron}>{isChangesOpen ? '▲' : '▼'}</Text>
        </TouchableOpacity>
        
        {isChangesOpen && (
          <View style={styles.dropdownContent}>
            <Text style={styles.dropdownText}>
              We reserve the right to change this Donor Privacy Policy from time to time. When we do, we will note the last update at the top of this Donor Privacy Policy page.
            </Text>
            <Text style={styles.dropdownText}>
              You can learn more by reading our general Privacy Policy.
            </Text>
          </View>
        )}
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
    paddingVertical: 30,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  headerText: {
    fontSize: 36,
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
  bodyText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 20,
    textAlign: 'left',
  },
  dropdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  dropdownHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e3a5f',
    flex: 1,
  },
  dropdownChevron: {
    fontSize: 14,
    color: '#1e3a5f',
    fontWeight: 'bold',
  },
  dropdownContent: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    textAlign: 'left',
  }
});
