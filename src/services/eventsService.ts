// Events Service - Loads events directly from bundled JSON file
import { Event } from '../types/events';
import eventsData from '../data/events.json';

/**
 * Loads events directly from bundled events.json file
 * No API needed - events are bundled with the app
 */
export async function fetchEvents(): Promise<Event[]> {
  try {
    // Load events directly from bundled JSON file
    const data = eventsData as { events: Event[] } | Event[];
    
    console.log('Loaded events data:', data);
    
    // Handle both formats: { events: [...] } or [...]
    let events: Event[] = [];
    if (Array.isArray(data)) {
      events = data;
    } else if (data && typeof data === 'object' && 'events' in data && Array.isArray(data.events)) {
      events = data.events;
    }
    
    console.log('Parsed events:', events);
    console.log('Number of events:', events.length);
    
    return events;
  } catch (error) {
    console.error('Error loading events from JSON:', error);
    return [];
  }
}

/**
 * Fetches a single event by ID from events.json file
 * Returns null if not found
 */
export async function fetchEventById(eventId: string): Promise<Event | null> {
  try {
    const events = await fetchEvents();
    return events.find(e => e.id === eventId) || null;
  } catch (error) {
    console.error('Error loading event from JSON:', error);
    return null;
  }
}

