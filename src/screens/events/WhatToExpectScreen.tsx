import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { styles } from '../../styles/styles';
import { RootStackParamList } from '../../navigation/AppNavigator';

const SECTIONS = [
  'Before the Event',
  'Night before the Event',
  'Day of the Event',
  'After the Event',
] as const;

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type Nav = NativeStackNavigationProp<RootStackParamList>;

function BeforeTheEventBody() {
  return (
    <View style={c.beforeWrap}>
      <Text style={c.beforeMainHeading}>
        We communicate important event information by email, mail, and phone
      </Text>

      <Text style={c.beforeSubheading}>By Email:</Text>
      <Text style={c.beforeBody}>
        <Text style={c.beforeLabel}>Immediately upon registration:</Text>
        {
          ' You will receive an email with additional info about the event, how to prepare for the event, and confirmation of registration payment. The information is identical to the confirmation webpage you will see when you complete registration.'
        }
      </Text>
      <Text style={[c.beforeBody, c.blockSpacer]}>
        <Text style={c.beforeLabel}>1-2 weeks before the event:</Text>
        {
          ' You will receive an email with the location of the Thursday or Friday night Tailgate Party/Equip & Ignite training and information about the event including any details specific to the facility to which you have been assigned.'
        }
      </Text>
      <Text style={c.beforeBody}>
        <Text style={c.beforeLabel}>As needed:</Text> Other event-specific emails
      </Text>

      <View style={c.sectionDivider} />

      <Text style={c.beforeSubheading}>By Phone:</Text>
      <Text style={c.beforeBody}>
        <Text style={c.beforeLabel}>Week of the event:</Text>
        {
          ' One of the Site Coordinators will call you to make sure you received and understand the email mentioned above. He will be able to answer any questions you may have.'
        }
      </Text>
    </View>
  );
}

function NightBeforeBody() {
  return (
    <View style={c.nightWrap}>
      <Text style={c.nightHeading}>Equip & Ignite (E&I):</Text>
      <Text style={c.nightBody}>
        At the E&I, we educate our volunteers (Teammates) on what to expect at the facilities we're visiting, train
        them to share their faith with our tract, and provide spiritual preparedness with praise and worship music.
      </Text>
    </View>
  );
}

const DAY_SECTIONS: { title: string; body: string }[] = [
  {
    title: 'Arrival at the facility:',
    body:
      'As soon as you arrive at the facility, let your Site Coordinator know you are there. Listen as they go through the processing and instructions and any additional info they have to share.',
  },
  {
    title: 'Enter the facility:',
    body:
      'Remain quiet as you enter the facility. Present your government-issued ID (often, the prison will collect them and keep them until you leave) as you go through security. You will be escorted to your meeting/program location.',
  },
  {
    title: 'Attend the program:',
    body:
      "Our professionally staged events typically take place in common areas such as recreation yards and gyms, except in jails or facilities without common areas, programs are held inside housing areas. We feature athletes, entertainers, musicians, and ex-offenders sharing their talents and their stories of how they came to faith in Jesus Christ. Our performers draw the inmates and juvenile offenders out to the program that typically wouldn't attend a church or chapel service. They do this by offering hope; which opens the door for our teammates to share their faith one-on-one or in small groups using our proven tract.",
  },
  {
    title: 'Visit with offenders:',
    body:
      'Begin conversations with offenders; one-on-one or in a small group. Discuss the BGBTW tract as reviewed at E&I training. Use other materials in the Teammate Packet as needed. Give each offender who makes a decision for Christ a Study Guide. As time permits, train them on how to use the tract to share the Gospel and leave a few extra with them, pray for them and their families, and encourage them to continue in their knowledge and love of the Lord.',
  },
  {
    title: 'Leave the facility:',
    body:
      "Your Site Coordinator will advise you when it's time to wrap up and where to go after visiting with offenders. You'll complete the required forms as shown at E&I and give them to the Site Coordinator. As a group, you'll be given your ID's back and will exit together.",
  },
  {
    title: 'Banquet (on Weekend of Champions (WOC) "2 day" events only):',
    body:
      'Immediately after leaving the correctional facilities on the Friday of a WOC, we provide dinner, share experiences from the day, and hold a short award ceremony for Teammates achieving event attendance milestones.',
  },
];

function DayOfBody() {
  return (
    <View style={c.dayWrap}>
      {DAY_SECTIONS.map(({ title, body }, i) => (
        <View key={title} style={i < DAY_SECTIONS.length - 1 ? c.dayBlock : undefined}>
          <Text style={c.dayHeading}>{title}</Text>
          <Text style={c.dayBody}>{body}</Text>
        </View>
      ))}
    </View>
  );
}

function AfterTheEventBody() {
  const navigation = useNavigation<Nav>();
  return (
    <View style={c.afterWrap}>
      <Text style={c.afterBody}>
        Site Coordinators will compile all forms and calculate the results for each facility. Later that same day, all
        registered Teammates will receive a phone call with the event's total results. An event survey will be
        emailed to all registered Teammates and we encourage everyone to complete them with as much detail as possible
        to help us improve our events.
      </Text>
      <Text style={[c.afterBody, c.afterSecondPara]}>
        Provided at the training is the Action Steps Beyond the Walls infographic card with some things you can do
        following the event.{' '}
        <Text
          style={c.afterLink}
          onPress={() => navigation.navigate('Action Steps')}
          accessibilityRole="link"
        >
          Click here to view that card.
        </Text>
      </Text>
    </View>
  );
}

