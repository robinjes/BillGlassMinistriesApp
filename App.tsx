import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native';

export default function App() {
  const [activeTab, setActiveTab] = useState('Home');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    city: '',
    state: '',
    message: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const renderHomePage = () => (
    <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
      {/* Hero Section */}
      <View style={styles.heroSection}>
        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>Training, Sending, and Winning</Text>
          <Text style={styles.heroSubtitle}>One Soul at a Time</Text>
          <Text style={styles.heroYear}>Since 1969</Text>
        </View>
      </View>

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

      {/* Contact Section */}
      <View style={styles.contactSection}>
        <View style={styles.contactHeader}>
          <Text style={styles.contactTitle}>Want to get involved?</Text>
          <TouchableOpacity style={styles.eventButton}>
            <Text style={styles.eventButtonText}>Event Calendar</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.formTitle}>Send us a Message</Text>
        
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
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Bill Glass Behind the Walls</Text>
      </View>

      {/* Content Area */}
      <View style={styles.mainContent}>
        {activeTab === 'Home' && renderHomePage()}
        {activeTab !== 'Home' && (
          <View style={styles.placeholderContent}>
            <Text style={styles.placeholderText}>{activeTab} - Coming Soon</Text>
          </View>
        )}
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={[styles.navItem, activeTab === 'Home' && styles.activeNavItem]}
          onPress={() => setActiveTab('Home')}
        >
          <Text style={[styles.navText, activeTab === 'Home' && styles.activeNavText]}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.navItem, activeTab === 'About' && styles.activeNavItem]}
          onPress={() => setActiveTab('About')}
        >
          <Text style={[styles.navText, activeTab === 'About' && styles.activeNavText]}>About</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.navItem, activeTab === 'Churches' && styles.activeNavItem]}
          onPress={() => setActiveTab('Churches')}
        >
          <Text style={[styles.navText, activeTab === 'Churches' && styles.activeNavText]}>Churches</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.navItem, activeTab === 'Events' && styles.activeNavItem]}
          onPress={() => setActiveTab('Events')}
        >
          <Text style={[styles.navText, activeTab === 'Events' && styles.activeNavText]}>Events</Text>
        </TouchableOpacity>
      </View>

      {/* Second Row of Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={[styles.navItem, activeTab === 'Give' && styles.activeNavItem]}
          onPress={() => setActiveTab('Give')}
        >
          <Text style={[styles.navText, activeTab === 'Give' && styles.activeNavText]}>Ways to Give</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.navItem, activeTab === 'Media' && styles.activeNavItem]}
          onPress={() => setActiveTab('Media')}
        >
          <Text style={[styles.navText, activeTab === 'Media' && styles.activeNavText]}>Media</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.navItem, activeTab === 'Volunteers' && styles.activeNavItem]}
          onPress={() => setActiveTab('Volunteers')}
        >
          <Text style={[styles.navText, activeTab === 'Volunteers' && styles.activeNavText]}>Equipping</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.navItem, activeTab === 'Store' && styles.activeNavItem]}
          onPress={() => setActiveTab('Store')}
        >
          <Text style={[styles.navText, activeTab === 'Store' && styles.activeNavText]}>Store</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    backgroundColor: '#ffffff',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8',
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1e3a5f',
    textAlign: 'center',
  },
  mainContent: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  heroSection: {
    backgroundColor: '#ffffff',
    paddingVertical: 60,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 0,
  },
  heroContent: {
    alignItems: 'center',
    maxWidth: 600,
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1e3a5f',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 42,
  },
  heroSubtitle: {
    fontSize: 24,
    color: '#1e3a5f',
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: '600',
  },
  heroYear: {
    fontSize: 18,
    color: '#f7b731',
    textAlign: 'center',
    fontWeight: '600',
  },
  mainContentContainer: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  missionSection: {
    marginBottom: 50,
  },
  missionTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1e3a5f',
    marginBottom: 20,
    textAlign: 'left',
  },
  missionText: {
    fontSize: 18,
    color: '#1e3a5f',
    lineHeight: 28,
    marginBottom: 25,
    fontWeight: '600',
    textAlign: 'left',
  },
  storySection: {
    marginBottom: 0,
  },
  sectionTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1e3a5f',
    marginBottom: 25,
    textAlign: 'left',
  },
  bodyText: {
    fontSize: 16,
    color: '#555555',
    lineHeight: 28,
    marginBottom: 20,
    textAlign: 'left',
  },
  linkButton: {
    alignSelf: 'flex-start',
    marginTop: 15,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#f7b731',
    borderRadius: 6,
  },
  linkText: {
    fontSize: 16,
    color: '#1e3a5f',
    fontWeight: '700',
  },
  placeholderContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  placeholderText: {
    fontSize: 18,
    color: '#666666',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e8e8e8',
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 5,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  activeNavItem: {
    backgroundColor: '#e8f2ff',
  },
  navText: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
  },
  activeNavText: {
    color: '#1e3a5f',
    fontWeight: '600',
  },
  contactSection: {
    backgroundColor: '#1e3a5f',
    paddingHorizontal: 20,
    paddingVertical: 50,
    marginBottom: 0,
  },
  contactHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
    flexWrap: 'wrap',
  },
  contactTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    flex: 1,
  },
  eventButton: {
    backgroundColor: '#f7b731',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  eventButtonText: {
    color: '#1e3a5f',
    fontSize: 16,
    fontWeight: '700',
  },
  formTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 30,
    textAlign: 'left',
  },
  formContainer: {
    backgroundColor: 'transparent',
  },
  formRow: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 15,
  },
  formField: {
    flex: 1,
  },
  fullWidthField: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#ffffff',
    height: 50,
    borderRadius: 6,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  messageInput: {
    backgroundColor: '#ffffff',
    height: 120,
    borderRadius: 6,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sendButton: {
    backgroundColor: '#f7b731',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  sendButtonText: {
    color: '#1e3a5f',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});