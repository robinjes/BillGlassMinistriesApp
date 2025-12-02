import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Pressable, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { styles as mainStyles } from '../../styles/styles';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { fetchEvents } from '../../services/eventsService';
import { Event } from '../../types/events';

// Helper function to parse date strings with various formats
const parseDate = (dateString: string, referenceYear?: number, eventDate?: Date): Date | null => {
  if (!dateString) return null;
  
  const currentYear = referenceYear || new Date().getFullYear();
  const currentDate = new Date();
  
  // Clean up the string - remove day names and extra whitespace
  let cleaned = dateString.trim()
    .replace(/^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday),?\s*/i, '')
    .trim();
  
  // Handle abbreviated months (Sept. -> September, etc.)
  const monthAbbr: { [key: string]: string } = {
    'jan.': 'january', 'feb.': 'february', 'mar.': 'march', 'apr.': 'april',
    'may.': 'may', 'jun.': 'june', 'jul.': 'july', 'aug.': 'august',
    'sept.': 'september', 'sep.': 'september', 'oct.': 'october',
    'nov.': 'november', 'dec.': 'december'
  };
  
  for (const [abbr, full] of Object.entries(monthAbbr)) {
    cleaned = cleaned.replace(new RegExp(`^${abbr}\\s`, 'i'), full + ' ');
  }
  
  // Try to parse the date
  const months = [
    'january', 'february', 'march', 'april', 'may', 'june',
    'july', 'august', 'september', 'october', 'november', 'december'
  ];
  
  // Pattern: "Month Day" or "Month Day, Year"
  const match = cleaned.match(/^(\w+)\s+(\d+)(?:,\s*(\d{4}))?/i);
  if (match) {
    const monthName = match[1].toLowerCase();
    const day = parseInt(match[2], 10);
    let year = match[3] ? parseInt(match[3], 10) : currentYear;
    
    const monthIndex = months.findIndex(m => m.startsWith(monthName));
    if (monthIndex !== -1 && day > 0 && day <= 31) {
      // If we have an event date and no year specified, use smart year inference
      if (!match[3] && eventDate) {
        const eventYear = eventDate.getFullYear();
        const eventMonth = eventDate.getMonth();
        // If deadline month is after event month, assume previous year
        // Otherwise assume same year as event
        if (monthIndex > eventMonth) {
          year = eventYear - 1;
        } else {
          year = eventYear;
        }
      }
      
      const date = new Date(year, monthIndex, day);
      // If the date is in the past and no year was specified and no event date, try next year
      if (!match[3] && !eventDate && date < currentDate && date.getFullYear() === currentYear) {
        return new Date(year + 1, monthIndex, day);
      }
      return date;
    }
  }
  
  return null;
};

