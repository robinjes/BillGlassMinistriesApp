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
import { eventStatusColor, eventStatusLabel } from '../../utils/eventStatus';

const US_STATES = [
  { code: 'AL', name: 'Alabama' },
  { code: 'CA', name: 'California' },
  { code: 'CO', name: 'Colorado' },
  { code: 'FL', name: 'Florida' },
  { code: 'GA', name: 'Georgia' },
  { code: 'IN', name: 'Indiana' },
  { code: 'LA', name: 'Louisiana' },
  { code: 'MI', name: 'Michigan' },
  { code: 'MO', name: 'Missouri' },
  { code: 'OH', name: 'Ohio' },
  { code: 'OK', name: 'Oklahoma' },
  { code: 'SC', name: 'South Carolina' },
  { code: 'TX', name: 'Texas' },
  { code: 'WI', name: 'Wisconsin' },
] as const;

const isAfricaEvent = (event: Event) => /Africa DOC/i.test(event.title);

const getEventStateCodes = (event: Event): string[] => {
  const codes = new Set<string>();
  const title = event.title;

  for (const match of title.matchAll(/,\s*([A-Z]{2})(?:\s|$|-)/g)) {
    codes.add(match[1]);
  }

  const multiState = title.match(/\b([A-Z]{2})-([A-Z]{2})\b/);
  if (multiState) {
    codes.add(multiState[1]);
    codes.add(multiState[2]);
  }

  if (/Ohio/i.test(title)) codes.add('OH');
  if (/\bFL\b|Florida/i.test(title)) codes.add('FL');
  if (
    /Dallas-Fort Worth|DFW|\bTX\b|Beaumont|Burnet|Henderson, TX|Houston|Huntsville, TX|New Boston|Richmond, TX/i.test(
      title,
    )
  ) {
    codes.add('TX');
  }
  if (/Oklahoma City/i.test(title)) codes.add('OK');

  if (event.location?.state) {
    codes.add(event.location.state.toUpperCase());
  }

  return [...codes];
};

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
    'january', 'february', 'march', 'april', 'may', 'june',
    'july', 'august', 'september', 'october', 'november', 'december',
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
  const rangeMatch = dateString.match(/^(\w+)\s+(\d+)-(\d+)/i);
  if (rangeMatch) {
    const monthIndex = months.findIndex((m) => m.startsWith(rangeMatch[1].toLowerCase()));
    const day = parseInt(rangeMatch[2], 10);
    if (monthIndex !== -1) return new Date(new Date().getFullYear(), monthIndex, day);
  }
  return null;
};

type OrderMode = 'allByDate' | 'alphabetical' | 'usByDate' | 'byState';