function SectionBody({ index }: { index: number }) {
  switch (index) {
    case 0:
      return <BeforeTheEventBody />;
    case 1:
      return <NightBeforeBody />;
    case 2:
      return <DayOfBody />;
    case 3:
      return <AfterTheEventBody />;
    default:
      return null;
  }
}

export default function WhatToExpectScreen() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = useCallback((index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.mainContentContainer}>
        <View style={[styles.missionSection, localStyles.missionTight]}>
          <View style={styles.eventScreenTitleBlock}>
            <Text style={[styles.missionTitle, styles.eventScreenMissionTitle]}>What to Expect at Our Events</Text>
            <View style={styles.yellowBar} />
          </View>
        </View>

        {SECTIONS.map((title, index) => {
          const isOpen = openIndex === index;
          return (
            <View key={title} style={localStyles.card}>
              <View style={localStyles.accordionShell}>
                <TouchableOpacity
                  style={[localStyles.trigger, isOpen && localStyles.triggerExpanded]}
                  onPress={() => toggle(index)}
                  activeOpacity={0.75}
                  accessibilityRole="button"
                  accessibilityState={{ expanded: isOpen }}
                  accessibilityLabel={title}
                >
                  <View style={localStyles.triggerRow}>
                    <Text style={[localStyles.triggerTitle, isOpen && localStyles.triggerTitleExpanded]}>{title}</Text>
                    <Ionicons name={isOpen ? 'chevron-up' : 'chevron-down'} size={22} color={isOpen ? '#f7b731' : '#1e3a5f'} />
                  </View>
                </TouchableOpacity>

                {isOpen ? (
                  <View style={localStyles.body}>
                    <SectionBody index={index} />
                  </View>
                ) : null}
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const c = StyleSheet.create({
  beforeWrap: {
    backgroundColor: '#f5f6f8',
    marginHorizontal: -14,
    marginTop: -1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  beforeMainHeading: {
    fontSize: 18,
    fontWeight: '700',
    color: '#002d56',
    lineHeight: 26,
    marginBottom: 18,
    fontFamily: 'System',
  },
  beforeSubheading: {
    fontSize: 16,
    fontWeight: '700',
    color: '#002d56',
    marginBottom: 10,
    fontFamily: 'System',
  },
  beforeLabel: {
    fontWeight: '700',
    color: '#002d56',
  },
  beforeBody: {
    fontSize: 16,
    fontWeight: '400',
    color: '#6c7b8b',
    lineHeight: 24,
    fontFamily: 'System',
  },
  blockSpacer: {
    marginTop: 12,
    marginBottom: 12,
  },
  sectionDivider: {
    height: 16,
  },
  nightWrap: {
    backgroundColor: '#f5f6f8',
    marginHorizontal: -14,
    marginTop: -1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  nightHeading: {
    fontSize: 17,
    fontWeight: '700',
    color: '#002d56',
    marginBottom: 10,
    fontFamily: 'System',
  },
  nightBody: {
    fontSize: 16,
    fontWeight: '400',
    color: '#5c6b7a',
    lineHeight: 24,
    fontFamily: 'System',
  },
  dayWrap: {
    backgroundColor: '#f8f9fa',
    marginHorizontal: -14,
    marginTop: -1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  dayBlock: {
    marginBottom: 18,
  },
  dayHeading: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a365d',
    marginBottom: 8,
    fontFamily: 'System',
  },
  dayBody: {
    fontSize: 16,
    fontWeight: '400',
    color: '#1a365d',
    lineHeight: 24,
    fontFamily: 'System',
  },
  afterWrap: {
    backgroundColor: '#f5f5f5',
    marginHorizontal: -14,
    marginTop: -1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  afterBody: {
    fontSize: 16,
    fontWeight: '400',
    color: '#546e7a',
    lineHeight: 24,
    fontFamily: 'System',
  },
  afterSecondPara: {
    marginTop: 16,
  },
  afterLink: {
    color: '#6c757d',
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
});

const localStyles = StyleSheet.create({
  missionTight: {
    marginBottom: 20,
  },
  card: {
    marginBottom: 14,
  },
  accordionShell: {
    borderWidth: 1,
    borderColor: '#e2e6ea',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fafbfc',
  },
  trigger: {
    backgroundColor: '#fafbfc',
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderLeftWidth: 3,
    borderLeftColor: 'transparent',
  },
  triggerExpanded: {
    backgroundColor: '#fff9e9',
    borderLeftColor: '#f7b731',
  },
  triggerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  triggerTitle: {
    flex: 1,
    paddingRight: 12,
    fontSize: 17,
    fontWeight: '600',
    color: '#1e3a5f',
    fontFamily: 'System',
  },
  triggerTitleExpanded: {
    fontWeight: '700',
    color: '#0d1f33',
  },
  body: {
    borderTopWidth: 1,
    borderTopColor: '#e2e6ea',
    paddingHorizontal: 14,
    paddingBottom: 0,
    paddingTop: 0,
    backgroundColor: '#fff',
  },
});
