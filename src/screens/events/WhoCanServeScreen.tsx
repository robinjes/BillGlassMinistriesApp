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
import type { RootStackParamList } from '../../navigation/AppNavigator';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const OPENING_BODY =
  'Bill Glass Ministries strives to make doing ministry under the Bill Glass Behind the Walls banner as open and available as possible. Anyone who agrees with our Statement of Faith can serve on a Bill Glass Behind the Walls event! There are certain rules to abide by when it comes to going behind the walls.';

const BULLETS = [
  'Men and women over the age of 21 are welcome to serve in juvenile units unless otherwise noted.',
  'Men over the age of 18 are allowed to serve in men\'s units',
  'Women over the age of 18 are allowed to serve in wwomen\'s units',
  'Men over the age of 18 are allowed to serve in women\'s units if one of the following criteria is met:',
  'Women over the age of 18 are allowed to serve in men\'s units if one of the following criteria is met:',
] as const;

const SUB_BULLETS_4 = [
  'He is paired with and serves alongside his wife',
  'He is paired with and serves alongside a female family member (sister, mom, daughter, etc.)',
  'If not married, he is paired with and serves alongside an unmarried woman',
] as const;

const SUB_BULLETS_5 = [
  'She is paired with and serves alongside her husband',
  'She is paired with and serves alongside a male family member (brother, father, son, etc.)',
  'If not married, she is paired with and serves alongside an unmarried man',
] as const;

const CLOSING_1_BEFORE =
  'While we hope all events are open to all Teammates, it does not always workout that everyone will be able to go behind the walls. We do have opportunities to serve in the preparation and execution of events by serving on the Local Team. If you are interested in being a part of a Local Team, ';

const CLOSING_1_AFTER = ' and your Regional Director will contact you.';

const FILLER_CLOSING_2 =
  "Please note: Each facility has its own standards and may not match the ones above. The details for each event will be posted on the event's page.";

const MAIN_SECTION_TRIGGER_LABEL =
  'Here are the usual guidelines for the facilities:';

