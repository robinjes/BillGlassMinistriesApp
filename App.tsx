
import React, { useEffect, useRef, useState } from 'react';
import { View, Animated, StyleSheet, Image } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 800,
        delay: 400,
        useNativeDriver: true,
      })
    ]).start(() => {
      setShowSplash(false);
    });
  }, [fadeAnim]);

  if (showSplash) {
    return (
      <View style={styles.container}>
        <Animated.Image
          source={require('./assets/Billglass.jpg')}
          style={[styles.centeredImage, { opacity: fadeAnim }]}
          resizeMode="contain"
        />
      </View>
    );
  }
  return <AppNavigator />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredImage: {
    width: 260,
    height: 260,
    alignSelf: 'center',
  },
});
