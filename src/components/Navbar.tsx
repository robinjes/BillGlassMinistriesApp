// src/components/Navbar.tsx
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { styles } from '../styles/styles';

interface NavbarProps {
  navItems: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function Navbar({ navItems, activeTab, onTabChange }: NavbarProps) {
  return (
    <View style={styles.topNavContainer}>
      <View style={styles.navContent}>
        <View style={styles.logoContainer}>
          <View style={styles.logoBackground}>
            <Image 
              source={require('../../assets/Billglass.jpg')} 
              style={styles.navLogo}
              resizeMode="contain"
            />
          </View>
        </View>

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
          {navItems.map((item, index) => (
            <TouchableOpacity 
              key={index}
              style={[styles.navItem, activeTab === item && styles.activeNavItem]}
              onPress={() => onTabChange(item)}
            >
              <Text style={[styles.navText, activeTab === item && styles.activeNavText]}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
