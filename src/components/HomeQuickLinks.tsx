import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function HomeQuickLinks() {
  const navigation = useNavigation<any>();
  return (
    <View style={styles.overlayBox}>
      <TouchableOpacity style={styles.linkItem} onPress={() => navigation.navigate('Events')}>
        <Ionicons name="calendar-outline" size={40} color="#fff" style={styles.icon} />
        <Text style={styles.linkText}>Upcoming Events</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.linkItem} onPress={() => navigation.navigate('Events')}>
        <MaterialCommunityIcons name="clipboard-list-outline" size={40} color="#fff" style={styles.icon} />
        <Text style={styles.linkText}>How to Register for an Event</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.linkItem} onPress={() => navigation.navigate('Ways to Give')}>
        <FontAwesome5 name="handshake" size={40} color="#fff" style={styles.icon} />
        <Text style={styles.linkText}>Give to the Ministry</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  overlayBox: {
    backgroundColor: '#1e3a5f',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 36,
    paddingHorizontal: 10,
    borderRadius: 0,
    marginTop: -60,
    marginBottom: 30,
    zIndex: 10,
    width: '100%',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  linkItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  icon: {
    marginBottom: 10,
  },
  linkText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 2,
  },
});
