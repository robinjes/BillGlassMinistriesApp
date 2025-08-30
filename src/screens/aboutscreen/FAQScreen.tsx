import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function FAQScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Frequently Asked Questions</Text>
      
      <View style={styles.faqSection}>
        <Text style={styles.question}>How do Bill Glass Behind the Walls prison events work?</Text>
        <Text style={styles.answer}>Read all about what you can expect on our events by clicking here.</Text>
      </View>

      <View style={styles.faqSection}>
        <Text style={styles.question}>Who can participate on a Bill Glass Behind the Walls event?</Text>
        <Text style={styles.answer}>Bill Glass Ministries strives to make serving under the Bill Glass Behind the Walls banner as open and available as possible. Anyone who agrees with our Statement of Faith and meets age requirements can serve on a Bill Glass Behind the Walls event! For more details, click here to visit the Service Opportunities page.</Text>
      </View>

      <View style={styles.faqSection}>
        <Text style={styles.question}>How do I bring Bill Glass Behind the Walls to my area?</Text>
        <Text style={styles.answer}>We rely on local community support to raise people and funds for events. Not only do we need people to serve inside prisons and jails, but we also need volunteers in other areas such as hospitality, transportation, and tech support. We also need intercessory prayer warriors, experienced fundraisers, and more! To start a Local Team in your area (or join one that might already be in place), please click here and fill out the Local Team form or contact the home office at 972.298.1101.</Text>
      </View>

      <View style={styles.faqSection}>
        <Text style={styles.question}>How do I register for an event?</Text>
        <Text style={styles.answer}>Click here for instructions on how to register for an event. If you have any issues, please call the National Support Center at 972.298.1101.</Text>
      </View>

      <View style={styles.faqSection}>
        <Text style={styles.question}>Do I need to create an account to register for an event?</Text>
        <Text style={styles.answer}>You do not need to create an account to register for an event. If you would like to access your account info and see your activity from previous events, you can create a portal account by clicking Sign In at the top of the page then clicking the Sign Up bottom on the login page. Instructions on how to create a portal account, click here.</Text>
      </View>

      <View style={styles.faqSection}>
        <Text style={styles.question}>I'm a First Team member. Why am I being charged a registration fee?</Text>
        <Text style={styles.answer}>In order to take advantage of your First Team registration waiver, you will need to login to your portal account before registering for an event. To sign in to your account, click Sign In below and to the right of the event header on the registration page. If you have not created a portal account, click here for instructions on how to do so.</Text>
      </View>

      <View style={styles.faqSection}>
        <Text style={styles.question}>How do I fill out an electronic form if one is needed?</Text>
        <Text style={styles.answer}>Some facilities will require additional security forms while other do not. Many of the forms can be filled out online while others require you to download and complete by hand. Check the Important Information section for the event for a link and instructions. You will also receive an email with access to the form.</Text>
      </View>

      <View style={styles.faqSection}>
        <Text style={styles.question}>Is it safe to go into correctional facilities?</Text>
        <Text style={styles.answer}>In over 50 years of ministry, we've never had an incident that compromised the safety of one of our Teammates. Safety is of the utmost concern to correctional facilities and BGBTW. Facility security is tight with many restrictions, and we insist on everyone being properly trained and observing our "Do's and Don'ts." Facilities often have additional personnel on duty during our visits to provide an extra margin of safety.</Text>
      </View>

      <View style={styles.faqSection}>
        <Text style={styles.question}>How can I prepare myself for this type of ministry?</Text>
        <Text style={styles.answer}>There are many ways to get ready to go behind the walls! Pray for the event, the offenders you'll visit, and for the Lord to prepare hearts to receive His message. Study the BGBTW Equipping materials and training videos on the Equipping Volunteers page and attend the Equip & Ignite training session. Relax and be yourself. And remember that you are not responsible for the results, but rather to just deliver the message.</Text>
      </View>

      <View style={styles.faqSection}>
        <Text style={styles.question}>What can I wear inside the prison?</Text>
        <Text style={styles.answer}>Clothing restrictions vary by facility, but in general you should wear:\n\n• Comfortable, close-toed shoes\n• Casual, modest, and comfortable street clothes that are weather appropriate\n• Do NOT wear shirts with religious logos or inappropriate messages\n• Little or no jewelry\n\nMore details regarding clothing can be found in the "Teammate Do's and Don'ts." Facility specific clothing restrictions will be posted on the website event page, in the email you will receive before the event, and reviewed/updated at the Equip & Ignite meeting.</Text>
      </View>

      <View style={styles.faqSection}>
        <Text style={styles.question}>What am I required/allowed to take into the prison units?</Text>
        <Text style={styles.answer}>The following are the only approved items:\n\nRequired:\n• Valid driver's license or government-issued picture ID\n• Stick (non-retractable) pen\n• Name badge\n\nGenerally allowed (but will be confirmed at Equip & Ignite before entering the unit):\n• Approved BGBTW materials\n• Small Bible\n• Vehicle key\n• Medications (limited and only when absolutely necessary)\n\nNOTE: Facility-specific details will be provided at Equip & Ignite. At the facility, expect to be searched and cleared for entry by metal detector, electronic wand, and/or pat-down searches. It is recommended you put your items in a clear bag for ease of inspection.</Text>
      </View>

      <View style={styles.faqSection}>
        <Text style={styles.question}>What about meals while I'm inside the prison?</Text>
        <Text style={styles.answer}>Most facilities provide a meal. As often as possible, we eat with the inmates. The inmates enjoy it and it provides additional opportunities for witnessing. No outside food is allowed in the facilities and leaving the facility during mealtimes is typically not allowed.</Text>
      </View>

      <View style={styles.faqSection}>
        <Text style={styles.question}>Why do you need all of my personal information to go on one of your events?</Text>
        <Text style={styles.answer}>To volunteer with the prison system, a criminal background check must be run first. We are required to provide date of birth (DOB), driver's license (DL) number, and in some states the full social security number of all volunteers and staff.</Text>
      </View>

      <View style={styles.faqSection}>
        <Text style={styles.question}>Why is the registration deadline several weeks from the actual event date?</Text>
        <Text style={styles.answer}>Registration deadlines are driven by correctional facilities. They often require our volunteer list and security information several weeks in advance.</Text>
      </View>

      <View style={styles.faqSection}>
        <Text style={styles.question}>Since BGBTW programs are Christ-centered, why aren't they held in the chapel?</Text>
        <Text style={styles.answer}>Our mission is primarily to reach the lost. We strive to conduct our programs in a "non-churchy" way to attract inmates and juvenile offenders who might never enter the chapel or attend any type of "religious" service. By bringing in exciting Platform Speakers, motorcycles and other attractions, we are able to effectively reach the otherwise unreachable.</Text>
      </View>

      <View style={styles.faqSection}>
        <Text style={styles.question}>How much time will I actually get to spend with the inmates?</Text>
        <Text style={styles.answer}>The amount of individual time with inmates varies. Multiple factors are involved:\n\n• Facility visitation restrictions\n• Type of inmate population\n• Approval to eat with the inmates\n• Program times</Text>
      </View>

      <View style={styles.faqSection}>
        <Text style={styles.question}>Am I allowed to witness to the prison officials?</Text>
        <Text style={styles.answer}>Absolutely! Our main focus is to witness to inmates/juvenile offenders, but if the opportunity arises and doesn't interfere with an officer's obligation to work duties, we encourage it.</Text>
      </View>

      <View style={styles.faqSection}>
        <Text style={styles.question}>How do facility assignments work? Will I be assigned to the same facility as my friends?</Text>
        <Text style={styles.answer}>Facility assignments are dictated by the needs and requirements at individual units and based on several factors such as size of unit/number of inmates, male/female population, age requirements, and the number of Teammates the units allow. We make every effort to fulfill group assignment requests, but we cannot always guarantee it. We appreciate your flexibility and understanding.\n\nWhen registering for an event, you will see the following question: If you are a member of a group, please select the group or if the group is not listed, please add it. If you are the leader, select the "Add New" option. If you are a member, select the name of the group. If you are a member but the group does not exist, please contact your group leader.</Text>
      </View>

      <View style={styles.faqSection}>
        <Text style={styles.question}>Will BGBTW help me find a roommate and/or carpool for the event?</Text>
        <Text style={styles.answer}>Teammates are fully responsible for their own travel and hotel arrangements including transportation and/or a roommate. We understand the need to reduce personal costs as much as possible, so we recommend inviting a friend to register and share in the expense!</Text>
      </View>

      <View style={styles.faqSection}>
        <Text style={styles.question}>Are Equip & Ignite sessions and other scheduled meetings mandatory?</Text>
        <Text style={styles.answer}>YES! Every registered Teammate needs to attend Equip & Ignite training. We provide as much information as possible about our events in advance; however, circumstances and situations inside correctional facilities can often change even on the day of the event. E&I training is where you will receive the most accurate information about the facility you're assigned to, requirements to enter, program times and changes, and other very important information.</Text>
      </View>

      <View style={styles.faqSection}>
        <Text style={styles.question}>If I've already been on an event, do I still have to come to training?</Text>
        <Text style={styles.answer}>YES! Every registered Teammate needs to attend Equip & Ignite training. We provide as much information as possible about our events in advance; however, circumstances and situations inside correctional facilities can often change even on the day of the event. E&I training is where you will receive the most accurate information about the facility you're assigned to, requirements to enter, program times and changes, and other very important information.</Text>
      </View>

      <View style={styles.faqSection}>
        <Text style={styles.question}>How long will I be in the facility?</Text>
        <Text style={styles.answer}>On average, you can expect to be in the facility 7-8 hours on the day of the event; however, it can vary.</Text>
      </View>

      <View style={styles.faqSection}>
        <Text style={styles.question}>Why does Bill Glass Behind the Walls charge a registration fee?</Text>
        <Text style={styles.answer}>The ministry charges a nominal registration fee to help cover the costs of the event materials and training. The fee is non-refundable except in instances when an event is cancelled or one is denied entry to a facility. If access is denied, you are then given the option to donate the fee to the ministry or have it refunded. If the fee is donated, you will be provided a charitable gift receipt for tax deduction purposes. Registration fees for qualifying First Team members and their spouses are waived for all Weekend and Day of Champion events.</Text>
      </View>

      <View style={styles.faqSection}>
        <Text style={styles.question}>What if I can't afford to pay the registration fee?</Text>
        <Text style={styles.answer}>Limited scholarships are available for volunteers at each event unable to pay the registration fee. If you would like to be considered for a scholarship, please contact our offices at 972.298.1101 and ask to speak to an Event Administrator.</Text>
      </View>

      <View style={styles.faqSection}>
        <Text style={styles.question}>What is $75 to Life?</Text>
        <Text style={styles.answer}>On average, seeing one decision for Christ will cost Bill Glass Behind the Walls about $75. The ministry calls this $75 TO LIFE. That $75 investment represents even more than one soul saved, it also represents:\n\n• One person evangelistically trained and sent to share the gospel Behind the Walls\n• Many inmates hear the gospel, even if they don't accept Christ that day\n• Many fallen-away believers repent of their sins and come back to the Lord\n• Incarcerated believers trained to share with other inmates and their families and friends\n• Newly trained evangelists coming back to their communities ready to share the gospel with others\n\nFor more information or to give, go to the $75 to Life page</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 28,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
  },
  title: {
    color: '#1e3a5f',
    fontWeight: 'bold',
    fontSize: 28,
    marginBottom: 30,
    marginTop: 10,
    fontFamily: 'System',
  },
  faqSection: {
    marginBottom: 28,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  question: {
    color: '#1e3a5f',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 12,
    fontFamily: 'System',
    lineHeight: 24,
  },
  answer: {
    color: '#222',
    fontSize: 16,
    fontFamily: 'System',
    lineHeight: 24,
  },
});
