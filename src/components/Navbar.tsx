// src/components/Navbar.tsx
import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Modal, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../styles/styles';
import { useNavigation } from '@react-navigation/native';

interface NavbarProps {
  navItems: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function Navbar({ navItems, activeTab, onTabChange }: NavbarProps) {
  const navigation = useNavigation<any>();
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
  ];


  // Unified navigation for all tabs
  const handleNavPress = (item: string) => {
    if (item === 'About') {
      setAboutDropdownVisible((v) => !v);
    } else {
      setAboutDropdownVisible(false);
      // Map navItems to screen names if needed
      let screenName = item;
      if (item === 'Home') screenName = 'Home';
      else if (item === 'Churches') screenName = 'Churches';
      else if (item === 'Events') screenName = 'Events';
      else if (item === 'Ways to Give') screenName = 'Ways to Give';
      else if (item === 'Media') screenName = 'Media';
      else if (item === 'Equipping Volunteers') screenName = 'Equipping Volunteers';
      else if (item === 'Store') screenName = 'Store';
      // Add more mappings if needed
      navigation.navigate(screenName);
    }
  };

  const handleAboutSectionPress = (section: string) => {
    setAboutDropdownVisible(false);
    navigation.navigate(section);
  };

  return (
    <View style={styles.topNavContainer}>
      <View style={styles.navContent}>
        <TouchableOpacity style={styles.logoContainer} onPress={() => { setAboutDropdownVisible(false); navigation.navigate('Home'); }}>
          <View style={styles.logoBackground}>
            <Image 
              source={require('../../assets/Billglass.jpg')} 
              style={styles.navLogo}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.navScrollContainer}
          style={styles.navScrollView}
          bounces={false}
          decelerationRate="fast"
          snapToInterval={120}
          snapToAlignment="start"
        >
          {navItems.map((item, index) => {
            if (item === 'About') {
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
            }
            
            // Special handling for Home item - render icon instead of text
            if (item === 'Home') {
              return (
                <TouchableOpacity
                  key={index}
                  style={[styles.navItem, activeTab === item && styles.activeNavItem]}
                  onPress={() => handleNavPress(item)}
                >
                  <Ionicons 
                    name="home" 
                    size={24} 
                    color={activeTab === item ? '#1e3a5f' : '#fff'} 
                  />
                </TouchableOpacity>
              );
            }
            
            return (
              <TouchableOpacity
                key={index}
                style={[styles.navItem, activeTab === item && styles.activeNavItem]}
                onPress={() => handleNavPress(item)}
              >
                <Text style={[styles.navText, activeTab === item && styles.activeNavText]}>{item}</Text>
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
                  style={[styles.dropdownMenuItem, idx === 0 && styles.dropdownMenuItemActive]}
                  onPress={() => handleAboutSectionPress(section)}
                >
                  <Text style={[styles.dropdownMenuText, idx === 0 && styles.dropdownMenuTextActive]}>{section}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </Modal>
      </View>
    </View>
  );
}
