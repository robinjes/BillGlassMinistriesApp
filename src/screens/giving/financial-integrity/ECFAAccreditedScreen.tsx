import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function ECFAAccreditedScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.contentContainer}>
        <Text style={styles.subheaderText}>WHO IS THE ECFA?</Text>
        <Text style={styles.bodyText}>
          Founded in 1979, the Evangelical Council for Financial Accountability (ECFA) provides accreditation to leading Christian nonprofit organizations that faithfully demonstrate compliance with established standards for financial accountability, transparency, fundraising and board governance. Members include Christian ministries, denominations, churches, educational institutions and other tax-exempt 501(c)(3) organizations. Currently, there are 1,942 accredited members, and collectively, these organizations represent nearly $23 billion in annual revenue. For more information about the ECFA, we invite you to visit their website.
        </Text>
        <Text style={styles.bodyText}>
          You may also visit our profile with the ECFA by clicking here.
        </Text>
        
        <Text style={styles.subheaderText}>HOW WE ACHIEVE ECFA ACCREDITATION</Text>
        <Text style={styles.bodyText}>
          To be entrusted with the Lord's money is a great responsibility, one we take very seriously. Over 81% of all funds received go directly to support hands-on ministry, and the ministry operates essentially debt free. Bill Glass Ministries dba Bill Glass Behind the Walls is qualified as a tax-exempt 501(c)(3) charitable organization by the Internal Revenue Service. As such, donors may deduct gifts to us as provided for in section 170 of the Internal Revenue Code. Our Federal Tax ID number is 75-2733954. Please see our Financial Documents tab to view or download our Tax Determination letter.
        </Text>
        <Text style={styles.bodyText}>
          We have been an accredited member of the ECFA since 1989, an organization dedicated to enhancing the trust of Christ-centered ministries and churches by requiring member organizations adhere to their Seven Standards of Responsible Stewardship™.
        </Text>
        
        <Text style={styles.subheaderText}>Standard 1 - Doctrinal Issues</Text>
        <Text style={styles.bodyText}>
          We have a written Statement of Faith the clearly affirms our commitment to the evangelical Christian faith, and we operate in accordance with Biblical truths and practices. Please see our Statement of Faith for more information.
        </Text>
        
        <Text style={styles.subheaderText}>Standard 2 - Governance</Text>
        <Text style={styles.bodyText}>
          We are governed by a Board of Directors who physically meet semi-annually. Additionally, the Finance Committee of the Board meets with the CEO and the Treasurer via teleconference quarterly to review the internal financial statements for the current year to date.
        </Text>
        
        <Text style={styles.subheaderText}>Standard 3 - Financial Oversight</Text>
        <Text style={styles.bodyText}>
          We prepare monthly and annual financial statements. At the close of each fiscal year, our financial statements are audited by an independent certified public accountant. A representative of our auditor presents these statements to the Board of Directors at the winter semi-annual meetings. View our Audited Financial Statements in the Financial Documents tab.
        </Text>
        
        <Text style={styles.subheaderText}>Standard 4 - Use of Resources and Compliance with Laws</Text>
        <Text style={styles.bodyText}>
          Each year, our auditor prepares and submits our IRS Form 990. We comply with all state and federal laws in order to main our tax-exempt status. Further, we work hard to keep costs at a minimum so that more than 80% of all revenue goes to directly support ministry, and all bills are paid with 30 days of receipt.
        </Text>
        
        <Text style={styles.subheaderText}>Standard 5 - Transparency</Text>
        <Text style={styles.bodyText}>
          We are dedicated to be completely transparent. You may find our financial information in the Financial Documents tab.
        </Text>
        
        <Text style={styles.subheaderText}>Standard 6 - Compensation-Setting and Related-Party Transactions</Text>
        <Text style={styles.bodyText}>
          The Board of Directors sets the salary for our CEO, and they routinely check the compensation of officers in similarly sized non-profits. Related-Party transactions require a quorum of Board members to vote on approval.
        </Text>
        
        <Text style={styles.subheaderText}>Standard 7 - Stewardship of Charitable Gifts</Text>
        <Text style={styles.bodyText}>
          We are committed to providing, (a) truthfulness in our communication, (b) honoring the donor's intent when a gift is given, (c) providing timely gift acknowledgements, (d) acting in the best interest of our givers, and (e) if we use an outside stewardship resource consultant or if one of our own staff participates in fund-raising, neither will be directly or indirectly receive payment that is based on a percentage of charitable contributions raised.
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
