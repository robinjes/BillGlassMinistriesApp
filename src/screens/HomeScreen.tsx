// src/screens/HomeScreen.tsx

import React, { useRef, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Image, Animated } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { styles } from '../styles/styles';
import HomeQuickLinks from '../components/HomeQuickLinks';

export default function HomeScreen() {
  const imageScrollY = useRef(new Animated.Value(0)).current;
  const video = useRef(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    city: '',
    state: '',
    message: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
      {/* Hero Section with Video Background */}
      <View style={styles.heroSection}>
        <Video
          ref={video}
          style={styles.backgroundVideo}
          source={require('../../assets/behindthewalls_promo.mp4')}
          useNativeControls={false}
          resizeMode={ResizeMode.COVER}
          isLooping
          isMuted
          shouldPlay
        />
        <View style={styles.heroOverlay}>
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Training, Sending, and Winning</Text>
            <Text style={styles.heroSubtitle}>One Soul at a Time</Text>
            <Text style={styles.heroYear}>Since 1969</Text>
          </View>
        </View>
      </View>

      {/* Quick Links Overlay Section */}
      <HomeQuickLinks />

      {/* Main Content Container */}
      <View style={styles.mainContentContainer}>
        {/* Mission Statement */}
        <View style={styles.missionSection}>
          <Text style={styles.missionTitle}>Our Mission Statement</Text>
          <Text style={styles.missionText}>
            To assist the church by equipping and igniting Christians to share their faith in Jesus Christ with the "least of these."
          </Text>
          
          <Text style={styles.bodyText}>
            We partner with local churches across the country, working under the guidance of pastors to equip their members with the tools to confidently share the Gospel through a simple, easy-to-use tract. The next day, these newly trained volunteers are taken into jails, prisons, and juvenile facilities, where they have multiple chances to share the life-changing message of Jesus Christ. After the event, many of these volunteers return home inspired and ready to make an impact in their own churches, communities, and neighborhoods. Our mission is to train, send, and win souls for Christ, one at a time!
          </Text>

          <TouchableOpacity style={styles.linkButton}>
            <Text style={styles.linkText}>How We Assist the Church</Text>
          </TouchableOpacity>
        </View>

        {/* Bill Glass Story Section */}
        <View style={styles.storySection}>
          <Text style={styles.sectionTitle}>Bill Glass Behind the Walls</Text>
          
          <Text style={styles.bodyText}>
            From an early age, Bill Glass realized there was something unique about athletic success: when he spoke, people paid attention. Even more than that, they wanted to hear from him. As a standout football player in high school, an All-American at Baylor, and a defensive powerhouse in the NFL for eleven seasons, Glass was frequently asked to step up and share a few words. Those who know him best say he's always been remarkably direct. So, when he spoke, he shared what mattered most to him. He talked about sports—and he talked about Christ. And that's how a vibrant nationwide ministry was launched.
          </Text>

          <Text style={styles.bodyText}>
            Today, this Dallas-based outreach is known as Bill Glass Behind the Walls. With a committed team and thousands of dedicated volunteers, the ministry has become famous for its energetic Day of Champions and Weekend of Champions events held in prisons nationwide. Bill recalls that a board member kept urging him to bring his message inside prison walls. "I kept saying no. I was scared I wouldn't connect with the street kids and gang members in prison," he admitted. But once he faced those fears, the results were remarkable. "I went in fighting it, but the inmates' response was absolutely overwhelming," he said.
          </Text>

          <Text style={styles.bodyText}>
            Over the last four decades, Bill Glass has spent much of his time behind those prison walls. Alongside him, he's brought other pro athletes, champion weightlifters, magicians, tight-rope walkers—and even race cars, stunt planes, motorcycles, and just about anything else—to capture inmates' attention and share a message of hope and transformation. He discovered that inmates are like everyone else: they're willing to hear from an athlete and even more ready to respond to a sincere Christian testimony. Decades later, Bill Glass is still sharing that message—and people are still listening.
          </Text>
        </View>
      </View>

      {/* Scrollable Image Quote Banner */}
      <View style={styles.quoteBannerContainer}>
        <Animated.ScrollView
          horizontal={false}
          showsVerticalScrollIndicator={false}
          style={styles.quoteBannerScroll}
          contentContainerStyle={styles.quoteBannerContent}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: imageScrollY } } }],
            { useNativeDriver: true }
          )}
        >
          <View style={styles.quoteImageScrollContainer}>
            <Animated.Image
              source={require('../../assets/billspeaking.jpg')}
              style={[styles.quoteBannerImage, {
                transform: [{
                  translateY: imageScrollY.interpolate({
                    inputRange: [0, 220],
                    outputRange: [0, -220],
                    extrapolate: 'clamp',
                  })
                }]
              }]}
              resizeMode="cover"
            />
            <View style={styles.quoteOverlay}>
              <Text style={styles.quoteText}>
                “I was thrown in kicking and screaming, but the response from the inmates was incredible.”
              </Text>
              <Text style={styles.quoteAuthor}>Bill Glass</Text>
            </View>
          </View>
        </Animated.ScrollView>
      </View>

      {/* Contact Section */}
      <View style={styles.contactSectionWhite}>
        {/* Want to get involved box */}
        <View style={styles.involvedBox}>
          <Text style={styles.involvedTitle}>Want to get involved?</Text>
          <TouchableOpacity style={styles.eventButtonRight}>
            <Text style={styles.eventButtonText}>Event Calendar</Text>
          </TouchableOpacity>
        </View>

        {/* Send us a Message heading and bar */}
        <View style={styles.messageHeaderContainer}>
          <Text style={styles.messageHeaderText}>Send us a Message</Text>
          <View style={styles.yellowBar} />
        </View>

        {/* Send us a Message form */}
        <View style={styles.messageBox}>
          <View style={styles.formContainer}>
            <View style={styles.formRow}>
              <View style={styles.formField}>
                <TextInput
                  style={styles.input}
                  placeholder="First Name"
                  placeholderTextColor="#999"
                  value={formData.firstName}
                  onChangeText={(value) => handleInputChange('firstName', value)}
                />
              </View>
              <View style={styles.formField}>
                <TextInput
                  style={styles.input}
                  placeholder="Last Name"
                  placeholderTextColor="#999"
                  value={formData.lastName}
                  onChangeText={(value) => handleInputChange('lastName', value)}
                />
              </View>
            </View>

            <View style={styles.formRow}>
              <View style={styles.formField}>
                <TextInput
                  style={styles.input}
                  placeholder="Phone Number"
                  placeholderTextColor="#999"
                  value={formData.phone}
                  onChangeText={(value) => handleInputChange('phone', value)}
                  keyboardType="phone-pad"
                />
              </View>
              <View style={styles.formField}>
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="#999"
                  value={formData.email}
                  onChangeText={(value) => handleInputChange('email', value)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            <View style={styles.formRow}>
              <View style={styles.formField}>
                <TextInput
                  style={styles.input}
                  placeholder="City"
                  placeholderTextColor="#999"
                  value={formData.city}
                  onChangeText={(value) => handleInputChange('city', value)}
                />
              </View>
              <View style={styles.formField}>
                <TextInput
                  style={styles.input}
                  placeholder="State"
                  placeholderTextColor="#999"
                  value={formData.state}
                  onChangeText={(value) => handleInputChange('state', value)}
                />
              </View>
            </View>

            <View style={styles.fullWidthField}>
              <TextInput
                style={styles.messageInput}
                placeholder="Message"
                placeholderTextColor="#999"
                value={formData.message}
                onChangeText={(value) => handleInputChange('message', value)}
                multiline={true}
                textAlignVertical="top"
              />
            </View>

            <TouchableOpacity style={styles.sendButton}>
              <Text style={styles.sendButtonText}>SEND</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
