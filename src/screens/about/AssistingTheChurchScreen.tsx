import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const BLUE = '#1e3a5f';
const H_PADDING = 28;
/** Inline iframe embeds in WebViews often return YouTube 152/153; open the watch page in full-screen WebView instead. */
const ASSISTING_YOUTUBE_VIDEO_ID = 'pnH7M_iX8dg';
const ASSISTING_YOUTUBE_WATCH_URL = `https://www.youtube.com/watch?v=${ASSISTING_YOUTUBE_VIDEO_ID}`;
const ASSISTING_YOUTUBE_THUMB_URI = `https://img.youtube.com/vi/${ASSISTING_YOUTUBE_VIDEO_ID}/hqdefault.jpg`;
const ASSISTING_YOUTUBE_TITLE = 'Pastor JD Davis of Dublin Baptist Church, OH';

const LIGHT_BLUE_CTA = '#5EB0E8';
const TESTIMONIAL_NAVY = '#003366';
const TESTIMONIAL_BODY = '#4A6076';

const TITLE_SOURCE = require('../../../assets/assisting_church/title.png');
const titleResolved = Image.resolveAssetSource(TITLE_SOURCE);
const TITLE_ASPECT =
  titleResolved?.width && titleResolved?.height
    ? titleResolved.width / titleResolved.height
    : 2;

const WHO1_SOURCE = require('../../../assets/assisting_church/who1.png');
const who1Resolved = Image.resolveAssetSource(WHO1_SOURCE);
const WHO1_ASPECT =
  who1Resolved?.width && who1Resolved?.height
    ? who1Resolved.width / who1Resolved.height
    : 1;

const WHAT1_SOURCE = require('../../../assets/assisting_church/what1.png');
const what1Resolved = Image.resolveAssetSource(WHAT1_SOURCE);
const WHAT1_ASPECT =
  what1Resolved?.width && what1Resolved?.height
    ? what1Resolved.width / what1Resolved.height
    : 1;

/** Order: Who we are, What we do, Why we do it */
const DROPDOWN_SOURCES = [
  require('../../../assets/assisting_church/who.png'),
  require('../../../assets/assisting_church/what.png'),
  require('../../../assets/assisting_church/why.png'),
] as const;

function aspectRatioForSource(source: number) {
  const r = Image.resolveAssetSource(source);
  if (!r?.width || !r?.height) return 1;
  return r.width / r.height;
}

const DROPDOWN_ITEMS = DROPDOWN_SOURCES.map((src) => ({
  src,
  aspectRatio: aspectRatioForSource(src),
}));

/** Title: full device width with height capped so it fits; prioritizes filling horizontal space. */
function useTitleSize(screenW: number, screenH: number) {
  return useMemo(() => {
    const maxW = screenW;
    const maxH = screenH * 0.38;
    let w = maxW;
    let h = w / TITLE_ASPECT;
    if (h > maxH) {
      h = maxH;
      w = h * TITLE_ASPECT;
    }
    return { width: w, height: h };
  }, [screenW, screenH]);
}

/** Dropdown header image size: long row, capped so three + mission fit on typical phones. */
function dropdownImageSize(
  screenW: number,
  screenH: number,
  imageAspect: number
): { width: number; height: number } {
  const chevronGutter = 40;
  const rowInnerW = screenW - 2 * H_PADDING - chevronGutter;
  const maxH = Math.min(128, Math.max(96, screenH * 0.14));
  let h = rowInnerW / imageAspect;
  if (h > maxH) h = maxH;
  let w = h * imageAspect;
  if (w > rowInnerW) {
    w = rowInnerW;
    h = w / imageAspect;
  }
  return { width: w, height: h };
}

function who1IllustrationSize(contentW: number) {
  return {
    width: contentW,
    height: contentW / WHO1_ASPECT,
  };
}

function what1IllustrationSize(contentW: number) {
  return {
    width: contentW,
    height: contentW / WHAT1_ASPECT,
  };
}