// Helper function to extract year from event date string
const extractYearFromEventDate = (eventDate: string): number | undefined => {
  const yearMatch = eventDate.match(/\b(20\d{2})\b/);
  if (yearMatch) {
    return parseInt(yearMatch[1], 10);
  }
  return undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function EvangelismEventsScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [filter, setFilter] = useState<'all' | 'open' | 'closed' | 'full'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'location' | 'type'>('date');
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load events from bundled JSON file
  useEffect(() => {
    const loadEvents = async () => {
      setIsLoading(true);
      try {
        const fetchedEvents = await fetchEvents();
        console.log('Fetched events in screen:', fetchedEvents);
        console.log('Number of events fetched:', fetchedEvents.length);
        setEvents(fetchedEvents);
      } catch (error) {
        console.error('Error loading events:', error);
        setEvents([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadEvents();
  }, []);

  // Process events to automatically close those past their deadline
  const processedEvents = useMemo(() => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Set to start of day for comparison
    
    return events.map(event => {
      // Only process events that are currently 'open' (don't override 'closed' or 'full')
      if (event.status !== 'open') {
        return event;
      }
      
      // Extract year from event date if available
      const eventYear = extractYearFromEventDate(event.date);
      
      // Parse the event date to help with deadline year inference
      const parsedEventDate = parseDate(event.date, eventYear);
      
      // Parse the deadline date, using event date for smart year inference
      const deadlineDate = parseDate(event.deadline, eventYear, parsedEventDate || undefined);
      
      if (deadlineDate) {
        deadlineDate.setHours(23, 59, 59, 999); // Set to end of deadline day
        // If deadline has passed, close the event
        if (deadlineDate < currentDate) {
          return {
            ...event,
            status: 'closed' as const
          };
        }
      }
      
      return event;
    });
  }, [events]); // Recalculate when events change

  const filteredEvents = processedEvents
    .filter(event => {
      if (filter === 'all') return true;
      return event.status === filter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          // Try to parse dates for sorting, fallback to string comparison
          const dateA = parseDate(a.date) || new Date(0);
          const dateB = parseDate(b.date) || new Date(0);
          return dateA.getTime() - dateB.getTime();
        case 'location':
          return a.location.localeCompare(b.location);
        case 'type':
          return a.type.localeCompare(b.type);
        default:
          return 0;
      }
    });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return '#4CAF50';
      case 'closed': return '#F44336';
      case 'full': return '#FF9800';
      default: return '#757575';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'open': return 'Open';
      case 'closed': return 'Closed';
      case 'full': return 'Full';
      default: return 'Unknown';
    }
  };

  // Combine main styles with event-specific styles
  const styles = { ...mainStyles, ...eventStyles };

  if (isLoading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', flex: 1 }]}>
        <ActivityIndicator size="large" color="#1e3a5f" />
        <Text style={{ marginTop: 16, color: '#6c757d' }}>Loading events...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.mainContentContainer}>
        {/* Header */}
        <View style={styles.missionSection}>
          <Text style={styles.missionTitle}>Upcoming Evangelism Events</Text>
          <View style={styles.yellowBar} />
          <Text style={styles.missionText}>
            Evangelism Events are the events put on by Bill Glass Ministries that occur Behind or Beyond the Walls. 
            They incorporate evangelism training and visiting correctional facilities such as prisons, jails, and 
            juvenile centers or work in conjunction with community events put in local communities. There are five (5) 
            types of Evangelism Events.
          </Text>
        </View>

        {/* Filter and Sort Controls */}
        <View style={styles.filterContainer}>
          <View style={styles.filterRow}>
            <Text style={styles.filterLabel}>Filter by Status:</Text>
            <View style={styles.filterButtons}>
              {(['all', 'open', 'closed', 'full'] as const).map((status) => (
                <TouchableOpacity
                  key={status}
                  style={[
                    styles.filterButton,
                    filter === status && styles.filterButtonActive
                  ]}
                  onPress={() => setFilter(status)}
                >
                  <Text style={[
                    styles.filterButtonText,
                    filter === status && styles.filterButtonTextActive
                  ]}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          <View style={styles.filterRow}>
            <Text style={styles.filterLabel}>Sort by:</Text>
            <View style={styles.filterButtons}>
              {(['date', 'location', 'type'] as const).map((sort) => (
                <TouchableOpacity
                  key={sort}
                  style={[
                    styles.filterButton,
                    sortBy === sort && styles.filterButtonActive
                  ]}
                  onPress={() => setSortBy(sort)}
                >
                  <Text style={[
                    styles.filterButtonText,
                    sortBy === sort && styles.filterButtonTextActive
                  ]}>
                    {sort.charAt(0).toUpperCase() + sort.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Events List */}
        <View style={styles.eventsList}>
          {filteredEvents.map((event) => (
            <TouchableOpacity
              key={event.id}
              style={styles.eventCard}
              onPress={() => setSelectedEvent(event)}
            >
              <View style={styles.eventHeader}>
                <Text style={styles.eventName}>{event.name}</Text>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(event.status) }]}>
                  <Text style={styles.statusText}>{getStatusText(event.status)}</Text>
                </View>
              </View>
              
              <View style={styles.eventDetails}>
                <Text style={styles.eventDate}>Event Date: {event.date}</Text>
                <Text style={styles.eventDeadline}>Registration Deadline: {event.deadline}</Text>
                <Text style={styles.eventLocation}>Location: {event.location}</Text>
                <Text style={styles.eventType}>Type: {event.type}</Text>
              </View>
              
              <Text style={styles.eventDescription} numberOfLines={3}>
                {event.description}
              </Text>
              
              {event.stats && (
                <View style={styles.eventStats}>
                  <Text style={styles.statsTitle}>Event Results:</Text>
                  <View style={styles.statsGrid}>
                    <Text style={styles.statItem}>Teammates: {event.stats.teammates}</Text>
                    <Text style={styles.statItem}>Rookies: {event.stats.rookies}</Text>
                    <Text style={styles.statItem}>Conversations: {event.stats.conversations}</Text>
                    <Text style={styles.statItem}>New Believers: {event.stats.newBelievers}</Text>
                    <Text style={styles.statItem}>Repented: {event.stats.repented}</Text>
                    <Text style={styles.statItem}>Trained: {event.stats.trained}</Text>
                  </View>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Disclaimer Text */}
        <View style={styles.disclaimerContainer}>
          <Text style={styles.disclaimerText}>
            <Text style={styles.disclaimerBold}>PLEASE READ{'\n\n'}</Text>
            Our events have a limited number of spots and once one is claimed, it cannot be released. Be mindful when you register that if you are not able to serve, you could be taking another volunteer's opportunity to do so. We ask that all registrants be 100% committed to attending.{'\n\n'}
            If an emergency prevents your participation, contact the National Support Center immediately at 972.298.1101.
          </Text>
        </View>

        {/* Event Detail Modal */}
        <Modal
          visible={selectedEvent !== null}
          transparent
          animationType="fade"
          onRequestClose={() => setSelectedEvent(null)}
        >
          <Pressable style={styles.modalOverlay} onPress={() => setSelectedEvent(null)}>
            <View style={styles.modalContent}>
              {selectedEvent && (
                <View>
                  <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>{selectedEvent.name}</Text>
                    <TouchableOpacity
                      style={styles.closeButton}
                      onPress={() => setSelectedEvent(null)}
                    >
                      <Text style={styles.closeButtonText}>×</Text>
                    </TouchableOpacity>
                  </View>
                  
                  <ScrollView style={styles.modalBody}>
                    <View style={styles.modalDetails}>
                      <Text style={styles.modalDetailItem}>
                        <Text style={styles.modalDetailLabel}>Event Date:</Text> {selectedEvent.date}
                      </Text>
                      <Text style={styles.modalDetailItem}>
                        <Text style={styles.modalDetailLabel}>Registration Deadline:</Text> {selectedEvent.deadline}
                      </Text>
                      <Text style={styles.modalDetailItem}>
                        <Text style={styles.modalDetailLabel}>Location:</Text> {selectedEvent.location}
                      </Text>
                      <Text style={styles.modalDetailItem}>
                        <Text style={styles.modalDetailLabel}>Type:</Text> {selectedEvent.type}
                      </Text>
                      <Text style={styles.modalDetailItem}>
                        <Text style={styles.modalDetailLabel}>Status:</Text> {getStatusText(selectedEvent.status)}
                      </Text>
                    </View>
                    
                    <Text style={styles.modalDescription}>{selectedEvent.description}</Text>
                    
                    {selectedEvent.stats && (
                      <View style={styles.modalStats}>
                        <Text style={styles.modalStatsTitle}>Event Results:</Text>
                        <View style={styles.modalStatsGrid}>
                          <Text style={styles.modalStatItem}>Teammates: {selectedEvent.stats.teammates}</Text>
                          <Text style={styles.modalStatItem}>Rookies: {selectedEvent.stats.rookies}</Text>
                          <Text style={styles.modalStatItem}>Gospel Conversations: {selectedEvent.stats.conversations}</Text>
                          <Text style={styles.modalStatItem}>New Believers: {selectedEvent.stats.newBelievers}</Text>
                          <Text style={styles.modalStatItem}>Repented: {selectedEvent.stats.repented}</Text>
                          <Text style={styles.modalStatItem}>Trained to Share: {selectedEvent.stats.trained}</Text>
                        </View>
                      </View>
                    )}
                    
                    {/* Registration Button - Show for all events */}
                    <View style={styles.modalRegistrationContainer}>
                      <TouchableOpacity
                        style={styles.registrationButton}
                        onPress={() => {
                          setSelectedEvent(null);
                          navigation.navigate('Event Registration', { eventId: selectedEvent.id });
                        }}
                      >
                        <Text style={styles.registrationButtonText}>Register</Text>
                      </TouchableOpacity>
                    </View>
                  </ScrollView>
                </View>
              )}
            </View>
          </Pressable>
        </Modal>
      </View>
    </ScrollView>
  );
}

const eventStyles = StyleSheet.create({
  filterContainer: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    flexWrap: 'wrap',
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e3a5f',
    marginRight: 15,
    minWidth: 120,
  },
  filterButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#dee2e6',
    marginRight: 8,
    marginBottom: 8,
  },
  filterButtonActive: {
    backgroundColor: '#1e3a5f',
    borderColor: '#1e3a5f',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#6c757d',
    fontWeight: '500',
  },
  filterButtonTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  eventsList: {
    marginBottom: 20,
  },
  eventCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e3a5f',
    flex: 1,
    marginRight: 12,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  eventDetails: {
    marginBottom: 12,
  },
  eventDate: {
    fontSize: 14,
    color: '#495057',
    marginBottom: 4,
    fontWeight: '500',
  },
  eventDeadline: {
    fontSize: 14,
    color: '#495057',
    marginBottom: 4,
    fontWeight: '500',
  },
  eventLocation: {
    fontSize: 14,
    color: '#495057',
    marginBottom: 4,
    fontWeight: '500',
  },
  eventType: {
    fontSize: 14,
    color: '#495057',
    marginBottom: 4,
    fontWeight: '500',
  },
  eventDescription: {
    fontSize: 14,
    color: '#6c757d',
    lineHeight: 20,
  },
  eventStats: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  statsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1e3a5f',
    marginBottom: 8,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  statItem: {
    fontSize: 12,
    color: '#495057',
    marginRight: 16,
    marginBottom: 4,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    maxHeight: '80%',
    width: '100%',
    maxWidth: 500,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e3a5f',
    flex: 1,
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 18,
    color: '#6c757d',
    fontWeight: 'bold',
  },
  modalBody: {
    padding: 20,
  },
  modalDetails: {
    marginBottom: 20,
  },
  modalDetailItem: {
    fontSize: 14,
    color: '#495057',
    marginBottom: 8,
    lineHeight: 20,
  },
  modalDetailLabel: {
    fontWeight: 'bold',
    color: '#1e3a5f',
  },
  modalDescription: {
    fontSize: 14,
    color: '#6c757d',
    lineHeight: 20,
    marginBottom: 20,
  },
  modalStats: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
  },
  modalStatsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e3a5f',
    marginBottom: 12,
  },
  modalStatsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  modalStatItem: {
    fontSize: 13,
    color: '#495057',
    marginRight: 16,
    marginBottom: 6,
    fontWeight: '500',
    minWidth: '45%',
  },
  modalRegistrationContainer: {
    marginTop: 16,
    marginBottom: 8,
  },
  registrationButton: {
    backgroundColor: '#1e3a5f', // Blue background
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  registrationButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disclaimerContainer: {
    padding: 20,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  disclaimerText: {
    fontSize: 11,
    color: '#F44336',
    lineHeight: 16,
    textAlign: 'left',
  },
  disclaimerBold: {
    fontWeight: 'bold',
  },
});
