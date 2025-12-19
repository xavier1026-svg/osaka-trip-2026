export enum ActivityType {
  Transport = 'TRANSPORT',
  Food = 'FOOD',
  Sightseeing = 'SIGHTSEEING',
  Shopping = 'SHOPPING',
  Accommodation = 'ACCOMMODATION',
  Other = 'OTHER'
}

export interface Location {
  name: string;
  address: string;
  lat?: number;
  lng?: number;
}

export interface ItineraryItem {
  id: string;
  startTime: string;
  endTime?: string;
  title: string;
  description?: string;
  location?: Location;
  type: ActivityType;
  transportMethod?: 'Train' | 'Walk' | 'Taxi' | 'Bus' | 'Plane';
  cost?: string;
  notes?: string;
}

export interface DaySchedule {
  date: string;
  dayLabel: string;
  weatherForecast: {
    tempHigh: number;
    tempLow: number;
    condition: 'Sunny' | 'Cloudy' | 'Rain' | 'Snow';
    advisory: string;
  };
  items: ItineraryItem[];
}

export interface ExpenseItem {
    id: string;
    title: string;
    amountJPY: number;
    amountTWD: number;
    category: 'Food' | 'Transport' | 'Shopping' | 'Other';
    date: string;
}

export interface ChecklistItem {
    id: string;
    label: string;
    checked: boolean;
    category: 'Luggage' | 'Gift';
}

export type ViewState = 'home' | 'schedule' | 'money' | 'bag' | 'concierge';

export type Tab = 'home' | 'schedule' | 'concierge';