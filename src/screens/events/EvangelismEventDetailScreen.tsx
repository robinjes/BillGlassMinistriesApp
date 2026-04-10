import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Linking,
  useWindowDimensions,
} from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { WebView } from 'react-native-webview';
import { styles as mainStyles } from '../../styles/styles';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { fetchEventById } from '../../services/eventsService';
import type { Event, EventStatus } from '../../types/events';

type Nav = NativeStackNavigationProp<RootStackParamList>;
type R = RouteProp<RootStackParamList, 'Evangelism Event Detail'>;

function statusLabel(s: EventStatus): string {
  switch (s) {
    case 'OPEN':
      return 'Open';
    case 'FULL':
      return 'Full';
    case 'CLOSED':
      return 'Closed';
    default:
      return 'Unknown';
  }
}

function statusColor(s: EventStatus): string {
  switch (s) {
    case 'OPEN':
      return '#4CAF50';
    case 'FULL':
      return '#FF9800';
    case 'CLOSED':
      return '#F44336';
    default:
      return '#757575';
  }
}

function wrapDetailsHtml(fragment: string): string {
  return `<!DOCTYPE html>
<html><head>
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
<style>
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 12px; color: #1e3a5f; font-size: 15px; line-height: 1.45; margin: 0; }
  img { max-width: 100%; height: auto; }
  a { color: #1e3a5f; }
  hr { border: none; border-top: 1px solid #ccc; margin: 12px 0; }
</style></head><body>${fragment}</body></html>`;
}

export default function EvangelismEventDetailScreen() {
  const navigation = useNavigation<Nav>();
  const { params } = useRoute<R>();
  const { width } = useWindowDimensions();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      const e = await fetchEventById(params.eventId);
      if (!cancelled) {
        setEvent(e);
        setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [params.eventId]);

  const openOrWeb = (url: string, title: string) => {
    navigation.navigate('Event WebView', { url, title });
  };

  if (loading) {
    return (
      <View style={[mainStyles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#1e3a5f" />
        <Text style={styles.muted}>Loading event…</Text>
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

  const reg = event.registration;
  const loc = event.location;
  const htmlBlock = event.detailsHtml
    ? wrapDetailsHtml(event.detailsHtml)
    : '<p style="color:#6c757d">No additional details were captured for this event.</p>';
  const webHeight = Math.min(520, Math.round(width * 1.2));

  return (
    <ScrollView style={mainStyles.container}>
      <View style={mainStyles.mainContentContainer}>
        {event.heroImageUrl ? (
          <Image source={{ uri: event.heroImageUrl }} style={styles.hero} resizeMode="cover" />
        ) : null}

        <Text style={styles.title}>{event.title}</Text>
        <View style={styles.row}>
          <View style={[styles.badge, { backgroundColor: statusColor(event.status) }]}>
            <Text style={styles.badgeText}>{statusLabel(event.status)}</Text>
          </View>
        </View>

        {event.startDateText ? (
          <Text style={styles.meta}>
            <Text style={styles.metaLabel}>Event date: </Text>
            {event.startDateText}
            {event.endDateText ? ` - ${event.endDateText}` : ''}
          </Text>
        ) : null}
        {event.deadlineText ? (
          <Text style={styles.meta}>
            <Text style={styles.metaLabel}>Registration deadline: </Text>
            {event.deadlineText}
          </Text>
        ) : null}

        {loc ? (
          <View style={styles.locBox}>
            <Text style={styles.sectionTitle}>Location</Text>
            {loc.venueName ? <Text style={styles.body}>{loc.venueName}</Text> : null}
            {loc.addressLine1 ? <Text style={styles.body}>{loc.addressLine1}</Text> : null}
            {loc.addressLine2 ? <Text style={styles.body}>{loc.addressLine2}</Text> : null}
            {loc.city ? <Text style={styles.body}>{loc.city}</Text> : null}
            {loc.state || loc.postalCode ? (
              <Text style={styles.body}>
                {[loc.state, loc.postalCode].filter(Boolean).join(' ')}
              </Text>
            ) : null}
            {loc.googleMapsUrl ? (
              <TouchableOpacity onPress={() => Linking.openURL(loc.googleMapsUrl!)}>
                <Text style={styles.link}>Open in Maps</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        ) : null}

        {event.summary ? (
          <View style={styles.summaryBox}>
            <Text style={styles.sectionTitle}>Summary</Text>
            <Text style={styles.body}>{event.summary}</Text>
          </View>
        ) : null}

        <View style={styles.actions}>
          {reg?.registerUrl ? (
            <>
              <TouchableOpacity style={styles.primaryBtn} onPress={() => openOrWeb(reg.registerUrl!, 'Register')}>
                <Text style={styles.primaryBtnText}>Register</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.secondaryBtn} onPress={() => Linking.openURL(reg.registerUrl!)}>
                <Text style={styles.secondaryBtnText}>Open registration in browser</Text>
              </TouchableOpacity>
            </>
          ) : null}
          {reg?.supportUrl ? (
            <>
              <TouchableOpacity style={styles.supportBtn} onPress={() => openOrWeb(reg.supportUrl!, 'Support')}>
                <Text style={styles.supportBtnText}>Support this event</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Linking.openURL(reg.supportUrl!)}>
                <Text style={styles.secondaryBtnText}>Open support in browser</Text>
              </TouchableOpacity>
            </>
          ) : null}
          <TouchableOpacity onPress={() => Linking.openURL(event.detailUrl)}>
            <Text style={styles.link}>View on behindthewalls.com</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Event details</Text>
        <WebView
          originWhitelist={['*']}
          source={{ html: htmlBlock }}
          style={[styles.webview, { height: webHeight }]}
          scrollEnabled
          nestedScrollEnabled
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  centered: { justifyContent: 'center', alignItems: 'center', flex: 1 },
  muted: { marginTop: 12, color: '#6c757d' },
  hero: { width: '100%', height: 180, borderRadius: 12, marginBottom: 16, backgroundColor: '#e9ecef' },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1e3a5f',
    marginBottom: 10,
    textAlign: 'center',
    width: '100%',
  },
  row: { flexDirection: 'row', marginBottom: 12, justifyContent: 'center' },
  badge: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12 },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  meta: { fontSize: 15, color: '#495057', marginBottom: 6 },
  metaLabel: { fontWeight: '700', color: '#1e3a5f' },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1e3a5f',
    marginTop: 8,
    marginBottom: 8,
    textAlign: 'center',
    width: '100%',
  },
  body: { fontSize: 15, color: '#495057', lineHeight: 22 },
  locBox: { marginBottom: 12, padding: 12, backgroundColor: '#f8f9fa', borderRadius: 8 },
  summaryBox: { marginBottom: 16 },
  link: { fontSize: 15, color: '#2c5282', textDecorationLine: 'underline', marginTop: 6 },
  actions: { marginBottom: 20, gap: 10 },
  primaryBtn: {
    backgroundColor: '#1e3a5f',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  supportBtn: {
    backgroundColor: '#f7b731',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  supportBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  secondaryBtn: { paddingVertical: 8, alignItems: 'center' },
  secondaryBtnText: { color: '#6c757d', fontSize: 14 },
  webview: { width: '100%', marginBottom: 24, borderRadius: 8, overflow: 'hidden', backgroundColor: '#fff' },
});
