import React from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
          <View style={styles.yellowBar} />
        </View>
        
        <View style={styles.profileSection}>
          <View style={styles.profileImagePlaceholder}>
            <Text style={styles.profileImageText}>👤</Text>
          </View>
          <Text style={styles.profileName}>User Name</Text>
          <Text style={styles.profileEmail}>user@example.com</Text>
        </View>

        <View style={styles.menuSection}>
          <View style={styles.menuItem}>
            <Text style={styles.menuItemText}>Personal Information</Text>
            <Text style={styles.menuItemArrow}>›</Text>
          </View>
          
          <View style={styles.menuItem}>
            <Text style={styles.menuItemText}>Preferences</Text>
            <Text style={styles.menuItemArrow}>›</Text>
          </View>
          
          <View style={styles.menuItem}>
            <Text style={styles.menuItemText}>Notifications</Text>
            <Text style={styles.menuItemArrow}>›</Text>
          </View>
          
          <View style={styles.menuItem}>
            <Text style={styles.menuItemText}>Privacy & Security</Text>
            <Text style={styles.menuItemArrow}>›</Text>
          </View>
          
          <View style={styles.menuItem}>
            <Text style={styles.menuItemText}>Help & Support</Text>
            <Text style={styles.menuItemArrow}>›</Text>
          </View>
          
          <View style={styles.menuItem}>
            <Text style={styles.menuItemText}>About App</Text>
            <Text style={styles.menuItemArrow}>›</Text>
          </View>
        </View>

        <View style={styles.logoutSection}>
          <View style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>Log Out</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  header: {
    backgroundColor: '#1e3a5f',
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  yellowBar: {
    width: 60,
    height: 7,
    backgroundColor: '#f7b731',
    borderRadius: 4,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#f8f9fa',
  },
  profileImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e9ecef',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  profileImageText: {
    fontSize: 40,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e3a5f',
    marginBottom: 5,
  },
  profileEmail: {
    fontSize: 16,
    color: '#6c757d',
  },
  menuSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  menuItemText: {
    fontSize: 16,
    color: '#1e3a5f',
    fontWeight: '500',
  },
  menuItemArrow: {
    fontSize: 18,
    color: '#6c757d',
    fontWeight: 'bold',
  },
  logoutSection: {
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
