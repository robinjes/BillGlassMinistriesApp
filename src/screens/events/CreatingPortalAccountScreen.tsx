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
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { styles } from '../../styles/styles';
import { RootStackParamList } from '../../navigation/AppNavigator';

const PORTAL_URL = 'https://app.donorview.com/';
const EMAIL_SUPPORT = 'kitv@behindthewalls.com';
const PORTAL_STEP_IMAGES: Partial<Record<number, any>> = {
  2: require('../../../assets/creating_portal_acc/2.png'),
  4: require('../../../assets/creating_portal_acc/4.png'),
  5: require('../../../assets/creating_portal_acc/5.png'),
};

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function CreatingPortalAccountScreen() {
  const navigation = useNavigation<Nav>();
  const [open, setOpen] = useState<Record<number, boolean>>({});

  const toggle = useCallback((idx: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpen((prev) => ({ ...prev, [idx]: !prev[idx] }));
  }, []);

  const portalSteps = [
    'Go to the Bill Glass Behind the Walls portal by clicking here.',
    'On the portal login screen, click the Sign Up button.',
    'Enter the following information:',
    'Check the \"I’m not a robot\" box and hit Sign Up.',
    'You will receive a confirmation page and an email. Follow the instructions in your email to confirm.',
    'Once you have confirmed your account, you will be able to register for all upcoming events and the registration fee will be waived once we launch the new site.',
  ];

  // Only these steps have dropdowns.
  const dropdownSteps = new Set([2, 3, 4, 5]);

  const renderPortalStepImage = (stepNo: number) => {
    const source = PORTAL_STEP_IMAGES[stepNo];
    if (!source) {
      return (
        <View style={localStyles.imagePlaceholder}>
          <Text style={localStyles.imagePlaceholderText}>Image for portal step {stepNo}</Text>
        </View>
      );
    }
    return <Image source={source} style={localStyles.stepImage} resizeMode="contain" />;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.mainContentContainer}>
        <View style={[styles.missionSection, localStyles.missionTight]}>
          <View style={styles.eventScreenTitleBlock}>
            <Text style={[styles.missionTitle, styles.eventScreenMissionTitle]}>Creating a Portal Account</Text>
            <View style={styles.yellowBar} />
          </View>
        </View>

        <Text style={localStyles.sectionHeader}>How to Create a Portal Account</Text>

        <View style={localStyles.gap} />

        <Text style={localStyles.bodyText}>
          If you are a First Team member, in order to take advantage of the registration fee waiver, you will need to
          create a portal account and login when registering for an event. Here is how to create a portal account:
        </Text>

        <View style={localStyles.gap} />

        {portalSteps.map((stepText, idx) => {
          const stepNo = idx + 1;
          const isOpen = Boolean(open[idx]);
          const hasDropdown = dropdownSteps.has(stepNo);

          return (
            <View key={stepNo} style={localStyles.stepCard}>
              <View style={localStyles.accordionShell}>
                <TouchableOpacity
                  disabled={!hasDropdown}
                  style={localStyles.stepTrigger}
                  onPress={() => hasDropdown && toggle(idx)}
                  activeOpacity={hasDropdown ? 0.75 : 1}
                  accessibilityRole={hasDropdown ? 'button' : undefined}
                  accessibilityState={hasDropdown ? { expanded: isOpen } : undefined}
                  accessibilityLabel={`Portal step ${stepNo}`}
                >
                  <View style={localStyles.stepTriggerTopRow}>
                    <Text style={localStyles.stepLabel}>Step {stepNo}</Text>
                    {hasDropdown ? (
                      <Ionicons name={isOpen ? 'chevron-up' : 'chevron-down'} size={22} color="#1e3a5f" />
                    ) : null}
                  </View>
                  <Text style={localStyles.stepInstructionText}>
                    {stepNo === 1 ? (
                      <>
                        Go to the Bill Glass Behind the Walls portal by{' '}
                        <Text
                          style={localStyles.grayLink}
                          onPress={() =>
                            navigation.navigate('Event WebView', {
                              url: PORTAL_URL,
                              title: 'Bill Glass Portal',
                            })
                          }
                        >
                          clicking here
                        </Text>
                        .
                      </>
                    ) : (
                      stepText
                    )}
                  </Text>
                </TouchableOpacity>

                {hasDropdown && isOpen ? (
                  <View style={localStyles.stepBody}>
                    {stepNo === 2 || stepNo === 4 || stepNo === 5 ? renderPortalStepImage(stepNo) : null}
                    {stepNo === 3 ? (
                      <View style={localStyles.dropdownBlock}>
                        <View style={localStyles.bulletRow}>
                          <Text style={localStyles.bulletChar}>•</Text>
                          <Text style={[localStyles.dropdownText, localStyles.bulletText]}>Legal first name</Text>
                        </View>
                        <View style={localStyles.bulletRow}>
                          <Text style={localStyles.bulletChar}>•</Text>
                          <Text style={[localStyles.dropdownText, localStyles.bulletText]}>Legal last name</Text>
                        </View>
                        <View style={localStyles.bulletRow}>
                          <Text style={localStyles.bulletChar}>•</Text>
                          <Text style={[localStyles.dropdownText, localStyles.bulletText]}>Email address</Text>
                        </View>
                        <View style={localStyles.bulletRow}>
                          <Text style={localStyles.bulletChar}>•</Text>
                          <Text style={[localStyles.dropdownText, localStyles.bulletText]}>
                            Choose a password and enter it twice
                          </Text>
                        </View>
                      </View>
                    ) : null}
                  </View>
                ) : null}
              </View>
            </View>
          );
        })}

        <View style={localStyles.gap} />

        <Text style={localStyles.bodyText}>
          If you have any questions about setting up your portal account, please contact the National Support Center
          by{' '}
          <Text style={localStyles.grayLink} onPress={() => Linking.openURL(`mailto:${EMAIL_SUPPORT}`)}>
            clicking here
          </Text>
          .
        </Text>
      </View>
    </ScrollView>
  );
}

