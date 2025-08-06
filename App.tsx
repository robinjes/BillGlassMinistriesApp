import React, { useState, useEffect } from 'react';
import { View, Image, Text, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './src/screens/HomeScreen';
import Navbar from './src/components/Navbar';
import { styles } from './src/styles/styles';

export default function App() {
  const [activeTab, setActiveTab] = useState('Home');
  const [showSplash, setShowSplash] = useState(true);
  const fadeAnim = new Animated.Value(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => setShowSplash(false));
    }, 2000);

    return () => clearTimeout(timer);
  }, [fadeAnim]);

  const navItems = [
    'Home',
    'About',
    'Churches',
    'Events',
    'Ways to Give',
    'Media',
    'Equipping Volunteers',
    'Store',
    'Give',
    'Resources',
    'Contact'
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {showSplash ? (
        <Animated.View style={[styles.splashContainer, { opacity: fadeAnim }]}>
          <Image 
            source={require('./assets/Billglass.jpg')} 
            style={styles.splashLogo}
            resizeMode="contain"
          />
        </Animated.View>
      ) : (
        <>
          <Navbar 
            navItems={navItems}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          <View style={styles.mainContent}>
            {activeTab === 'Home' ? (
              <HomeScreen />
            ) : (
              <View style={styles.placeholderContent}>
                <Text style={styles.placeholderText}>{activeTab} - Coming Soon</Text>
              </View>
            )}
          </View>
        </>
      )}
    </View>
  );
}
