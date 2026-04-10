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
  Linking,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Video, ResizeMode } from 'expo-av';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { styles as themeStyles } from '../../styles/styles';
import type { RootStackParamList } from '../../navigation/AppNavigator';

const INTRO =
  'Discover what a Bill Glass Behind the Walls Evangelism Event looks like, get registered, and then get equipped! Below you will find information on what we do, the materials we use, the rules we abide by, and an encouraging set of videos about evangelism in every day life.';

const SECTIONS = [
  'Experience Behind the Walls Evangelism',
  'The What Do You Think? Tract',
  "Do's and Don'ts - Rules when in a Facility",
  'Teammate Packet',
  'Event Preparation: A Nuts and Bolts Look at Evangelism Course on RightNow Media',
  'How NOT to Share your Faith',
  'The Event is Over - Now What?',
] as const;

const SECTION_PLACEHOLDER =
  'Add your content for this section (text, video links, downloads, etc.). This is placeholder copy you can replace.';

/** Local file or `{ uri: 'https://...mp4' }` — replace if you use a different video for this section. */
const EXPERIENCE_BEHIND_THE_WALLS_VIDEO_SOURCE = require('../../../assets/equipping_volunteers/behindthewalls_promo.mp4');
const TEAMMATE_PACKET_IMAGE_SOURCE = require('../../../assets/equipping_volunteers/tpacket.png');
const EVENT_PREP_IMAGE_SOURCE = require('../../../assets/equipping_volunteers/eventprep.png');
const ACTION_STEPS_IMAGE_SOURCE = require('../../../assets/cards/actionsteps.png');

const EXPERIENCE_PARA_1 =
  "Here's a quick taste of what it's like to experience a Behind the Walls Evangelism Training and Evangelism Event!";

const EXPERIENCE_PARA_2 =
  "Powerful speakers, fantastic entertainers, athletes, NASCARS, motorcycles...warm up the audience, and then God's church steps in to share Jesus Christ.";

const WDYT_TRACT_PDF_URL =
  'https://irp.cdn-website.com/cb495078/files/uploaded/English_WDYT_Tract_2023.pdf';

const WDYT_TRACT_TRAINING_VIMEO_URL =
  'https://player.vimeo.com/97e50737-4a0f-4f20-aea6-2e51898e4450';

const DOS_DONTS_PDF_URL =
  'https://irp.cdn-website.com/cb495078/files/uploaded/Do-s%20and%20Don-ts%20Teammates%20and%20Bikers.pdf';

const DOS_DONTS_VIMEO_URL = 'https://player.vimeo.com/video/159391239';
const TEAMMATE_PACKET_PDF_URL =
  'https://irp.cdn-website.com/cb495078/files/uploaded/2025_TM_Packet_Content_-_5-14-2025.pdf';
const RIGHTNOW_COURSE_URL = 'https://www.rightnowmediaatwork.org/Training/Course/View/133972';
const RIGHTNOW_INVITE_URL = 'http://www.rightnowmediaatwork.org/Account/Invite/billglass';
const HOW_NOT_TO_SHARE_VIMEO_URL = 'https://player.vimeo.com/video/848830532';

function openTractPdf() {
  void Linking.openURL(WDYT_TRACT_PDF_URL);
}

function openTractVimeoInBrowser() {
  void Linking.openURL(WDYT_TRACT_TRAINING_VIMEO_URL);
}

function openDosDontsPdf() {
  void Linking.openURL(DOS_DONTS_PDF_URL);
}

function openDosDontsVideoInBrowser() {
  void Linking.openURL(DOS_DONTS_VIMEO_URL);
}

function openTeammatePacketPdf() {
  void Linking.openURL(TEAMMATE_PACKET_PDF_URL);
}

function openRightNowCourse() {
  void Linking.openURL(RIGHTNOW_COURSE_URL);
}

function openRightNowInvite() {
  void Linking.openURL(RIGHTNOW_INVITE_URL);
}

function openHowNotToShareVideoInBrowser() {
  void Linking.openURL(HOW_NOT_TO_SHARE_VIMEO_URL);
}

