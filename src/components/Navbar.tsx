// src/components/Navbar.tsx
import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Modal, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../styles/styles';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function Navbar({ navItems, currentRoute }: { navItems: string[], currentRoute: string }) {
  const navigation = useNavigation<any>();
  const scrollRef = useRef<ScrollView>(null);
  const [aboutDropdownVisible, setAboutDropdownVisible] = useState(false);
  const [aboutBtnLayout, setAboutBtnLayout] = useState<{x: number, y: number, width: number, height: number} | null>(null);
  const [aboutBtnPageY, setAboutBtnPageY] = useState<number | null>(null);
  const aboutSections = [
    'About Bill Glass Behind the Walls',
    'Assisting the Church',
    'Statement of Faith',
    'Ministry Staff',
    'Position Opportunities',
    'Join a Local Team',
    'Platform Guests',
    'Frequently Asked Questions',
    'Churches',
    'Events',
    'Ways to Give',
    'Media',
    'Equipping Volunteers',
    'Store',
  ];


  // Unified navigation for all tabs
  const handleNavPress = (item: string) => {
    if (item === 'About') {
      setAboutDropdownVisible((v) => !v);
    } else if (item === 'Profile') {
      setAboutDropdownVisible(false);
      navigation.navigate('Profile');
    }
  };

  const handleAboutSectionPress = (section: string) => {
    setAboutDropdownVisible(false);
    navigation.navigate(section);
  };

  // Determine the active tab based on the current route
  let activeTab = navItems.find(item => {
    if (item === 'About') {
      // If current route is any about section, highlight About
      return aboutSections.includes(currentRoute);
    }
    if (item === 'Profile' && currentRoute === 'Profile') return true;
    return false;
  }) || '';

  return (
    <View style={styles.topNavContainer}>
      <View style={styles.navContent}>
        <TouchableOpacity style={styles.logoContainer} onPress={() => { setAboutDropdownVisible(false); navigation.navigate('Home'); }}>
          <View style={styles.logoBackground}>
            <Image 
              source={require('../../assets/icon.png')} 
              style={styles.navLogo}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>

        <ScrollView 
          ref={scrollRef}
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.navScrollContainer}
          style={styles.navScrollView}
          bounces={false}
          decelerationRate="fast"
        >
          {navItems.map((item, index) => {
            if (item === 'Profile') {
              return (
                <TouchableOpacity
                  key={index}
                  style={[styles.navItem, activeTab === item && styles.activeNavItem]}
                  onPress={() => handleNavPress(item)}
                >
                  <Ionicons 
                    name="person" 
                    size={24} 
                    color={activeTab === item ? '#1e3a5f' : '#fff'} 
                  />
                </TouchableOpacity>
              );
            }
            // About button (default case)
            return (
              <TouchableOpacity
                key={index}
                style={[styles.navItem, activeTab === item && styles.activeNavItem]}
                onPress={() => handleNavPress(item)}
                onLayout={e => {
                  setAboutBtnLayout(e.nativeEvent.layout);
                  // Get absolute Y position for dropdown
                  e.target.measure((ox, oy, width, height, px, py) => {
                    setAboutBtnPageY(py + height);
                  });
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={[styles.navText, activeTab === item && styles.activeNavText]}>{item}</Text>
                  <Text style={{ marginLeft: 4, fontSize: 14, color: activeTab === item ? '#1e3a5f' : '#fff' }}>▼</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        {/* About Dropdown */}
        <Modal
          visible={aboutDropdownVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setAboutDropdownVisible(false)}
        >
          <Pressable style={{ flex: 1 }} onPress={() => setAboutDropdownVisible(false)}>
            <View style={{ flex: 1 }} />
          </Pressable>
          {aboutBtnLayout && aboutBtnPageY !== null && (
            <View style={[
              styles.dropdownMenuContainer,
              {
                position: 'absolute',
                top: aboutBtnPageY,
                left: aboutBtnLayout.x,
                minWidth: aboutBtnLayout.width + 40,
              },
            ]}>
              {aboutSections.map((section, idx) => (
                <TouchableOpacity
                  key={section}
                  style={[styles.dropdownMenuItem, currentRoute === section && styles.dropdownMenuItemActive]}
                  onPress={() => handleAboutSectionPress(section)}
                >
                  <Text style={[styles.dropdownMenuText, currentRoute === section && styles.dropdownMenuTextActive]}>{section}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </Modal>
      </View>
    </View>
  );
}