export default function WhoCanServeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [mainOpen, setMainOpen] = useState(false);
  const [openSub4, setOpenSub4] = useState(false);
  const [openSub5, setOpenSub5] = useState(false);

  const animate = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, []);

  const toggleMain = useCallback(() => {
    animate();
    setMainOpen((v) => !v);
  }, [animate]);

  const toggleSub4 = useCallback(() => {
    animate();
    setOpenSub4((v) => !v);
  }, [animate]);

  const toggleSub5 = useCallback(() => {
    animate();
    setOpenSub5((v) => !v);
  }, [animate]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.mainContentContainer}>
        <View style={[styles.missionSection, localStyles.missionTight]}>
          <View style={styles.eventScreenTitleBlock}>
            <Text style={[styles.missionTitle, styles.eventScreenMissionTitle]}>
              Who Can Serve on a Bill Glass Behind the Walls Event?
            </Text>
            <View style={styles.yellowBar} />
          </View>
        </View>

        <Text style={styles.bodyText}>{OPENING_BODY}</Text>

        <View style={localStyles.card}>
          <View style={localStyles.accordionShell}>
            <TouchableOpacity
              style={[localStyles.trigger, mainOpen && localStyles.triggerExpanded]}
              onPress={toggleMain}
              activeOpacity={0.75}
              accessibilityRole="button"
              accessibilityState={{ expanded: mainOpen }}
              accessibilityLabel={MAIN_SECTION_TRIGGER_LABEL}
            >
              <View style={localStyles.triggerRow}>
                <Text style={[localStyles.triggerTitle, mainOpen && localStyles.triggerTitleExpanded]}>
                  {MAIN_SECTION_TRIGGER_LABEL}
                </Text>
                <Ionicons
                  name={mainOpen ? 'chevron-up' : 'chevron-down'}
                  size={22}
                  color={mainOpen ? '#f7b731' : '#1e3a5f'}
                />
              </View>
            </TouchableOpacity>

            {mainOpen ? (
              <View style={localStyles.body}>
                <View style={localStyles.innerPad}>
                  {BULLETS.map((text, i) => {
                    const n = i + 1;
                    if (n === 4) {
                      return (
                        <View key={n} style={localStyles.bulletBlock}>
                          <TouchableOpacity
                            style={localStyles.nestedBulletRow}
                            onPress={toggleSub4}
                            activeOpacity={0.75}
                            accessibilityRole="button"
                            accessibilityState={{ expanded: openSub4 }}
                          >
                            <Text style={localStyles.bulletMark}>{'\u2022'}</Text>
                            <Text style={localStyles.bulletText}>{text}</Text>
                            <Ionicons
                              name={openSub4 ? 'chevron-up' : 'chevron-down'}
                              size={20}
                              color="#1e3a5f"
                            />
                          </TouchableOpacity>
                          {openSub4 ? (
                            <View style={localStyles.subList}>
                              {SUB_BULLETS_4.map((sub, j) => (
                                <View key={j} style={localStyles.subBulletRow}>
                                  <Text style={localStyles.subBulletMark}>{'\u25E6'}</Text>
                                  <Text style={localStyles.subBulletText}>{sub}</Text>
                                </View>
                              ))}
                            </View>
                          ) : null}
                        </View>
                      );
                    }
                    if (n === 5) {
                      return (
                        <View key={n} style={localStyles.bulletBlock}>
                          <TouchableOpacity
                            style={localStyles.nestedBulletRow}
                            onPress={toggleSub5}
                            activeOpacity={0.75}
                            accessibilityRole="button"
                            accessibilityState={{ expanded: openSub5 }}
                          >
                            <Text style={localStyles.bulletMark}>{'\u2022'}</Text>
                            <Text style={localStyles.bulletText}>{text}</Text>
                            <Ionicons
                              name={openSub5 ? 'chevron-up' : 'chevron-down'}
                              size={20}
                              color="#1e3a5f"
                            />
                          </TouchableOpacity>
                          {openSub5 ? (
                            <View style={localStyles.subList}>
                              {SUB_BULLETS_5.map((sub, j) => (
                                <View key={j} style={localStyles.subBulletRow}>
                                  <Text style={localStyles.subBulletMark}>{'\u25E6'}</Text>
                                  <Text style={localStyles.subBulletText}>{sub}</Text>
                                </View>
                              ))}
                            </View>
                          ) : null}
                        </View>
                      );
                    }
                    return (
                      <View key={n} style={localStyles.bulletRow}>
                        <Text style={localStyles.bulletMark}>{'\u2022'}</Text>
                        <Text style={localStyles.bulletText}>{text}</Text>
                      </View>
                    );
                  })}
                </View>
              </View>
            ) : null}
          </View>
        </View>

        <Text style={styles.bodyText}>
          {CLOSING_1_BEFORE}
          <Text
            style={localStyles.inlineLink}
            onPress={() => navigation.navigate('Join a Local Team')}
            accessibilityRole="link"
            accessibilityLabel="Fill out this form, Join a Local Team"
          >
            fill out this form
          </Text>
          {CLOSING_1_AFTER}
        </Text>
        <Text style={styles.bodyText}>{FILLER_CLOSING_2}</Text>
      </View>
    </ScrollView>
  );
}

const localStyles = StyleSheet.create({
  missionTight: {
    marginBottom: 20,
  },
  card: {
    marginBottom: 20,
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
    backgroundColor: '#fff',
  },
  innerPad: {
    paddingHorizontal: 14,
    paddingTop: 16,
    paddingBottom: 18,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    paddingRight: 4,
  },
  bulletBlock: {
    marginBottom: 8,
  },
  nestedBulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
    paddingVertical: 4,
    paddingRight: 4,
  },
  bulletMark: {
    fontSize: 16,
    color: '#1e3a5f',
    lineHeight: 24,
    width: 22,
    fontFamily: 'System',
  },
  bulletText: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
    fontFamily: 'System',
  },
  subList: {
    marginLeft: 22,
    marginBottom: 8,
    paddingLeft: 8,
    borderLeftWidth: 2,
    borderLeftColor: '#e8ecf0',
  },
  subBulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  subBulletMark: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 22,
    width: 18,
    fontFamily: 'System',
  },
  subBulletText: {
    flex: 1,
    fontSize: 15,
    color: '#4b5563',
    lineHeight: 22,
    fontFamily: 'System',
  },
  inlineLink: {
    color: '#1e3a5f',
    fontSize: 16,
    lineHeight: 28,
    fontWeight: '600',
    textDecorationLine: 'underline',
    fontFamily: 'System',
  },
});
