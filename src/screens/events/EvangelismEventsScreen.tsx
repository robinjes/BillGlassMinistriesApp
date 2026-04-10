import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { styles as mainStyles } from '../../styles/styles';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { fetchEventsResponse } from '../../services/eventsService';
import type { Event, EventStatus } from '../../types/events';

const parseDate = (dateString: string): Date | null => {
  if (!dateString) return null;
  let cleaned = dateString
    .trim()
    .replace(/^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday),?\s*/i, '')
    .trim();
  const monthAbbr: Record<string, string> = {
    'jan.': 'january',
    'feb.': 'february',
    'mar.': 'march',
    'apr.': 'april',
    'may.': 'may',
    'jun.': 'june',
    'jul.': 'july',
    'aug.': 'august',
    'sept.': 'september',
    'sep.': 'september',
    'oct.': 'october',
    'nov.': 'november',
    'dec.': 'december',
  };
  for (const [abbr, full] of Object.entries(monthAbbr)) {
    cleaned = cleaned.replace(new RegExp(`^${abbr}\\s`, 'i'), `${full} `);
  }
  const months = [
    'january',
    'february',
    'march',
    'april',
    'may',
    'june',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december',
  ];
  const match = cleaned.match(/^(\w+)\s+(\d+)(?:,\s*(\d{4}))?/i);
  if (match) {
    const monthName = match[1].toLowerCase();
    const day = parseInt(match[2], 10);
    const year = match[3] ? parseInt(match[3], 10) : new Date().getFullYear();
    const monthIndex = months.findIndex((m) => m.startsWith(monthName));
    if (monthIndex !== -1 && day > 0 && day <= 31) {
      return new Date(year, monthIndex, day);
    }
  }
  return null;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function EvangelismEventsScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [filter, setFilter] = useState<'all' | EventStatus>('all');
  const [sortBy, setSortBy] = useState<'date' | 'title'>('date');
  const [events, setEvents] = useState<Event[]>([]);
  const [feedUpdated, setFeedUpdated] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        const res = await fetchEventsResponse();
        setEvents(res.events);
        setFeedUpdated(res.updatedAt);
      } catch {
        setEvents([]);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  const filteredEvents = useMemo(() => {
    const list = events.filter((e) => (filter === 'all' ? true : e.status === filter));
    return list.sort((a, b) => {
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      const da = parseDate(a.startDateText || '') || new Date(0);
      const db = parseDate(b.startDateText || '') || new Date(0);
      return da.getTime() - db.getTime();
    });
  }, [events, filter, sortBy]);

  const getStatusColor = (status: EventStatus) => {
    switch (status) {
      case 'OPEN':
        return '#4CAF50';
      case 'CLOSED':
        return '#F44336';
      case 'FULL':
        return '#FF9800';
      default:
        return '#757575';
    }
  };

  const getStatusText = (status: EventStatus) => {
    switch (status) {
      case 'OPEN':
        return 'Open';
      case 'CLOSED':
        return 'Closed';
      case 'FULL':
        return 'Full';
      default:
        return 'Unknown';
    }
  };

  const styles = { ...mainStyles, ...localStyles };

  if (isLoading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', flex: 1 }]}>
        <ActivityIndicator size="large" color="#1e3a5f" />
        <Text style={{ marginTop: 16, color: '#6c757d' }}>Loading events…</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.mainContentContainer}>
        <View style={styles.missionSection}>
          <View style={styles.eventScreenTitleBlock}>
            <Text style={[styles.missionTitle, styles.eventScreenMissionTitle]}>Upcoming Evangelism Events</Text>
            <View style={styles.yellowBar} />
          </View>
          <Text style={styles.missionText}>
            Evangelism Events are hosted by Bill Glass Ministries behind or beyond the walls. Data below
            is synced from behindthewalls.com.
            {feedUpdated ? (
              <>
                {'\n\n'}
                <Text style={{ fontWeight: '600' }}>Last updated: </Text>
                {new Date(feedUpdated).toLocaleString()}
              </>
            ) : null}
          </Text>
        </View>

        <View style={localStyles.filterContainer}>
          <View style={localStyles.filterRow}>
            <Text style={localStyles.filterLabel}>Filter:</Text>
            <View style={localStyles.filterButtons}>
              {(['all', 'OPEN', 'FULL', 'CLOSED', 'UNKNOWN'] as const).map((status) => (
                <TouchableOpacity
                  key={status}
                  style={[localStyles.filterButton, filter === status && localStyles.filterButtonActive]}
                  onPress={() => setFilter(status)}
                >
                  <Text
                    style={[
                      localStyles.filterButtonText,
                      filter === status && localStyles.filterButtonTextActive,
                    ]}
                  >
                    {status === 'all' ? 'All' : getStatusText(status)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={localStyles.filterRow}>
            <Text style={localStyles.filterLabel}>Order:</Text>
            <View style={localStyles.filterButtons}>
              <TouchableOpacity
                style={[
                  localStyles.filterButton,
                  localStyles.sortOrderButton,
                  sortBy === 'date' && localStyles.filterButtonActive,
                ]}
                onPress={() => setSortBy('date')}
              >
                <Text
                  style={[
                    localStyles.filterButtonText,
                    localStyles.sortOrderButtonText,
                    sortBy === 'date' && localStyles.filterButtonTextActive,
                  ]}
                >
                  Events by Date
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  localStyles.filterButton,
                  localStyles.sortOrderButton,
                  sortBy === 'title' && localStyles.filterButtonActive,
                ]}
                onPress={() => setSortBy('title')}
              >
                <Text
                  style={[
                    localStyles.filterButtonText,
                    localStyles.sortOrderButtonText,
                    sortBy === 'title' && localStyles.filterButtonTextActive,
                  ]}
                >
                  Events Alphabetically
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={localStyles.eventsList}>
          {filteredEvents.map((event) => (
            <TouchableOpacity
              key={event.id}
              style={localStyles.eventCard}
              onPress={() => navigation.navigate('Evangelism Event Detail', { eventId: event.id })}
            >
              <View style={localStyles.eventHeader}>
                <Text style={localStyles.eventName}>{event.title}</Text>
                <View style={[localStyles.statusBadge, { backgroundColor: getStatusColor(event.status) }]}>
                  <Text style={localStyles.statusText}>{getStatusText(event.status)}</Text>
                </View>
              </View>
              {event.startDateText ? (
                <Text style={localStyles.eventDate}>Event date: {event.startDateText}</Text>
              ) : null}
              {event.deadlineText ? (
                <Text style={localStyles.eventDeadline}>Registration deadline: {event.deadlineText}</Text>
              ) : null}
              {event.location?.city ? (
                <Text style={localStyles.eventLocation}>Location: {event.location.city}</Text>
              ) : event.location?.venueName ? (
                <Text style={localStyles.eventLocation}>Venue: {event.location.venueName}</Text>
              ) : null}
              {event.summary ? (
                <Text style={localStyles.eventDescription} numberOfLines={3}>
                  {event.summary}
                </Text>
              ) : null}
            </TouchableOpacity>
          ))}
        </View>

        <View style={localStyles.disclaimerContainer}>
          <Text style={localStyles.disclaimerText}>
            <Text style={localStyles.disclaimerBold}>PLEASE READ{'\n\n'}</Text>
            Our events have a limited number of spots and once one is claimed, it cannot be released. Be
            mindful when you register that if you are not able to serve, you could be taking another
            volunteer&apos;s opportunity to do so. We ask that all registrants be 100% committed to
            attending.{'\n\n'}
            If an emergency prevents your participation, contact the National Support Center immediately at
            972.298.1101.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const localStyles = StyleSheet.create({
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
    minWidth: 56,
  },
  filterButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
  },
  filterButton: {
    paddingHorizontal: 12,
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
    fontSize: 13,
    color: '#6c757d',
    fontWeight: '500',
  },
  filterButtonTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  sortOrderButton: {
    paddingHorizontal: 14,
    minWidth: 0,
    flexGrow: 1,
    flexBasis: '45%',
  },
  sortOrderButtonText: {
    fontSize: 12,
    textAlign: 'center',
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
  eventDescription: {
    fontSize: 14,
    color: '#6c757d',
    lineHeight: 20,
    marginTop: 8,
  },
  disclaimerContainer: {
    padding: 20,
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