function WhatWeDoPanel({ what1Size }: { what1Size: { width: number; height: number } }) {
  return (
    <View style={whatStyles.panel}>
      <Text style={whatStyles.subhead}>WE . . .</Text>

      <Text style={whatStyles.bulletBlock}>
        <Text style={whatStyles.bullet}>• </Text>
        <Text style={whatStyles.leadBold}>Train believers</Text>
        <Text style={whatStyles.bodyBlue}>
          —Using a proven method of instruction including role play, we conduct a basic session on how to use a Scripture tract to present the Gospel.
        </Text>
      </Text>

      <Text style={[whatStyles.bulletBlock, whatStyles.bulletTight]}>
        <Text style={whatStyles.bullet}>• </Text>
        <Text style={whatStyles.leadBold}>Take believers</Text>
        <Text style={whatStyles.bodyBlue}>
          —We immediately immerse them in evangelism by taking them into prisons, jails, juvenile facilities, and shelters where they are:
        </Text>
      </Text>

      <Image
        source={WHAT1_SOURCE}
        style={[whatStyles.whatIllustration, { width: what1Size.width, height: what1Size.height }]}
        resizeMode="contain"
      />

      <Text style={[whatStyles.subhead, whatStyles.subheadGOD]}>GOD . . .</Text>

      <Text style={whatStyles.bulletBlock}>
        <Text style={whatStyles.bullet}>• </Text>
        <Text style={whatStyles.leadBold}>Transforms believers</Text>
        <Text style={whatStyles.bodyBlue}>
          {' '}
          as they witness the life-changing power of the Holy Spirit.
        </Text>
      </Text>

      <Text style={whatStyles.bulletBlock}>
        <Text style={whatStyles.bullet}>• </Text>
        <Text style={whatStyles.leadBold}>Transforms churches</Text>
        <Text style={whatStyles.bodyBlue}>
          {' '}
          as ignited believers begin to reach their own cities with the message of the Gospel.
        </Text>
      </Text>
    </View>
  );
}

const whatStyles = StyleSheet.create({
  panel: {
    width: '100%',
    paddingTop: 4,
  },
  whatIllustration: {
    alignSelf: 'center',
    marginBottom: 8,
    marginTop: 4,
  },
  subhead: {
    color: '#2E6EAD',
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'System',
  },
  subheadGOD: {
    marginTop: 22,
    marginBottom: 10,
  },
  bulletBlock: {
    fontSize: 15,
    lineHeight: 23,
    marginBottom: 12,
    fontFamily: 'System',
  },
  bulletTight: {
    marginBottom: 8,
  },
  bullet: {
    color: BLUE,
    fontWeight: 'bold',
  },
  leadBold: {
    color: '#1a202c',
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 23,
  },
  bodyBlue: {
    color: '#4A6FA8',
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 23,
  },
});

/** Lime/olive section titles, navy labels, dark gray body — matches Why reference */
const WHY_GREEN = '#6B8E3D';
const WHY_BODY = '#333333';

function WhyWeDoPanel() {
  return (
    <View style={whyStyles.panel}>
      <Text style={whyStyles.sectionTitle}>Biblical Basis</Text>

      <Text style={whyStyles.bulletBlock}>
        <Text style={whyStyles.bullet}>• </Text>
        <Text style={whyStyles.labelBold}>Obedience: </Text>
        <Text style={whyStyles.bodyText}>
          {`And he said to them, "Go into all the world and proclaim the Gospel to the whole creation." Mark 16:15`}
        </Text>
      </Text>

      <Text style={whyStyles.bulletBlock}>
        <Text style={whyStyles.bullet}>• </Text>
        <Text style={whyStyles.labelBold}>Discipleship: </Text>
        <Text style={whyStyles.bodyText}>
          {`"Go therefore and make disciples of all nations, baptizing them in the name of the Father and of the Son, and of the Holy Spirit, teaching them to observe all that I have commanded you" Matthew 28:19-20`}
        </Text>
      </Text>

      <Text style={[whyStyles.sectionTitle, whyStyles.sectionTitleSecond]}>Practical Basis</Text>

      <Text style={whyStyles.bulletBlock}>
        <Text style={whyStyles.bullet}>• </Text>
        <Text style={whyStyles.labelBold}>A changed heart results in a changed behavior: </Text>
        <Text style={whyStyles.bodyText}>
          85% of those presently incarcerated will at some point be released.
        </Text>
      </Text>

      <Text style={whyStyles.bulletBlock}>
        <Text style={whyStyles.bullet}>• </Text>
        <Text style={whyStyles.labelBold}>Reduction in recidivism rate among offenders: </Text>
        <Text style={whyStyles.bodyText}>
          Texas recidivism rates have fallen over 40% as a result of faith-based ministry involvement according to
          Vance Drum, former Head of Chaplaincy for the Texas Department of Criminal Justice.
        </Text>
      </Text>

      <Text style={whyStyles.bulletBlock}>
        <Text style={whyStyles.bullet}>• </Text>
        <Text style={whyStyles.labelBold}>
          Over 80% of church growth is transfer growth as opposed to new converts to Christianity:
        </Text>
        <Text style={whyStyles.bodyText}>
          {' '}
          A trained and ignited believer can reach many new people with the Gospel, infusing churches with new life.
        </Text>
      </Text>
    </View>
  );
}

