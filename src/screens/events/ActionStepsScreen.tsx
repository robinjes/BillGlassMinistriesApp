import React, { useMemo } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from '../../styles/styles';

const ACTION_STEPS_SOURCE = require('../../../assets/cards/actionsteps.png');

export default function ActionStepsScreen() {
  const { width: windowWidth } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const { displayWidth, displayHeight } = useMemo(() => {
    const resolved = Image.resolveAssetSource(ACTION_STEPS_SOURCE);
    const natW =
      typeof resolved.width === 'number' && resolved.width > 0 ? resolved.width : 3;
    const natH =
      typeof resolved.height === 'number' && resolved.height > 0 ? resolved.height : 4;

    // Extra horizontal gutter so type near the PNG edges isn’t flush with the screen bezel.
    const horizontalGutter = 24;
    const maxW = Math.max(1, windowWidth - horizontalGutter * 2);

    // Fit full width; height follows intrinsic aspect ratio (explicit px avoids aspectRatio layout quirks).
    const w = Math.floor(maxW);
    const h = Math.max(1, Math.round((w * natH) / natW));

    return { displayWidth: w, displayHeight: h };
  }, [windowWidth]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[
        localStyles.scrollContent,
        { paddingBottom: Math.max(24, insets.bottom + 16) },
      ]}
    >
      <View style={[localStyles.inner, { paddingHorizontal: 24, paddingTop: 16 }]}>
        <View style={[localStyles.header, styles.eventScreenTitleBlock]}>
          <Text style={[styles.missionTitle, localStyles.titleTight, styles.eventScreenMissionTitle]}>
            Action Steps
          </Text>
          <View style={styles.yellowBar} />
        </View>
        <View style={localStyles.imageWrap}>
          <Image
            source={ACTION_STEPS_SOURCE}
            style={{ width: displayWidth, height: displayHeight }}
            resizeMode="contain"
            accessibilityLabel="Action Steps Beyond the Walls infographic"
          />
        </View>
      </View>
    </ScrollView>
  );
}

const localStyles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
  inner: {
    alignItems: 'center',
  },
  header: {
    alignSelf: 'stretch',
    marginBottom: 12,
  },
  titleTight: {
    marginBottom: 6,
  },
  imageWrap: {
    alignSelf: 'center',
    overflow: 'visible',
  },
});
