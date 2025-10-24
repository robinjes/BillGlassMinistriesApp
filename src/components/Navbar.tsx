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
  const [eventsDropdownVisible, setEventsDropdownVisible] = useState(false);
  const [waysToGiveDropdownVisible, setWaysToGiveDropdownVisible] = useState(false);
  const [waysToGiveNowDropdownVisible, setWaysToGiveNowDropdownVisible] = useState(false);
  const [aboutBtnLayout, setAboutBtnLayout] = useState<{x: number, y: number, width: number, height: number} | null>(null);
  const [eventsBtnLayout, setEventsBtnLayout] = useState<{x: number, y: number, width: number, height: number} | null>(null);
  const [waysToGiveBtnLayout, setWaysToGiveBtnLayout] = useState<{x: number, y: number, width: number, height: number} | null>(null);
  const [aboutBtnPageY, setAboutBtnPageY] = useState<number | null>(null);
  const [eventsBtnPageY, setEventsBtnPageY] = useState<number | null>(null);
  const [waysToGiveBtnPageY, setWaysToGiveBtnPageY] = useState<number | null>(null);
  const waysToGiveButtonRef = useRef<any>(null);
  const aboutButtonRef = useRef<any>(null);
  const eventsButtonRef = useRef<any>(null);
  
  // Function to measure Ways to Give button position dynamically
  const measureWaysToGivePosition = () => {
    if (waysToGiveButtonRef.current) {
      waysToGiveButtonRef.current.measure((ox: number, oy: number, width: number, height: number, px: number, py: number) => {
        setWaysToGiveBtnPageY(py + height - 60);
        setWaysToGiveBtnLayout({ x: px, y: py, width, height });
      });
    }
  };

  // Function to measure About button position dynamically
  const measureAboutPosition = () => {
    if (aboutButtonRef.current) {
      aboutButtonRef.current.measure((ox: number, oy: number, width: number, height: number, px: number, py: number) => {
        setAboutBtnPageY(py + height - 60);
        setAboutBtnLayout({ x: px, y: py, width, height });
      });
    }
  };

  // Function to measure Events button position dynamically
  const measureEventsPosition = () => {
    if (eventsButtonRef.current) {
      eventsButtonRef.current.measure((ox: number, oy: number, width: number, height: number, px: number, py: number) => {
        setEventsBtnPageY(py + height - 60);
        setEventsBtnLayout({ x: px, y: py, width, height });
      });
    }
  };

  // Measure position when dropdown opens
  const handleWaysToGivePress = () => {
    measureWaysToGivePosition();
    setWaysToGiveDropdownVisible((v) => !v);
    setAboutDropdownVisible(false);
    setEventsDropdownVisible(false);
  };

  const handleAboutPress = () => {
    measureAboutPosition();
    setAboutDropdownVisible((v) => !v);
    setEventsDropdownVisible(false);
    setWaysToGiveDropdownVisible(false);
  };

  const handleEventsPress = () => {
    measureEventsPosition();
    setEventsDropdownVisible((v) => !v);
    setAboutDropdownVisible(false);
    setWaysToGiveDropdownVisible(false);
  };
  
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
  const eventsSections = [
    'Evangelism Events',
    'Africa Evangelism Events',
    'How to Register for an Event',
    'What to Expect at Our Events',
    'Who Can Serve on a Bill Glass Behind the Walls Event?',
    'Join a Local Team',
  ];
  const waysToGiveSections = [
    'Ways to Give Now',
    'Ways to Give Later',
    'First Team',
    '$75 to Life',
    'Financial Integrity',
    'Donor Privacy',
  ];

  const waysToGiveNowSections = [
    'Greatest Need Support',
    'Support a Specific Event',
    'Other Ways to Give',
    'Memorial Gift',
    'First Team',
  ];


  // Unified navigation for all tabs
  const handleNavPress = (item: string) => {
    if (item === 'About') {
      handleAboutPress();
    } else if (item === 'Events') {
      handleEventsPress();
    } else if (item === 'Ways to Give') {
      handleWaysToGivePress();
    } else if (item === 'Profile') {
      setAboutDropdownVisible(false);
      setEventsDropdownVisible(false);
      setWaysToGiveDropdownVisible(false);
      setWaysToGiveNowDropdownVisible(false);
      navigation.navigate('Profile');
    }
  };

  const handleAboutSectionPress = (section: string) => {
    setAboutDropdownVisible(false);
    setEventsDropdownVisible(false);
    setWaysToGiveDropdownVisible(false);
    navigation.navigate(section);
  };

  const handleEventsSectionPress = (section: string) => {
    setAboutDropdownVisible(false);
    setEventsDropdownVisible(false);
    setWaysToGiveDropdownVisible(false);
    navigation.navigate(section);
  };

  const handleWaysToGiveSectionPress = (section: string) => {
    if (section === 'Ways to Give Now') {
      setWaysToGiveNowDropdownVisible((v) => !v);
    } else {
      setAboutDropdownVisible(false);
      setEventsDropdownVisible(false);
      setWaysToGiveDropdownVisible(false);
      setWaysToGiveNowDropdownVisible(false);
      setWaysToGiveNowDropdownVisible(false);
      navigation.navigate(section);
    }
  };

  const handleWaysToGiveNowSectionPress = (section: string) => {
    setAboutDropdownVisible(false);
    setEventsDropdownVisible(false);
    setWaysToGiveDropdownVisible(false);
    setWaysToGiveNowDropdownVisible(false);
    navigation.navigate(section);
  };

  // Determine the active tab based on the current route
  let activeTab = navItems.find(item => {
    if (item === 'About') {
      // If current route is any about section, highlight About
      return aboutSections.includes(currentRoute);
    }
    if (item === 'Events') {
      // If current route is any events section, highlight Events
      return eventsSections.includes(currentRoute);
    }
    if (item === 'Ways to Give') {
      // If current route is any ways to give section, highlight Ways to Give
      return waysToGiveSections.includes(currentRoute);
    }
    // Highlight if the nav item matches the current route
    return item === currentRoute;
  }) || '';

  return (
    <View style={styles.topNavContainer}>
      <View style={styles.navContent}>
        <TouchableOpacity style={styles.logoContainer} onPress={() => { setAboutDropdownVisible(false); setEventsDropdownVisible(false); setWaysToGiveDropdownVisible(false); navigation.navigate('Home'); }}>
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
            if (item === 'About') {
              return (
                <TouchableOpacity
                  ref={aboutButtonRef}
                  key={index}
                  style={[styles.navItem, activeTab === item && styles.activeNavItem]}
                  onPress={() => handleNavPress(item)}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={[styles.navText, activeTab === item && styles.activeNavText]}>{item}</Text>
                    <Text style={{ marginLeft: 4, fontSize: 14, color: activeTab === item ? '#1e3a5f' : '#fff' }}>▼</Text>
                  </View>
                </TouchableOpacity>
              );
            }
            if (item === 'Events') {
              return (
                <TouchableOpacity
                  ref={eventsButtonRef}
                  key={index}
                  style={[styles.navItem, activeTab === item && styles.activeNavItem]}
                  onPress={() => handleNavPress(item)}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={[styles.navText, activeTab === item && styles.activeNavText]}>{item}</Text>
                    <Text style={{ marginLeft: 4, fontSize: 14, color: activeTab === item ? '#1e3a5f' : '#fff' }}>▼</Text>
                  </View>
                </TouchableOpacity>
              );
            }
            if (item === 'Ways to Give') {
              return (
                <TouchableOpacity
                  ref={waysToGiveButtonRef}
                  key={index}
                  style={[styles.navItem, activeTab === item && styles.activeNavItem]}
                  onPress={() => handleNavPress(item)}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={[styles.navText, activeTab === item && styles.activeNavText]}>{item}</Text>
                    <Text style={{ marginLeft: 4, fontSize: 14, color: activeTab === item ? '#1e3a5f' : '#fff' }}>▼</Text>
                  </View>
                </TouchableOpacity>
              );
            }
            // All other nav items are regular buttons
            return (
              <TouchableOpacity
                key={index}
                style={[styles.navItem, activeTab === item && styles.activeNavItem]}
                onPress={() => {
                  setAboutDropdownVisible(false);
                  setEventsDropdownVisible(false);
                  setWaysToGiveDropdownVisible(false);
                  navigation.navigate(item);
                }}
              >
                <Text style={[styles.navText, activeTab === item && styles.activeNavText]}>{item}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        {/* About Dropdown */}
        {aboutDropdownVisible && (
          <View style={styles.dropdownOverlay}>
            <Pressable style={{ flex: 1 }} onPress={() => setAboutDropdownVisible(false)} />
            <View style={[
              styles.dropdownMenuContainer,
              {
                position: 'absolute',
                top: aboutBtnPageY !== null ? aboutBtnPageY : 80,
                left: aboutBtnLayout ? aboutBtnLayout.x + (aboutBtnLayout.width / 2) - 125 : 50,
                minWidth: aboutBtnLayout ? aboutBtnLayout.width + 40 : 250,
                maxWidth: 300,
              },
            ]}>
              {aboutSections.map((section, idx) => (
                <TouchableOpacity
                  key={section}
                  style={[
                    styles.dropdownMenuItem, 
                    currentRoute === section && styles.dropdownMenuItemActive
                  ]}
                  onPress={() => handleAboutSectionPress(section)}
                >
                  <Text style={[
                    styles.dropdownMenuText, 
                    currentRoute === section && styles.dropdownMenuTextActive
                  ]}>
                    {section}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
        {/* Events Dropdown */}
        {eventsDropdownVisible && (
          <View style={styles.dropdownOverlay}>
            <Pressable style={{ flex: 1 }} onPress={() => setEventsDropdownVisible(false)} />
            <View style={[
              styles.dropdownMenuContainer,
              {
                position: 'absolute',
                top: eventsBtnPageY !== null ? eventsBtnPageY : 80,
                left: eventsBtnLayout ? eventsBtnLayout.x + (eventsBtnLayout.width / 2) - 125 : 50,
                minWidth: eventsBtnLayout ? eventsBtnLayout.width + 40 : 250,
                maxWidth: 300,
              },
            ]}>
              {eventsSections.map((section, idx) => (
                <TouchableOpacity
                  key={section}
                  style={[
                    styles.dropdownMenuItem, 
                    currentRoute === section && styles.dropdownMenuItemActive
                  ]}
                  onPress={() => handleEventsSectionPress(section)}
                >
                  <Text style={[
                    styles.dropdownMenuText, 
                    currentRoute === section && styles.dropdownMenuTextActive
                  ]}>
                    {section}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
        {/* Ways to Give Dropdown */}
        {waysToGiveDropdownVisible && (
          <View style={styles.dropdownOverlay}>
            <Pressable style={{ flex: 1 }} onPress={() => { setWaysToGiveDropdownVisible(false); setWaysToGiveNowDropdownVisible(false); }} />
            <View style={[
              styles.dropdownMenuContainer,
              {
                position: 'absolute',
                top: waysToGiveBtnPageY !== null ? waysToGiveBtnPageY : 80,
                left: waysToGiveBtnLayout ? waysToGiveBtnLayout.x + (waysToGiveBtnLayout.width / 2) - 125 : 50,
                minWidth: waysToGiveBtnLayout ? waysToGiveBtnLayout.width + 40 : 250,
                maxWidth: 300,
              },
            ]}>
              {waysToGiveSections.map((section, idx) => (
                <TouchableOpacity
                  key={section}
                  style={[
                    styles.dropdownMenuItem, 
                    currentRoute === section && styles.dropdownMenuItemActive
                  ]}
                  onPress={() => handleWaysToGiveSectionPress(section)}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <Text style={[
                      styles.dropdownMenuText, 
                      currentRoute === section && styles.dropdownMenuTextActive
                    ]}>
                      {section}
                    </Text>
                    {section === 'Ways to Give Now' && (
                      <Text style={{ color: '#666', fontSize: 12, marginLeft: 8 }}>›</Text>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
        
        {/* Ways to Give Now Nested Dropdown */}
        {waysToGiveNowDropdownVisible && (
          <View style={styles.dropdownOverlay}>
            <Pressable style={{ flex: 1 }} onPress={() => setWaysToGiveNowDropdownVisible(false)} />
            <View style={[
              styles.dropdownMenuContainer,
              {
                position: 'absolute',
                top: waysToGiveBtnPageY !== null ? waysToGiveBtnPageY : 80,
                left: waysToGiveBtnLayout ? waysToGiveBtnLayout.x + (waysToGiveBtnLayout.width / 2) + 25 : 300,
                minWidth: 250,
                maxWidth: 300,
              },
            ]}>
              {waysToGiveNowSections.map((section, idx) => (
                <TouchableOpacity
                  key={section}
                  style={[
                    styles.dropdownMenuItem, 
                    currentRoute === section && styles.dropdownMenuItemActive
                  ]}
                  onPress={() => handleWaysToGiveNowSectionPress(section)}
                >
                  <Text style={[
                    styles.dropdownMenuText, 
                    currentRoute === section && styles.dropdownMenuTextActive
                  ]}>
                    {section}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </View>
    </View>
  );
}
