import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { WebView } from 'react-native-webview';




export default function SupportSpecificEventScreen() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState('Select an event');

    const events = [
        'Adrian, MI',
        'Arizona',
        'Austin, TX November',
        'Beaumont, TX',
        'Chillicothe, MO',
        'Chillicothe, OH',
        'Cincinnati, OH',
        'Cook County, IL',
        'Crestview/Baker, FL',
        'Dayton, TX Christmas',
        'DFW November',
        'DFW West',
        'Fresno, CA August',
        'Fresno, CA February',
        'Fresno, CA October',
        'Jefferson City, MO',
        'Lake City, FL',
        'Las Vegas, NV',
        'Little Rock, AR',
        'Louisville, KY',
        'Milton, FL',
        'Nashville, TN',
        'Nashville, TN Northeast',
        'Nashville, TN November',
        'Oklahoma City, OK Special Ops',
        'Palestine, TX',
        'Sacramento, CA August',
        'San Diego, CA',
        'Shreveport, LA',
        'Springfield, MO',
        'Teague, TX',
        'Winnsboro, TX'
    ];

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Support Specific Event Screen</Text>
            </View>
            <View style={styles.contentContainer}>
                <Text style={styles.subheaderText}>How do I give towards a specific event?</Text>
                <Text style={styles.bodyText}>If you would like to give towards a specific event or State, you can select from the dropdown below or go to the Evangelism Events page, select the event you want support, and click the Support this Event button.</Text>
                
                <View style={styles.dropdownContainer}>
                    <TouchableOpacity 
                        style={styles.dropdownHeader}
                        onPress={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        <Text style={styles.dropdownHeaderText}>Support a Specific Event</Text>
                        <Text style={styles.dropdownChevron}>{isDropdownOpen ? '▲' : '▼'}</Text>
                    </TouchableOpacity>
                    
                    {isDropdownOpen && (
                        <ScrollView style={styles.dropdownList} nestedScrollEnabled={true}>
                            {events.map((event, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.dropdownItem}
                                    onPress={() => {
                                        setSelectedEvent(event);
                                        setIsDropdownOpen(false);
                                    }}
                                >
                                    <Text style={styles.dropdownItemText}>{event}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    )}
                </View>
                
                <Image 
                    source={require('../../../../assets/75tolife.jpg')} 
                    style={styles.image}
                    resizeMode="contain"
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { 
      flex: 1, 
    },
    scrollContent: {
      flexGrow: 1,
    },
    text: {
      fontSize: 20,
      color: '#666',
      textAlign: 'center',
    },
    headerContainer: {
      backgroundColor: '#1e3a5f',
      paddingVertical: 20,
      paddingHorizontal: 30,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
    },
    headerText: {
      fontSize: 30,
      fontWeight: 'bold',
      color: '#fff',
      textAlign: 'center',
    },
    contentContainer: {
      flex: 1,
      paddingHorizontal: 20,
      paddingVertical: 20,
      backgroundColor: '#fff',
    },
    subheaderText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#1e3a5f',
      marginBottom: 15,
      textAlign: 'left',
    },
    bodyText: {
      fontSize: 16,
      color: '#333',
      lineHeight: 24,
      textAlign: 'left',
      marginBottom: 20,
    },
    dropdownContainer: {
      marginTop: 20,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#ddd',
      backgroundColor: '#fff',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    dropdownHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 15,
      paddingHorizontal: 20,
      backgroundColor: '#f5f5f5',
      borderRadius: 8,
    },
    dropdownHeaderText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
    },
    dropdownChevron: {
      fontSize: 14,
      color: '#1e3a5f',
      fontWeight: 'bold',
    },
    dropdownList: {
      maxHeight: 300,
      backgroundColor: '#fff',
    },
    dropdownItem: {
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#f0f0f0',
    },
    dropdownItemText: {
      fontSize: 16,
      color: '#666',
      textDecorationLine: 'underline',
    },
    image: {
      width: '100%',
      height: 300,
      marginTop: 20,
      borderRadius: 8,
    }
});
  