import type { EventStatus } from '../types/events';

export function eventStatusLabel(status: EventStatus): string {
  switch (status) {
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

export function eventStatusColor(status: EventStatus): string {
  switch (status) {
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