function WhatDoYouThinkTractBody() {
  return (
    <View>
      <Text style={styles.sectionPara}>
        The What Do You Think? tract is the main tool you will be using on the event. The better you know it before
        the event the easier it will be to use it on the event.{' '}
        <Text style={styles.inlineLink} onPress={openTractPdf} accessibilityRole="link">
          Click here
        </Text>
        {
          ' to download an electronic copy here and familiarize yourself with it. Tap below to open the Tract Training Overview in your browser and follow along!'
        }
      </Text>
      <TouchableOpacity
        style={styles.watchVideoButton}
        onPress={openTractVimeoInBrowser}
        activeOpacity={0.85}
        accessibilityRole="button"
        accessibilityLabel="Open Tract Training Overview video in browser"
      >
        <Ionicons name="open-outline" size={26} color="#fff" />
        <View style={styles.watchVideoTextCol}>
          <Text style={styles.watchVideoTitle}>Tract Training Overview video</Text>
          <Text style={styles.watchVideoSub}>Opens in your browser</Text>
        </View>
        <Ionicons name="chevron-forward" size={22} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

function DosDontsBody() {
  return (
    <View>
      <Text style={styles.sectionPara}>
        This document is your one-stop shop to learn all the things you need to do and not do inside correctional
        facilities.{' '}
        <Text style={styles.inlineLink} onPress={openDosDontsPdf} accessibilityRole="link">
          Click here
        </Text>
        {' to read and download the "Do\'s & Don\'ts." Watch the Do\'s and Don\'t\'s video here:'}
      </Text>
      <TouchableOpacity
        style={styles.watchVideoButton}
        onPress={openDosDontsVideoInBrowser}
        activeOpacity={0.85}
        accessibilityRole="button"
        accessibilityLabel="Open Do's and Don'ts video in browser"
      >
        <Ionicons name="open-outline" size={26} color="#fff" />
        <View style={styles.watchVideoTextCol}>
          <Text style={styles.watchVideoTitle}>Do&apos;s and Don&apos;ts video</Text>
          <Text style={styles.watchVideoSub}>Opens in your browser</Text>
        </View>
        <Ionicons name="chevron-forward" size={22} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

function TeammatePacketBody() {
  return (
    <View>
      <Text style={styles.sectionPara}>
        The Teammate Packet is an envelope of materials you&apos;ll receive at Equip & Ignite and that you&apos;ll
        take with you into the facility. It contains our effective tract and other materials to help you share with
        offenders.{' '}
        <Text style={styles.inlineLink} onPress={openTeammatePacketPdf} accessibilityRole="link">
          Click here
        </Text>
        {
          ' to download and review a summary of the documents in the Teammate Packet.'
        }
      </Text>
      <TouchableOpacity
        onPress={openTeammatePacketPdf}
        activeOpacity={0.85}
        style={styles.packetImageLink}
        accessibilityRole="button"
        accessibilityLabel="Open Teammate Packet PDF"
      >
        <Image source={TEAMMATE_PACKET_IMAGE_SOURCE} style={styles.packetImage} resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
}

function EventPreparationBody() {
  return (
    <View>
      <Text style={styles.sectionPara}>
        As a free gift to you, Bill Glass has provided a RightNow Media account for you. In preparation for the
        upcoming event, please go to the RightNow site and go through the A Nuts and Bolts Look at Evangelism by
        Steve Stroope by clicking on the image below. Please watch all 3 videos and answer the questions accompanying
        each video. If you did not receive an invitation for RightNow Media,{' '}
        <Text style={styles.inlineLink} onPress={openRightNowInvite} accessibilityRole="link">
          click here
        </Text>{' '}
        to go to RightNow&apos;s website and setup an account.
      </Text>
      <TouchableOpacity
        onPress={openRightNowCourse}
        activeOpacity={0.85}
        style={styles.packetImageLink}
        accessibilityRole="button"
        accessibilityLabel="Open RightNow Media course"
      >
        <Image source={EVENT_PREP_IMAGE_SOURCE} style={styles.packetImage} resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
}

function HowNotToShareBody() {
  return (
    <View>
      <Text style={styles.sectionPara}>
        There are right ways and wrong ways to share the Gospel. Here are some WRONG ways to do it!
      </Text>
      <TouchableOpacity
        style={styles.watchVideoButton}
        onPress={openHowNotToShareVideoInBrowser}
        activeOpacity={0.85}
        accessibilityRole="button"
        accessibilityLabel="Open How NOT to Share your Faith video in browser"
      >
        <Ionicons name="open-outline" size={26} color="#fff" />
        <View style={styles.watchVideoTextCol}>
          <Text style={styles.watchVideoTitle}>How NOT to Share your Faith video</Text>
          <Text style={styles.watchVideoSub}>Opens in your browser</Text>
        </View>
        <Ionicons name="chevron-forward" size={22} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

function EventIsOverBody() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View>
      <Text style={styles.sectionPara}>
        You’ve just experienced an amazing adventure by joining in a Bill Glass Behind the Walls event. Thank you
        for stepping out to take the Good News to the broken and hurting! If the day went as they typically do on
        these events, you saw God work and your heart has been awakened to the power of the Holy Spirit. If you
        didn’t have the opportunity to see someone commit their lives to Christ, know that your faithfulness,
        presence, and prayers were used to plant and water seeds. We know that God will continue to work!
      </Text>
      <Text style={[styles.sectionPara, styles.sectionParaSpaced]}>
        This experience doesn’t stop there. You are meant to take it with you! So the question is how will you use
        what you learned today?{' '}
        <Text
          style={styles.inlineLink}
          onPress={() => navigation.navigate('Action Steps')}
          accessibilityRole="link"
        >
          Click here
        </Text>{' '}
        to view the infographic.
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Action Steps')}
        activeOpacity={0.9}
        style={styles.packetImageLink}
        accessibilityRole="button"
        accessibilityLabel="Open Action Steps infographic page"
      >
        <Image source={ACTION_STEPS_IMAGE_SOURCE} style={styles.packetImage} resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
}

function ExperienceBehindTheWallsBody() {
  return (
    <View>
      <Text style={styles.sectionPara}>{EXPERIENCE_PARA_1}</Text>
      <Text style={[styles.sectionPara, styles.sectionParaSpaced]}>{EXPERIENCE_PARA_2}</Text>
      <View style={styles.videoWrap}>
        <Video
          source={EXPERIENCE_BEHIND_THE_WALLS_VIDEO_SOURCE}
          style={styles.video}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          shouldPlay={false}
        />
      </View>
    </View>
  );
}

function SectionBody({ index }: { index: number }) {
  switch (index) {
    case 0:
      return <ExperienceBehindTheWallsBody />;
    case 1:
      return <WhatDoYouThinkTractBody />;
    case 2:
      return <DosDontsBody />;
    case 3:
      return <TeammatePacketBody />;
    case 4:
      return <EventPreparationBody />;
    case 5:
      return <HowNotToShareBody />;
    case 6:
      return <EventIsOverBody />;
    default:
      return <Text style={styles.accordionBodyText}>{SECTION_PLACEHOLDER}</Text>;
  }
}

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const NAVY = '#1e3a5f';

export default function EquippingVolunteersScreen() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = useCallback((index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  return (
    <ScrollView style={themeStyles.container} contentContainerStyle={styles.scrollContent}>
      <View style={themeStyles.mainContentContainer}>
        <View style={[themeStyles.missionSection, styles.titleSection]}>
          <View style={themeStyles.eventScreenTitleBlock}>
            <Text style={[themeStyles.missionTitle, themeStyles.eventScreenMissionTitle]}>Equipping Volunteers</Text>
            <View style={themeStyles.yellowBar} />
          </View>
          <Text style={styles.readyHeader}>Get ready to serve!</Text>
        </View>

        <Text style={styles.intro}>{INTRO}</Text>

        {SECTIONS.map((title, index) => {
          const isOpen = openIndex === index;
          return (
            <View key={title} style={styles.card}>
              <View style={styles.accordionShell}>
                <TouchableOpacity
                  style={[styles.trigger, isOpen && styles.triggerExpanded]}
                  onPress={() => toggle(index)}
                  activeOpacity={0.75}
                  accessibilityRole="button"
                  accessibilityState={{ expanded: isOpen }}
                  accessibilityLabel={title}
                >
                  <View style={styles.triggerRow}>
                    <Text style={[styles.triggerTitle, isOpen && styles.triggerTitleExpanded]}>{title}</Text>
                    <Ionicons
                      name={isOpen ? 'chevron-up' : 'chevron-down'}
                      size={22}
                      color={isOpen ? '#f7b731' : NAVY}
                    />
                  </View>
                </TouchableOpacity>

                {isOpen ? (
                  <View style={styles.accordionBody}>
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

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 32,
  },
  titleSection: {
    marginBottom: 22,
  },
  readyHeader: {
    marginTop: 14,
    fontSize: 26,
    fontWeight: '700',
    color: NAVY,
    textAlign: 'center',
    fontFamily: 'System',
  },
  intro: {
    fontSize: 16,
    color: '#555555',
    lineHeight: 28,
    marginBottom: 22,
    textAlign: 'left',
    fontFamily: 'System',
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
    fontSize: 16,
    fontWeight: '600',
    color: NAVY,
    fontFamily: 'System',
  },
  triggerTitleExpanded: {
    fontWeight: '700',
    color: '#0d1f33',
  },
  accordionBody: {
    borderTopWidth: 1,
    borderTopColor: '#e2e6ea',
    paddingHorizontal: 14,
    paddingVertical: 16,
    backgroundColor: '#fff',
  },
  accordionBodyText: {
    fontSize: 16,
    color: '#4b5563',
    lineHeight: 24,
    fontFamily: 'System',
  },
  sectionPara: {
    fontSize: 16,
    color: '#4b5563',
    lineHeight: 24,
    fontFamily: 'System',
  },
  sectionParaSpaced: {
    marginTop: 14,
    marginBottom: 16,
  },
  videoWrap: {
    width: '100%',
    height: 220,
    backgroundColor: '#000',
    borderRadius: 8,
    overflow: 'hidden',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  inlineLink: {
    color: NAVY,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  watchVideoButton: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: NAVY,
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 14,
    gap: 12,
  },
  watchVideoTextCol: {
    flex: 1,
  },
  watchVideoTitle: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
    fontFamily: 'System',
  },
  watchVideoSub: {
    marginTop: 4,
    color: 'rgba(255,255,255,0.85)',
    fontSize: 13,
    fontFamily: 'System',
  },
  packetImageLink: {
    marginTop: 16,
    alignItems: 'center',
  },
  packetImage: {
    width: '100%',
    height: 220,
    borderRadius: 8,
  },
});
