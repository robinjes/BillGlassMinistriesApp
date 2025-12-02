// Event type definitions
export interface Event {
  id: string;
  name: string;
  date: string;
  deadline: string;
  description: string; // Description shown in event card/list
  registrationDescription?: string; // Optional: Different description shown on registration page
  status: 'open' | 'closed' | 'full';
  location: string;
  type: 'DOC' | 'Special Ops' | 'Northeast' | 'Christmas' | 'Beyond the Walls' | 'Blitz';
  formattedDate?: string;
  stats?: {
    teammates: number;
    rookies: number;
    conversations: number;
    newBelievers: number;
    repented: number;
    trained: number;
  };
  registrationInfo?: {
    behindTheWalls?: {
      date: string;
      time: string;
      note?: string;
    };
    registrationDeadline?: string;
    equipIgniteTraining?: {
      instruction?: string;
      date: string;
      location: string;
      address: string;
      city: string;
    };
    registrationFee?: string;
    showRegisterButton?: boolean; // Optional: Set to false to hide the "Register for Event!" button (defaults to true)
    importantInformation?: string;
    contactInformation?: {
      eventAdministrator?: string;
      phone?: string;
      eventDirector?: string;
    };
    travelInformation?: string;
  };
}