const whyStyles = StyleSheet.create({
  panel: {
    width: '100%',
    paddingTop: 4,
  },
  sectionTitle: {
    color: WHY_GREEN,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    fontFamily: 'System',
  },
  sectionTitleSecond: {
    marginTop: 20,
  },
  bulletBlock: {
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 14,
    fontFamily: 'System',
  },
  bullet: {
    color: BLUE,
    fontWeight: 'bold',
  },
  labelBold: {
    color: BLUE,
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 24,
  },
  bodyText: {
    color: WHY_BODY,
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 24,
  },
});

export default function AssistingTheChurchScreen() {
  const navigation = useNavigation<any>();
  const { width: screenW, height: screenH } = useWindowDimensions();
  const titleSize = useTitleSize(screenW, screenH);

  const [openWho, setOpenWho] = useState(false);
  const [openWhat, setOpenWhat] = useState(false);
  const [openWhy, setOpenWhy] = useState(false);

  const toggles = [
    () => setOpenWho((v) => !v),
    () => setOpenWhat((v) => !v),
    () => setOpenWhy((v) => !v),
  ] as const;
  const openStates = [openWho, openWhat, openWhy];

  const missionHeaderSize = screenH < 700 ? 19 : 21;
  const missionBodySize = screenH < 700 ? 14 : 15;
  const missionLineHeight = missionBodySize + 8;

  const contentW = screenW - 2 * H_PADDING;
  const who1Size = who1IllustrationSize(contentW);
  const what1Size = what1IllustrationSize(contentW);
  const videoThumbHeight = (contentW * 9) / 16;

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.container}
      contentInsetAdjustmentBehavior="never"
    >
      <Image
        source={TITLE_SOURCE}
        style={[
          styles.titleImage,
          { width: titleSize.width, height: titleSize.height },
        ]}
        resizeMode="contain"
      />

      <Text style={[styles.missionHeader, { fontSize: missionHeaderSize }]}>Our Mission</Text>
      <Text
        style={[
          styles.missionBody,
          { fontSize: missionBodySize, lineHeight: missionLineHeight },
        ]}
      >
        {`To assist the church by equipping and igniting Christians to share their faith in Jesus Christ with the "least of these."`}
      </Text>

      <View style={styles.sectionGap} />

      {DROPDOWN_ITEMS.map((item, idx) => {
        const img = dropdownImageSize(screenW, screenH, item.aspectRatio);
        return (
          <View key={idx} style={[styles.dropdownOuter, idx > 0 && styles.dropdownGapAbove]}>
            <TouchableOpacity
              style={[styles.dropdownRow, { minHeight: img.height + 8 }]}
              onPress={toggles[idx]}
              activeOpacity={0.75}
              accessibilityRole="button"
              accessibilityState={{ expanded: openStates[idx] }}
            >
              <View style={styles.dropdownImageWrap}>
                <Image
                  source={item.src}
                  style={{ width: img.width, height: img.height }}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.chevronWrap}>
                <Ionicons
                  name={openStates[idx] ? 'chevron-up' : 'chevron-down'}
                  size={32}
                  color={BLUE}
                />
              </View>
            </TouchableOpacity>
            {openStates[idx] && idx === 0 && (
              <View style={styles.dropdownPanel}>
                <Text style={styles.whoBody}>
                  Founded in 1969, the ministry focus of{' '}
                  <Text style={styles.whoBodyBold}>Bill Glass Behind the Walls</Text>
                  {
                    ' has always been evangelism. Our mission is to come alongside local churches to reinforce evangelism training with their congregation and then take them behind the walls of correctional facilities across the country to share the Good News of the Gospel with the "least of these". Those equipped individuals will return home with a renewed desire to serve the church and newfound confidence to boldly share the Good News at home, at work, in their communities, and beyond.'
                  }
                </Text>
                <Image
                  source={WHO1_SOURCE}
                  style={[
                    styles.whoIllustration,
                    { width: who1Size.width, height: who1Size.height },
                  ]}
                  resizeMode="contain"
                />
              </View>
            )}
            {openStates[idx] && idx === 1 && (
              <View style={styles.dropdownPanel}>
                <WhatWeDoPanel what1Size={what1Size} />
              </View>
            )}
            {openStates[idx] && idx === 2 && (
              <View style={styles.dropdownPanel}>
                <WhyWeDoPanel />
              </View>
            )}
          </View>
        );
      })}

      <View style={styles.footerBlock}>
        <TouchableOpacity
          style={[styles.videoCard, { width: contentW }]}
          onPress={() =>
            navigation.navigate('Event WebView', {
              url: ASSISTING_YOUTUBE_WATCH_URL,
              title: ASSISTING_YOUTUBE_TITLE,
            })
          }
          activeOpacity={0.9}
          accessibilityRole="button"
          accessibilityLabel={`Watch video: ${ASSISTING_YOUTUBE_TITLE}`}
        >
          <Image
            source={{ uri: ASSISTING_YOUTUBE_THUMB_URI }}
            style={{ width: contentW, height: videoThumbHeight }}
            resizeMode="cover"
          />
          <View style={styles.videoPlayOverlay}>
            <Ionicons name="play-circle" size={72} color="rgba(255,255,255,0.95)" />
          </View>
        </TouchableOpacity>
        <Text style={styles.videoHint}>Tap to watch on YouTube</Text>

        <View style={styles.testimonialWrap}>
          <Text style={styles.testimonialHeading}>
            Pastor JD Davis of Dublin, OH, on the Effectiveness of Bill Glass Behind the Walls Events
          </Text>
          <Text style={styles.testimonialBody}>
            {'\u2018As far as Dublin Baptist Church is concerned, you helped train several of the members to share their faith, not just in prisons, but on Sunday mornings and wherever life carries them.\u2019'}
          </Text>
          <Text style={[styles.testimonialBody, styles.testimonialBodySecond]}>
            {`\u201c...it\u2019s more than just a one day event. It\u2019s more than just training some people, sending them to prison and calling it done. It really does equip your people to share their faith and in that environment, it is set up to be so easy for them to share their faith. For some of them they may have never done that before. But they take that first step and they lead someone to Jesus and they find out they can do this and suddenly they do want to do more. They do want to show up and serve in other areas because they begin to believe, \u2018You know what? I can do this!\u2019\u201d`}
          </Text>
        </View>

        <View style={styles.ctaRow}>
          <TouchableOpacity
            style={styles.ctaButton}
            onPress={() => navigation.navigate('Events')}
            activeOpacity={0.85}
          >
            <Text style={styles.ctaButtonText}>Event Calendar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.ctaButton}
            onPress={() => navigation.navigate('Ways to Give')}
            activeOpacity={0.85}
          >
            <Text style={styles.ctaButtonText}>Support Us</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    paddingTop: 0,
    paddingHorizontal: H_PADDING,
    paddingBottom: 32,
    backgroundColor: '#fff',
    alignItems: 'center',
    flexGrow: 1,
  },
  titleImage: {
    marginTop: 0,
    marginBottom: 10,
    marginHorizontal: -H_PADDING,
    alignSelf: 'center',
  },
  missionHeader: {
    color: BLUE,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'System',
  },
  missionBody: {
    color: BLUE,
    fontWeight: 'normal',
    textAlign: 'center',
    paddingHorizontal: 2,
    fontFamily: 'System',
  },
  sectionGap: {
    height: 16,
    width: '100%',
  },
  dropdownOuter: {
    width: '100%',
  },
  dropdownGapAbove: {
    marginTop: 12,
  },
  dropdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  dropdownImageWrap: {
    flex: 1,
    minWidth: 0,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  chevronWrap: {
    paddingLeft: 6,
    justifyContent: 'center',
  },
  dropdownPanel: {
    width: '100%',
    paddingTop: 12,
  },
  whoBody: {
    color: '#222',
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'System',
    marginBottom: 14,
  },
  whoBodyBold: {
    fontWeight: 'bold',
    color: '#222',
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'System',
  },
  whoIllustration: {
    alignSelf: 'center',
  },
  footerBlock: {
    width: '100%',
    marginTop: 28,
    alignItems: 'center',
    paddingBottom: 8,
  },
  videoCard: {
    alignSelf: 'center',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  videoPlayOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoHint: {
    marginTop: 8,
    fontSize: 13,
    color: '#718096',
    textAlign: 'center',
    fontFamily: 'System',
  },
  testimonialWrap: {
    width: '100%',
    marginTop: 22,
    alignSelf: 'stretch',
  },
  testimonialHeading: {
    color: TESTIMONIAL_NAVY,
    fontSize: 17,
    fontWeight: 'bold',
    lineHeight: 24,
    marginBottom: 14,
    textAlign: 'left',
    fontFamily: 'System',
  },
  testimonialBody: {
    color: TESTIMONIAL_BODY,
    fontSize: 15,
    lineHeight: 24,
    fontWeight: '400',
    textAlign: 'left',
    fontFamily: 'System',
  },
  testimonialBodySecond: {
    marginTop: 16,
    marginBottom: 6,
  },
  ctaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 14,
    marginTop: 22,
    width: '100%',
  },
  ctaButton: {
    backgroundColor: LIGHT_BLUE_CTA,
    paddingVertical: 14,
    paddingHorizontal: 22,
    borderRadius: 8,
    minWidth: 148,
    alignItems: 'center',
  },
  ctaButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'System',
  },
});
