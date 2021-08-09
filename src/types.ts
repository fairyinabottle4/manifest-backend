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
  
export type CensoredPatient = Omit<Patient, "ssn">;

export type NewPatientEntry = Omit<Patient, 'id'>;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}

export interface Patient {
  id: string;
  name: string;
  seatNumber: string;
  rating: number;
  ssn: string;
  travelClass: TravelClass;
  dateOfBirth: string;
  entries: Entry[];
  dietaryRequirements: string;
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >

export type NewEntry = Omit<Entry, 'id'>

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}


export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: {
    date: string;
    criteria: string;
  };
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}
