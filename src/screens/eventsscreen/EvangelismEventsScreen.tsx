import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Pressable } from 'react-native';
import { styles } from '../../styles/styles';

interface Event {
  id: string;
  name: string;
  date: string;
  deadline: string;
  description: string;
  status: 'open' | 'closed' | 'full';
  location: string;
  type: 'DOC' | 'Special Ops' | 'Northeast' | 'Christmas';
  stats?: {
    teammates: number;
    rookies: number;
    conversations: number;
    newBelievers: number;
    repented: number;
    trained: number;
  };
}

const eventsData: Event[] = [
  {
    id: '1',
    name: 'Sacramento, CA August DOC',
    date: 'August 9',
    deadline: 'June 22',
    description: 'We trained 55 Teammates including 13 Rookies who had 845 Gospel conversations behind the walls. 216 inmates began relationships with Jesus and another 190 repented and returned to Him! We were also able to train 64 to share the Good News.',
    status: 'closed',
    location: 'Sacramento, CA',
    type: 'DOC',
    stats: {
      teammates: 55,
      rookies: 13,
      conversations: 845,
      newBelievers: 216,
      repented: 190,
      trained: 64
    }
  },
  {
    id: '2',
    name: 'Lesotho, Africa DOC',
    date: 'August 11-17',
    deadline: 'July 27',
    description: 'Schedule: Arrive in Lesotho: Friday, August 8, Equip & Ignite Training: Sunday, August 10, Behind the Walls: Monday-Sunday, August 11-17, Depart from Lesotho: Monday, August 18',
    status: 'closed',
    location: 'Lesotho, Africa',
    type: 'DOC'
  },
  {
    id: '3',
    name: 'Nashville, TN DOC',
    date: 'Friday, August 22',
    deadline: 'June 1',
    description: 'We trained 37 Teammates including 10 Rookies who had 130 Gospel conversations behind the walls. 18 inmates began relationships with Jesus and another 30 repented and returned to Him! We were also able to train 26 to share the Good News.',
    status: 'closed',
    location: 'Nashville, TN',
    type: 'DOC',
    stats: {
      teammates: 37,
      rookies: 10,
      conversations: 130,
      newBelievers: 18,
      repented: 30,
      trained: 26
    }
  },
  {
    id: '4',
    name: 'DFW, TX West DOC',
    date: 'August 23',
    deadline: 'July 13',
    description: 'We trained 89 Teammates including 20 Rookies who had 718 Gospel conversations behind the walls. 139 inmates began relationships with Jesus and another 265 repented and returned to Him! We were also able to train 165 to share the Good News.',
    status: 'closed',
    location: 'DFW, TX',
    type: 'DOC',
    stats: {
      teammates: 89,
      rookies: 20,
      conversations: 718,
      newBelievers: 139,
      repented: 265,
      trained: 165
    }
  },
  {
    id: '5',
    name: 'Fresno, CA August DOC',
    date: 'August 23',
    deadline: 'July 13',
    description: 'We trained 82 Teammates including 21 Rookies who had 680 Gospel conversations behind the walls. 148 inmates began relationships with Jesus and another 232 repented and returned to Him! We were also able to train 62 to share the Good News.',
    status: 'closed',
    location: 'Fresno, CA',
    type: 'DOC',
    stats: {
      teammates: 82,
      rookies: 21,
      conversations: 680,
      newBelievers: 148,
      repented: 232,
      trained: 62
    }
  },
  {
    id: '6',
    name: 'Chillicothe, OH DOC',
    date: 'August 30',
    deadline: 'July 20',
    description: 'We trained 73 Teammates including 21 Rookies who had 612 Gospel conversations behind the walls. 74 inmates began relationships with Jesus and another 119 repented and returned to Him! We were also able to train 84 to share the Good News.',
    status: 'closed',
    location: 'Chillicothe, OH',
    type: 'DOC',
    stats: {
      teammates: 73,
      rookies: 21,
      conversations: 612,
      newBelievers: 74,
      repented: 119,
      trained: 84
    }
  },
  {
    id: '7',
    name: 'San Francisco, CA DOC',
    date: 'September 6',
    deadline: 'August 3',
    description: 'REGISTRATION IS FULL',
    status: 'full',
    location: 'San Francisco, CA',
    type: 'DOC'
  },
  {
    id: '8',
    name: 'Teague, TX DOC',
    date: 'September 6',
    deadline: 'July 27',
    description: 'REGISTRATION IS CLOSED',
    status: 'closed',
    location: 'Teague, TX',
    type: 'DOC'
  },
  {
    id: '9',
    name: 'Chillicothe, MO DOC',
    date: 'September 13',
    deadline: 'August 10',
    description: 'REGISTRATION IS CLOSED',
    status: 'closed',
    location: 'Chillicothe, MO',
    type: 'DOC'
  },
  {
    id: '10',
    name: 'Adrian, MI DOC',
    date: 'September 20',
    deadline: 'August 31',
    description: 'REGISTRATION IS CLOSED',
    status: 'closed',
    location: 'Adrian, MI',
    type: 'DOC'
  },
  {
    id: '11',
    name: 'Cincinnati, OH DOC',
    date: 'September 20',
    deadline: 'August 10',
    description: 'REGISTRATION IS CLOSED',
    status: 'closed',
    location: 'Cincinnati, OH',
    type: 'DOC'
  },
  {
    id: '12',
    name: 'Malawi, Africa DOC',
    date: 'September 25-27',
    deadline: 'September 7',
    description: 'Schedule: Arrive in Malawi: Monday, September 22, Equip & Ignite Training: Wednesday, September 24, Behind the Walls: Thursday-Saturday, September 25-27, Depart from Malawi: Sunday, September 28',
    status: 'closed',
    location: 'Malawi, Africa',
    type: 'DOC'
  },
  {
    id: '13',
    name: 'San Diego, CA DOC',
    date: 'Friday, September 26',
    deadline: 'July 20',
    description: 'REGISTRATION IS CLOSED',
    status: 'closed',
    location: 'San Diego, CA',
    type: 'DOC'
  },
  {
    id: '14',
    name: 'Beaumont, TX DOC',
    date: 'September 27',
    deadline: 'August 24',
    description: 'REGISTRATION IS CLOSED',
    status: 'closed',
    location: 'Beaumont, TX',
    type: 'DOC'
  },
  {
    id: '15',
    name: 'Milton, FL DOC',
    date: 'October 4',
    deadline: 'September 14',
    description: 'We need 100+ Teammates including 25 Bikes to take the Gospel behind the walls of a men\'s correctional facility. If you are a female and would like to serve on this event, click here to see if you are eligible. Additional security form required to serve. More information on Event Info page.',
    status: 'open',
    location: 'Milton, FL',
    type: 'DOC'
  },
  {
    id: '16',
    name: 'Palestine, TX DOC',
    date: 'October 4',
    deadline: 'August 31',
    description: 'REGISTRATION IS CLOSED',
    status: 'closed',
    location: 'Palestine, TX',
    type: 'DOC'
  },
  {
    id: '17',
    name: 'Springfield, MO DOC',
    date: 'October 11',
    deadline: 'September 21',
    description: 'We need 60 Teammates including 20 Bikes to take the Gospel behind the walls of a men\'s facility. If you are a male and would like to serve on this event, click here to see if you are eligible. Your registration will not be finalized until you complete the additional security form. More information on the Event Info page.',
    status: 'open',
    location: 'Springfield, MO',
    type: 'DOC'
  },
  {
    id: '18',
    name: 'Arizona DOC',
    date: 'Friday, October 17',
    deadline: 'September 21',
    description: 'We have spots for 70 Teammates including 5 motorcycles to take the Good News behind the walls of a Men\'s facility. If you are a female and would like to serve on this event, click here to see if you are eligible.',
    status: 'open',
    location: 'Arizona',
    type: 'DOC'
  },
  {
    id: '19',
    name: 'Crestview/Baker, FL DOC',
    date: 'October 18',
    deadline: 'September 7',
    description: 'We need 75 Teammates including 25 Bikes to take the Gospel behind the walls of a men\'s facility. If you are a female and would like to serve on this event, click here to see if you are eligible. Your registration will not be finalized until you complete the additional security form. More information on Event Info page.',
    status: 'open',
    location: 'Crestview/Baker, FL',
    type: 'DOC'
  },
  {
    id: '20',
    name: 'Oklahoma City Special Ops',
    date: 'October 18',
    deadline: 'September 14',
    description: 'We have spots for 55 Teammates to take the Gospel behind the walls of a men\'s facility. We will meet the morning of the event, board a bus, get trained on the way, and then take the Good News into the facility. Breakfast and dinner will be provided on the bus. If you are wanting to serve in a facility with the opposite gender, click here to see if you are eligible. Your registration will not be finalized until you complete the additional security form. More information on Event Info page.',
    status: 'open',
    location: 'Oklahoma City',
    type: 'Special Ops'
  },
  {
    id: '21',
    name: 'Fresno, CA October DOC',
    date: 'Friday, October 24',
    deadline: 'Wednesday, Sept. 10',
    description: 'We need 200 Teammates including 30 Bikes to take the Gospel behind the walls of 2 men\'s facilities. If you are a female and would like to serve on this event, click here to see if you are eligible. Your registration will not be finalized until you complete the additional security form. More information on Event Info page.',
    status: 'open',
    location: 'Fresno, CA',
    type: 'DOC'
  },
  {
    id: '22',
    name: 'Lake City, FL DOC',
    date: 'October 25',
    deadline: 'September 21',
    description: 'We need 60 Teammates including 10 Bikes to take the Gospel behind the walls of a men\'s facility. If you are a female and would like to serve on this event, click here to see if you are eligible. Your registration will not be finalized until you complete the additional security form. More information on Event Info page.',
    status: 'open',
    location: 'Lake City, FL',
    type: 'DOC'
  },
  {
    id: '23',
    name: 'Louisville, KY DOC',
    date: 'October 25',
    deadline: 'September 28',
    description: 'We need 110 Teammates, including 25 Bikes, to take the Good News behind the walls of one men\'s facility and one women\'s facility. If you wish to serve in a facility of the opposite gender, click here to see if you are eligible. Your registration will not be finalized until you complete the additional security steps. More information on the Event Info page',
    status: 'open',
    location: 'Louisville, KY',
    type: 'DOC'
  },
  {
    id: '24',
    name: 'Austin, TX November DOC',
    date: 'November 1',
    deadline: 'October 12',
    description: 'We have spots for 40 Teammates, including 15 motorcycles, to take the Good News of a men\'s correctional facility. If you are a female and would like to serve on this event, click here to see if you are eligible.',
    status: 'open',
    location: 'Austin, TX',
    type: 'DOC'
  },
  {
    id: '25',
    name: 'Nashville, TN November DOC',
    date: 'Friday, November 7',
    deadline: 'August 10',
    description: 'We have spots for 40 men and women Teammates to serve in a women\'s correctional facility. If you are a male and would like to serve on this event, click here to see if you are eligible.',
    status: 'open',
    location: 'Nashville, TN',
    type: 'DOC'
  },
  {
    id: '26',
    name: 'Little Rock, AR DOC',
    date: 'November 8',
    deadline: 'October 5',
    description: 'We have spots for 40 men and 20 women to take the Good News behind the walls of a regional detention center.',
    status: 'open',
    location: 'Little Rock, AR',
    type: 'DOC'
  },
  {
    id: '27',
    name: 'Winnsboro, TX DOC',
    date: 'November 8',
    deadline: 'October 12',
    description: 'We have spots for 50 Teammates including 5 Bikes. We will be serving in a men\'s correctional facility. If you are a female and would like to serve on this event, click here to see if you are eligible.',
    status: 'open',
    location: 'Winnsboro, TX',
    type: 'DOC'
  },
  {
    id: '28',
    name: 'Nashville, TN Northeast',
    date: 'November 15',
    deadline: 'October 12',
    description: 'We need 100 Teammates (men and women!) including 20 Bikes to take the Gospel behind the walls of a men\'s facility. If you are a female and would like to serve on this event, click here to see if you are eligible.',
    status: 'open',
    location: 'Nashville, TN',
    type: 'Northeast'
  },
  {
    id: '29',
    name: 'DFW, TX November DOC',
    date: 'November 22',
    deadline: 'October 21',
    description: 'We need 108 Teammates including 10 Bikes to take the Gospel behind the walls of two men\'s facilities. If you are a female and would like to serve on this event, click here to see if you are eligible. Your registration will not be finalized until you complete the additional security form. More information on Event Info page.',
    status: 'open',
    location: 'DFW, TX',
    type: 'DOC'
  },
  {
    id: '30',
    name: 'Dayton, TX Christmas DOC',
    date: 'December 13',
    deadline: 'November 9',
    description: 'We have spots for 50 Teammates (women and men!), including 10 motorcycles, to take the Good News behind the walls of a women\'s correctional facility. If you are a male and would like to serve on this event, click here to see if you are eligible.',
    status: 'open',
    location: 'Dayton, TX',
    type: 'Christmas'
  },
  {
    id: '31',
    name: 'Las Vegas, NV DOC',
    date: 'December 13',
    deadline: 'November 2',
    description: 'We have spots for 70 Teammates to take the Good News behind the walls of a detention facility that houses men and women. Your registration will not be finalized until you complete the additional security steps. More information on Event Info page.',
    status: 'open',
    location: 'Las Vegas, NV',
    type: 'DOC'
  },
  {
    id: '32',
    name: 'Fresno, CA February DOC',
    date: 'February 7, 2026',
    deadline: 'December 14',
    description: 'We have spots for 100 Teammates to take the Good News behind the walls of a county jail. Your registration will not be finalized until you complete the additional security steps. More information on Event Info page.',
    status: 'open',
    location: 'Fresno, CA',
    type: 'DOC'
  },
  {
    id: '33',
    name: 'Cook County, IL DOC',
    date: 'April 11, 2026',
    deadline: 'March 22',
    description: 'We have spots for 60 Teammates (male and female) to take the Good News behind the walls of Cook County Jail. A copy of your picture ID is required to serve. More information on event info page.',
    status: 'open',
    location: 'Cook County, IL',
    type: 'DOC'
  },
  {
    id: '34',
    name: 'Shreveport, LA DOC',
    date: 'May 23, 2026',
    deadline: 'April 19',
    description: 'We need 70 Teammates including 20 Bikes to take the Gospel behind the walls of a men\'s facility. If you are a female and would like to serve on this event, click here to see if you are eligible.',
    status: 'open',
    location: 'Shreveport, LA',
    type: 'DOC'
  }
];

export default function EvangelismEventsScreen() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [filter, setFilter] = useState<'all' | 'open' | 'closed' | 'full'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'location' | 'type'>('date');

  const filteredEvents = eventsData
    .filter(event => {
      if (filter === 'all') return true;
      return event.status === filter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
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
});

// Merge the event styles with the main styles
Object.assign(styles, eventStyles);
