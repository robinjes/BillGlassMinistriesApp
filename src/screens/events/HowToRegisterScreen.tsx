import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { styles } from '../../styles/styles';
import { getRegisterStepImageSlot, type RegisterImageSlot } from '../../config/registerStepImages';
import { REGISTER_STEP_GRAY_TEXT, REGISTER_STEP_9_BULLETS } from '../../content/registerForEventSteps';
import { RootStackParamList } from '../../navigation/AppNavigator';

const STEP_COUNT = 12;

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function HowToRegisterScreen() {
  const navigation = useNavigation<Nav>();
  const [open, setOpen] = useState<Record<number, boolean>>({});

  const toggle = useCallback((index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpen((prev) => ({ ...prev, [index]: !prev[index] }));
  }, []);

  const goFaqPortalHelp = useCallback(() => {
    navigation.navigate('Creating a Portal Account');
  }, [navigation]);

  const goWhoCanServe = useCallback(() => {
    navigation.navigate('Who Can Serve on a Bill Glass Behind the Walls Event?');
  }, [navigation]);

  const renderDropdownExtra = (stepNo: number) => {
    if (stepNo === 4) {
      return (
        <View>
          {renderImageSlot(4, 'top')}
          <View style={localStyles.dropdownBlock}>
            <Text style={localStyles.dropdownText}>
              If you are NOT a First Team member you do not need to login to register for an event.
            </Text>
            <View style={localStyles.paraGap} />
            <Text style={localStyles.dropdownText}>
              If you are a First Team member, you must login with your portal account to have your registration fee
              waived. If you have not created your portal account, click Create Account.{' '}
              <Text style={localStyles.grayLink} onPress={goFaqPortalHelp}>
                Click here
              </Text>{' '}
              for instructions on how to create a portal account. After you have created a portal account, go back to
              the event page for the event you are wanting to register for, click Sign In, then enter your email
              address and password and you will be returned to the registration process of that event.
            </Text>
          </View>
          {renderImageSlot(4, 'bottom')}
        </View>
      );
    }

    if (stepNo === 9) {
      return (
        <View style={localStyles.dropdownBlock}>
          {REGISTER_STEP_9_BULLETS.map((b) => (
            <View key={b} style={localStyles.bulletRow}>
              <Text style={localStyles.bulletChar}>•</Text>
              <Text style={[localStyles.dropdownText, localStyles.bulletText]}>{b}</Text>
            </View>
          ))}
          <View style={localStyles.paraGap} />
          <Text style={localStyles.dropdownText}>
            For explanation on our policy regarding people serving in opposite gender facilities,{' '}
            <Text style={localStyles.grayLink} onPress={goWhoCanServe}>
              click here
            </Text>
            .
          </Text>
        </View>
      );
    }

    return null;
  };

  const renderImageSlot = (stepNo: number, slot: RegisterImageSlot = 'single') => {
    const imageSource = getRegisterStepImageSlot(stepNo, slot);
    const placeholderLabel =
      slot === 'top'
        ? `Step ${stepNo} (top image)`
        : slot === 'bottom'
          ? `Step ${stepNo} (bottom image)`
          : `Step ${stepNo}`;
    const slotStyle =
      slot === 'top' ? localStyles.imageSlotTop : slot === 'bottom' ? localStyles.imageSlotBottom : localStyles.imageSlot;

    return (
      <View style={slotStyle}>
        {imageSource ? (
          <Image source={imageSource} style={localStyles.stepImage} resizeMode="contain" />
        ) : (
          <View style={localStyles.imagePlaceholder}>
            <Text style={localStyles.imagePlaceholderText}>{placeholderLabel}</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.mainContentContainer}>
        <View style={[styles.missionSection, localStyles.missionTight]}>
          <View style={styles.eventScreenTitleBlock}>
            <Text style={[styles.missionTitle, styles.eventScreenMissionTitle]}>Registering for Events</Text>
            <View style={styles.yellowBar} />
          </View>
        </View>
        <Text style={localStyles.sectionHeader}>How to Register for an Event</Text>

        <Text style={localStyles.introText}>
          On the app and website, registration has been streamlined.
        </Text>

        <View style={localStyles.gapAfterIntro} />

        {Array.from({ length: STEP_COUNT }, (_, index) => {
          const stepNo = index + 1;
          const isOpen = Boolean(open[index]);
          const grayText = REGISTER_STEP_GRAY_TEXT[index] ?? '';

          return (
            <View key={index} style={localStyles.stepCard}>
              <View style={localStyles.accordionShell}>
                <TouchableOpacity
                  style={localStyles.stepTrigger}
                  onPress={() => toggle(index)}
                  activeOpacity={0.75}
                  accessibilityRole="button"
                  accessibilityState={{ expanded: isOpen }}
                  accessibilityLabel={`Step ${stepNo}`}
                >
                  <View style={localStyles.stepTriggerTopRow}>
                    <Text style={localStyles.stepLabel}>Step {stepNo}</Text>
                    <Ionicons name={isOpen ? 'chevron-up' : 'chevron-down'} size={22} color="#1e3a5f" />
                  </View>
                  <Text style={localStyles.stepInstructionText}>{grayText}</Text>
                </TouchableOpacity>

                {isOpen ? (
                  <View style={localStyles.stepBody}>
                    {renderDropdownExtra(stepNo)}
                    {stepNo !== 4 ? renderImageSlot(stepNo, 'single') : null}
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

const localStyles = StyleSheet.create({
  missionTight: {
    marginBottom: 16,
  },
  sectionHeader: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1e3a5f',
    textAlign: 'center',
    fontFamily: 'System',
    marginBottom: 14,
  },
  introText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#333333',
    lineHeight: 24,
    textAlign: 'left',
    fontFamily: 'System',
  },
  gapAfterIntro: {
    height: 18,
  },
  stepCard: {
    marginBottom: 14,
  },
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
  dropdownBlock: {
    marginVertical: 12,
  },
  dropdownText: {
    fontSize: 16,
    color: '#333333',
    lineHeight: 24,
    fontFamily: 'System',
  },
  paraGap: {
    height: 14,
  },
  grayLink: {
    color: '#6c757d',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
    paddingRight: 4,
  },
  bulletChar: {
    fontSize: 16,
    color: '#333333',
    marginRight: 8,
    lineHeight: 24,
  },
  bulletText: {
    flex: 1,
  },
  imageSlot: {
    marginTop: 4,
  },
  imageSlotTop: {
    marginBottom: 0,
  },
  imageSlotBottom: {
    marginTop: 0,
  },
  stepImage: {
    width: '100%',
    height: 520,
    backgroundColor: '#ffffff',
    borderRadius: 6,
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
});
