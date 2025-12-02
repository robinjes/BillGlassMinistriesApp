import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { styles as mainStyles } from '../../styles/styles';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { fetchEventById } from '../../services/eventsService';
import { Event } from '../../types/events';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type EventRegistrationScreenRouteProp = RouteProp<RootStackParamList, 'Event Registration'>;

export default function EventRegistrationScreen() {
  const route = useRoute<EventRegistrationScreenRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const eventId = route.params?.eventId || '1';
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEventInfoOpen, setIsEventInfoOpen] = useState(false);
  const [isImportantInfoOpen, setIsImportantInfoOpen] = useState(false);
  const [isContactInfoOpen, setIsContactInfoOpen] = useState(false);
  const [isTravelInfoOpen, setIsTravelInfoOpen] = useState(false);
  
  useEffect(() => {
    const loadEvent = async () => {
      setIsLoading(true);
      try {
        const eventData = await fetchEventById(eventId);
        setEvent(eventData || null);
      } catch (error) {
        console.error('Error loading event:', error);
        setEvent(null);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadEvent();
  }, [eventId]);

  if (isLoading) {
    return (
      <View style={[mainStyles.container, { justifyContent: 'center', alignItems: 'center', flex: 1 }]}>
        <ActivityIndicator size="large" color="#1e3a5f" />
        <Text style={{ marginTop: 16, color: '#6c757d' }}>Loading event...</Text>
      </View>
    );
  }

  if (!event) {
    return (
      <ScrollView style={mainStyles.container}>
        <View style={mainStyles.mainContentContainer}>
          <Text style={mainStyles.bodyText}>Event not found.</Text>
        </View>
      </ScrollView>
    );
  }

  const registrationInfo = event.registrationInfo;
  const formattedDate = event.formattedDate || event.date;

  // Simple description rendering - just show the text with basic formatting
  // Use registrationDescription if available, otherwise fall back to description
  const renderDescription = () => {
    const desc = event.registrationDescription || event.description;
    if (desc.includes('click here')) {
      const parts = desc.split('click here');
      return (
        <Text style={styles.descriptionText}>
          {parts[0]}
          <Text 
            style={styles.linkText}
            onPress={() => navigation.navigate('Who Can Serve on a Bill Glass Behind the Walls Event?')}
          >
            click here
          </Text>
          <Text style={styles.redText}>{parts[1]}</Text>
        </Text>
      );
    }
    return <Text style={styles.descriptionText}>{desc}</Text>;
  };

  return (
    <ScrollView style={mainStyles.container}>
      {/* Header with blue background - spans full width */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>{event.name}</Text>
        <Text style={styles.headerDate}>{formattedDate}</Text>
      </View>
      
      {/* Description text below header */}
      <View style={styles.descriptionContainer}>
        {renderDescription()}
      </View>
      
      {/* Event Information Header with Buttons */}
      <View style={styles.actionHeaderContainer}>
        <TouchableOpacity 
          style={styles.eventInfoHeader}
          onPress={() => setIsEventInfoOpen(!isEventInfoOpen)}
          activeOpacity={0.7}
        >
          <View style={styles.eventInfoTextContainer}>
            <Text style={styles.eventInfoHeaderText}>Event</Text>
            <Text style={styles.eventInfoHeaderText}>Information</Text>
          </View>
          <View style={[styles.chevronContainer, isEventInfoOpen && styles.chevronContainerOpen]}>
            <Text style={styles.dropdownChevron}>{isEventInfoOpen ? '▲' : '▼'}</Text>
          </View>
        </TouchableOpacity>
        
        <View style={styles.buttonsContainer}>
          {registrationInfo?.showRegisterButton !== false && (
            <TouchableOpacity 
              style={styles.registerButton}
              onPress={() => {
                // Handle register action
              }}
            >
              <Text style={styles.registerButtonText}>Register for Event!</Text>
            </TouchableOpacity>
          )}
          
          <View style={styles.supportButtonContainer}>
            <TouchableOpacity 
              style={styles.supportButton}
              onPress={() => {
                navigation.navigate('Support a Specific Event');
              }}
            >
              <Text style={styles.supportButtonText}>Support this Event!</Text>
            </TouchableOpacity>
            <Text style={styles.supportButtonHelperText}>
              Find the specific event you want to support in the list
            </Text>
          </View>
        </View>
      </View>
      
      {/* Collapsible Event Information Content */}
      {isEventInfoOpen && registrationInfo && (
        <View style={styles.eventInfoContent}>
          {/* Behind the Walls Section */}
          {registrationInfo.behindTheWalls && (
            <View style={styles.infoSection}>
              <Text style={styles.infoSubheader}>Behind the Walls</Text>
              <Text style={styles.infoText}>
                {registrationInfo.behindTheWalls.date}, {registrationInfo.behindTheWalls.time}
              </Text>
              {registrationInfo.behindTheWalls.note && (
                <Text style={styles.infoNoteText}>{registrationInfo.behindTheWalls.note}</Text>
              )}
            </View>
          )}

          {/* Registration Deadline Section */}
          {registrationInfo.registrationDeadline && (
            <View style={styles.infoSection}>
              <Text style={styles.infoSubheader}>Registration Deadline</Text>
              <Text style={styles.infoText}>{registrationInfo.registrationDeadline}</Text>
            </View>
          )}

          {/* Equip & Ignite Training Section */}
          {registrationInfo.equipIgniteTraining && (
            <View style={styles.infoSection}>
              <Text style={styles.infoSubheader}>Equip & Ignite Training</Text>
              {registrationInfo.equipIgniteTraining.instruction && (
                <Text style={styles.infoText}>{registrationInfo.equipIgniteTraining.instruction}</Text>
              )}
              <Text style={styles.infoText}>{registrationInfo.equipIgniteTraining.date}</Text>
              <Text style={styles.infoText}>{registrationInfo.equipIgniteTraining.location}</Text>
              <Text style={styles.infoText}>{registrationInfo.equipIgniteTraining.address}</Text>
              <Text style={styles.infoText}>{registrationInfo.equipIgniteTraining.city}</Text>
            </View>
          )}

          {/* Registration Fee Section */}
          {registrationInfo.registrationFee && (
            <View style={styles.infoSection}>
              <Text style={styles.infoSubheader}>Registration Fee - {registrationInfo.registrationFee}</Text>
            </View>
          )}
        </View>
      )}

      {/* Important Information Section */}
      {registrationInfo?.importantInformation && (
        <View style={styles.sectionContainer}>
          <TouchableOpacity 
            style={styles.sectionHeaderButton}
            onPress={() => setIsImportantInfoOpen(!isImportantInfoOpen)}
            activeOpacity={0.7}
          >
            <Text style={styles.sectionHeader}>Important Information</Text>
            <View style={[styles.chevronContainer, isImportantInfoOpen && styles.chevronContainerOpen]}>
              <Text style={styles.dropdownChevron}>{isImportantInfoOpen ? '▲' : '▼'}</Text>
            </View>
          </TouchableOpacity>
          {isImportantInfoOpen && (
            <View style={styles.sectionContent}>
              <Text style={styles.sectionText}>{registrationInfo.importantInformation}</Text>
            </View>
          )}
        </View>
      )}

      {/* Contact Information Section */}
      {registrationInfo?.contactInformation && (
        <View style={styles.sectionContainer}>
          <TouchableOpacity 
            style={styles.sectionHeaderButton}
            onPress={() => setIsContactInfoOpen(!isContactInfoOpen)}
            activeOpacity={0.7}
          >
            <Text style={styles.sectionHeader}>Contact Information</Text>
            <View style={[styles.chevronContainer, isContactInfoOpen && styles.chevronContainerOpen]}>
              <Text style={styles.dropdownChevron}>{isContactInfoOpen ? '▲' : '▼'}</Text>
            </View>
          </TouchableOpacity>
          {isContactInfoOpen && (
            <View style={styles.sectionContent}>
              {registrationInfo.contactInformation.eventAdministrator && (
                <View style={styles.contactItem}>
                  <Text style={styles.contactLabel}>Event Administrator:</Text>
                  <Text style={styles.contactValue}>{registrationInfo.contactInformation.eventAdministrator}</Text>
                </View>
              )}
              {registrationInfo.contactInformation.phone && (
                <View style={styles.contactItem}>
                  <Text style={styles.contactLabel}>Phone:</Text>
                  <Text style={styles.contactValue}>{registrationInfo.contactInformation.phone}</Text>
                </View>
              )}
              {registrationInfo.contactInformation.eventDirector && (
                <View style={styles.contactItem}>
                  <Text style={styles.contactLabel}>Event Director:</Text>
                  <Text style={styles.contactValue}>{registrationInfo.contactInformation.eventDirector}</Text>
                </View>
              )}
            </View>
          )}
        </View>
      )}

      {/* Travel Information Section */}
      {registrationInfo?.travelInformation && (
        <View style={styles.sectionContainer}>
          <TouchableOpacity 
            style={styles.sectionHeaderButton}
            onPress={() => setIsTravelInfoOpen(!isTravelInfoOpen)}
            activeOpacity={0.7}
          >
            <Text style={styles.sectionHeader}>Travel Information</Text>
            <View style={[styles.chevronContainer, isTravelInfoOpen && styles.chevronContainerOpen]}>
              <Text style={styles.dropdownChevron}>{isTravelInfoOpen ? '▲' : '▼'}</Text>
            </View>
          </TouchableOpacity>
          {isTravelInfoOpen && (
            <View style={styles.sectionContent}>
              <Text style={styles.sectionText}>{registrationInfo.travelInformation}</Text>
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#1e3a5f',
    padding: 24,
    paddingVertical: 24,
    width: '100%',
    alignItems: 'center',
    marginBottom: 0,
    borderRadius: 0,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  headerDate: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  descriptionContainer: {
    padding: 20,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  descriptionText: {
    fontSize: 16,
    color: '#000',
    lineHeight: 24,
  },
  linkText: {
    color: '#6c757d',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  redText: {
    color: '#F44336',
    fontSize: 16,
  },
  actionHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  eventInfoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  eventInfoTextContainer: {
    marginRight: 8,
  },
  eventInfoHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e3a5f',
  },
  dropdownChevron: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonsContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  registerButton: {
    backgroundColor: '#1e3a5f',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginLeft: 12,
    marginBottom: 12,
    minWidth: 180,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  supportButtonContainer: {
    alignItems: 'flex-end',
  },
  supportButton: {
    backgroundColor: '#f7b731',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginLeft: 12,
    minWidth: 180,
  },
  supportButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  supportButtonHelperText: {
    color: '#6c757d',
    fontSize: 12,
    marginTop: 6,
    marginLeft: 12,
    textAlign: 'right',
    fontStyle: 'italic',
    width: 180,
    lineHeight: 16,
  },
  eventInfoContent: {
    padding: 20,
    backgroundColor: '#fff',
  },
  infoSection: {
    marginBottom: 24,
  },
  infoSubheader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e3a5f',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 16,
    color: '#495057',
    lineHeight: 24,
    marginBottom: 4,
  },
  infoNoteText: {
    fontSize: 14,
    color: '#6c757d',
    fontStyle: 'italic',
    marginTop: 4,
  },
  sectionContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  sectionHeaderButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 18,
    paddingHorizontal: 20,
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e3a5f',
    letterSpacing: 0.3,
  },
  sectionContent: {
    padding: 20,
    backgroundColor: '#fff',
  },
  chevronContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1e3a5f',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chevronContainerOpen: {
    backgroundColor: '#2c5282',
  },
  sectionText: {
    fontSize: 16,
    color: '#495057',
    lineHeight: 24,
  },
  contactItem: {
    marginBottom: 12,
  },
  contactLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e3a5f',
    marginBottom: 4,
  },
  contactValue: {
    fontSize: 16,
    color: '#495057',
    lineHeight: 24,
  },
});