function EventListLine({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <Text style={localStyles.eventLine}>
      <Text style={localStyles.eventLineLabel}>{label}: </Text>
      {value}
    </Text>
  );
}

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function EvangelismEventsScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [filter, setFilter] = useState<'all' | EventStatus>('all');
  const [orderMode, setOrderMode] = useState<OrderMode>('usByDate');
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false);
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
    let list = events.filter((e) => filter === 'all' || e.status === filter);

    if (orderMode === 'usByDate' || orderMode === 'byState') {
      list = list.filter((e) => !isAfricaEvent(e));
    }

    if (orderMode === 'byState' && selectedState) {
      list = list.filter((e) => getEventStateCodes(e).includes(selectedState));
    }

    list = [...list].sort((a, b) => {
      if (orderMode === 'alphabetical') {
        return a.title.localeCompare(b.title);
      }
      if (orderMode === 'allByDate') {
        const byOrder = (a.listOrder ?? Number.MAX_SAFE_INTEGER) - (b.listOrder ?? Number.MAX_SAFE_INTEGER);
        if (a.listOrder != null && b.listOrder != null) return byOrder;
        const da = parseDate(a.startDateText || '') || new Date(0);
        const db = parseDate(b.startDateText || '') || new Date(0);
        return da.getTime() - db.getTime();
      }
      return (a.listOrder ?? Number.MAX_SAFE_INTEGER) - (b.listOrder ?? Number.MAX_SAFE_INTEGER);
    });

    return list;
  }, [events, filter, orderMode, selectedState]);

  const selectedStateName =
    US_STATES.find((state) => state.code === selectedState)?.name ?? null;

  const getStatusColor = eventStatusColor;
  const getStatusText = eventStatusLabel;

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
            <View style={localStyles.orderControls}>
              <View style={localStyles.orderControlsTopRow}>
                <TouchableOpacity
                  style={[
                    localStyles.orderControl,
                    orderMode === 'allByDate' && localStyles.orderControlActive,
                  ]}
                  onPress={() => {
                    setOrderMode('allByDate');
                    setSelectedState(null);
                    setIsStateDropdownOpen(false);
                  }}
                >
                  <Text
                    style={[
                      localStyles.orderControlText,
                      orderMode === 'allByDate' && localStyles.orderControlTextActive,
                    ]}
                  >
                    Events by Date
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    localStyles.orderControl,
                    orderMode === 'alphabetical' && localStyles.orderControlActive,
                  ]}
                  onPress={() => {
                    setOrderMode('alphabetical');
                    setSelectedState(null);
                    setIsStateDropdownOpen(false);
                  }}
                >
                  <Text
                    style={[
                      localStyles.orderControlText,
                      orderMode === 'alphabetical' && localStyles.orderControlTextActive,
                    ]}
                  >
                    Events Alphabetically
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    localStyles.orderControl,
                    orderMode === 'usByDate' && localStyles.orderControlActive,
                  ]}
                  onPress={() => {
                    setOrderMode('usByDate');
                    setSelectedState(null);
                    setIsStateDropdownOpen(false);
                  }}
                >
                  <Text
                    style={[
                      localStyles.orderControlText,
                      orderMode === 'usByDate' && localStyles.orderControlTextActive,
                    ]}
                  >
                    US Events by Date
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={localStyles.stateDropdownWrap}>
                <TouchableOpacity
                  style={[
                    localStyles.orderControl,
                    localStyles.stateDropdownTrigger,
                    orderMode === 'byState' && localStyles.orderControlActive,
                  ]}
                  onPress={() => {
                    setOrderMode('byState');
                    setIsStateDropdownOpen((open) => !open);
                  }}
                >
                  <Text
                    style={[
                      localStyles.orderControlText,
                      localStyles.stateDropdownLabel,
                      orderMode === 'byState' && localStyles.orderControlTextActive,
                    ]}
                  >
                    {selectedStateName ?? 'Choose a State'}
                  </Text>
                  <View style={localStyles.stateDropdownChevron}>
                    <Text style={localStyles.stateDropdownChevronText}>
                      {isStateDropdownOpen ? '▲' : '▼'}
                    </Text>
                  </View>
                </TouchableOpacity>

                {isStateDropdownOpen ? (
                  <ScrollView style={localStyles.stateDropdownList} nestedScrollEnabled>
                    <TouchableOpacity
                      style={localStyles.stateDropdownItem}
                      onPress={() => {
                        setSelectedState(null);
                        setOrderMode('byState');
                        setIsStateDropdownOpen(false);
                      }}
                    >
                      <Text style={localStyles.stateDropdownItemText}>All states</Text>
                    </TouchableOpacity>
                    {US_STATES.map((state) => (
                      <TouchableOpacity
                        key={state.code}
                        style={[
                          localStyles.stateDropdownItem,
                          selectedState === state.code && localStyles.stateDropdownItemActive,
                        ]}
                        onPress={() => {
                          setSelectedState(state.code);
                          setOrderMode('byState');
                          setIsStateDropdownOpen(false);
                        }}
                      >
                        <Text
                          style={[
                            localStyles.stateDropdownItemText,
                            selectedState === state.code && localStyles.stateDropdownItemTextActive,
                          ]}
                        >
                          {state.name}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                ) : null}
              </View>
            </View>
          </View>
        </View>

        <View style={localStyles.eventsList}>
          {filteredEvents.length === 0 ? (
            <Text style={localStyles.emptyListText}>No events match the current filters.</Text>
          ) : null}
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
                <EventListLine label="Event date" value={event.startDateText} />
              ) : null}
              {event.deadlineText ? (
                <EventListLine label="Registration deadline" value={event.deadlineText} />
              ) : null}
              {event.location?.city ? (
                <EventListLine label="Location" value={event.location.city} />
              ) : event.location?.venueName ? (
                <EventListLine label="Venue" value={event.location.venueName} />
              ) : null}
              <EventListLine label="Teammates Needed" value={event.teammatesNeeded} />
              <EventListLine label="Bikers" value={event.bikers} />
              <EventListLine label="Facility Type" value={event.facilityType} />
              {event.status === 'OPEN' && event.registration?.registerUrl ? (
                <Text style={localStyles.eventRegisterHint}>Registration is open — tap for details to sign up</Text>
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
    alignItems: 'flex-start',
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
  orderControls: {
    flex: 1,
    minWidth: 0,
    gap: 6,
  },
  orderControlsTopRow: {
    flexDirection: 'row',
    gap: 4,
  },
  orderControl: {
    flex: 1,
    minWidth: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e9ecef',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 10,
    minHeight: 44,
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  orderControlActive: {
    backgroundColor: '#1e3a5f',
    borderColor: '#1e3a5f',
  },
  orderControlText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#1e3a5f',
    textAlign: 'center',
  },
  orderControlTextActive: {
    color: '#fff',
  },
  stateDropdownWrap: {
    width: '100%',
    position: 'relative',
    zIndex: 10,
  },
  stateDropdownTrigger: {
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
  },
  stateDropdownLabel: {
    flex: 1,
    flexShrink: 1,
    textAlign: 'left',
    fontSize: 13,
    paddingRight: 8,
  },
  stateDropdownChevron: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#1e3a5f',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  stateDropdownChevronText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
  },
  stateDropdownList: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    marginTop: 4,
    maxHeight: 220,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#dee2e6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 4,
  },
  stateDropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  stateDropdownItemActive: {
    backgroundColor: '#f8f9fa',
  },
  stateDropdownItemText: {
    fontSize: 14,
    color: '#1e3a5f',
    fontWeight: '500',
  },
  stateDropdownItemTextActive: {
    fontWeight: '700',
  },
  eventsList: {
    marginBottom: 20,
  },
  emptyListText: {
    fontSize: 15,
    color: '#6c757d',
    textAlign: 'center',
    paddingVertical: 24,
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
  eventLine: {
    fontSize: 14,
    color: '#495057',
    marginBottom: 4,
    lineHeight: 20,
  },
  eventLineLabel: {
    fontWeight: '700',
    color: '#1e3a5f',
  },
  eventRegisterHint: {
    fontSize: 13,
    color: '#4CAF50',
    fontWeight: '600',
    marginTop: 8,
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





