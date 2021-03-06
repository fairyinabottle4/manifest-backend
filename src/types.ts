export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
};

export interface MealType {
  code: string;
  name: string;
}

export enum TravelClass {
  First = "first",
  Business = "business",
  PremiumEconomy = "premium economy",
  Economy = "economy"
}

export enum FrequentFlyer {
  Silver = "silver",
  Gold = "gold",
  Platinum = "platinum"
}
  
export type CensoredPatient = Omit<Patient, "confirmNumber">;

export type NewPatientEntry = Omit<Patient, 'id'>;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}

export interface Patient {
  id: string;
  name: string;
  frequentFlyer?: FrequentFlyer;
  seatNumber: string;
  rating: number;
  confirmNumber: string;
  travelClass: TravelClass;
  dateOfBirth: string;
  entries: BaseEntry[];
  dietaryRequirements: string;
}

export type PublicPatient = Omit<Patient, 'confirmNumber' | 'entries' >

export type NewEntry = Omit<Entry, 'id'>

export interface BaseEntry {
  id: string;
  travelClass: TravelClass;
  date: string;
  route: string;
}