const localStyles = StyleSheet.create({
  missionTight: { marginBottom: 16 },
  sectionHeader: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1e3a5f',
    textAlign: 'center',
    fontFamily: 'System',
    marginBottom: 0,
  },
  gap: { height: 16 },
  bodyText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#333333',
    lineHeight: 24,
    fontFamily: 'System',
  },
  stepCard: { marginBottom: 14 },
  accordionShell: {
    borderWidth: 1,
    borderColor: '#e2e6ea',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fafbfc',
  },
  stepTrigger: {
    backgroundColor: '#fafbfc',
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 14,
  },
  stepTriggerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  stepLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1e3a5f',
    fontFamily: 'System',
  },
  stepInstructionText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#333333',
    lineHeight: 24,
    fontFamily: 'System',
  },
  stepBody: {
    borderTopWidth: 1,
    borderTopColor: '#e2e6ea',
    paddingHorizontal: 12,
    paddingBottom: 14,
    paddingTop: 12,
    backgroundColor: '#fff',
  },
  dropdownBlock: { marginTop: 12 },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  bulletChar: {
    fontSize: 18,
    lineHeight: 24,
    color: '#333333',
    marginRight: 10,
    fontFamily: 'System',
  },
  bulletText: {
    flex: 1,
  },
  dropdownText: {
    fontSize: 16,
    color: '#333333',
    lineHeight: 24,
    fontFamily: 'System',
  },
  grayLink: {
    color: '#6c757d',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  imagePlaceholder: {
    minHeight: 140,
    borderRadius: 6,
    backgroundColor: '#eef1f4',
    borderWidth: 1,
    borderColor: '#dde2e8',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  imagePlaceholderText: {
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
    lineHeight: 20,
  },
  stepImage: {
    width: '100%',
    height: 520,
    backgroundColor: '#ffffff',
    borderRadius: 6,
  },
});

