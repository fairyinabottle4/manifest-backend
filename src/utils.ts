import {
  Patient,
  CensoredPatient,
  NewPatientEntry,
  BaseEntry,
  TravelClass,
} from './types';

import { v4 as uuid } from 'uuid';

export const censorPatient = ({
  id,
  name,
  dateOfBirth,
  travelClass,
  dietaryRequirements,
  entries,
  seatNumber,
  rating
}: Patient): CensoredPatient => {
  return { id, name, dateOfBirth, entries, travelClass, seatNumber, dietaryRequirements, rating };
};

type Fields = {name: unknown, confirmNumber: unknown, dateOfBirth: unknown, travelClass: unknown, seatNumber: unknown, dietaryRequirements: string, rating: number};

export const toNewPatientEntry = ({name, confirmNumber, dateOfBirth, travelClass, 
  seatNumber, dietaryRequirements, rating} : Fields): NewPatientEntry => {
  const newPatient: NewPatientEntry = {
    rating,
    name: parseString(name, "name"),
    confirmNumber: parseString(confirmNumber, "confirmNumber"),
    seatNumber: parseString(seatNumber, "seat number"),
    travelClass: parseTravelClass(travelClass),
    dateOfBirth: parseDateOfBirth(dateOfBirth),
    entries: [],
    dietaryRequirements
  };

  return newPatient;
}

const isString = (text: any): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseString = (text: any, field: string): string => {
  if (!text || !isString(text) || text.trim() === "") {
    throw new Error(`Invalid or missing ${field}`);
  }
  return text.trim();
};

const isTravelClass = (travelClass: any): travelClass is TravelClass => {
  return Object.values(TravelClass).includes(travelClass);
};

const parseTravelClass = (travelClass: any): TravelClass => {
  if (!travelClass || !isTravelClass(travelClass) || !isString(travelClass)) {
    throw new Error(`Invalid or missing travel class`);
  }
  return travelClass;
};

const isDate = (date: any): boolean => {
  return Boolean(Date.parse(date));
};

const parseDateOfBirth = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Invalid or missing date of birth`);
  }
  return date.trim();
};

// const isRating = (param: number): param is HealthCheckRating => {
//   return Object.values(HealthCheckRating).includes(param);
// };

// const parseRating = (rating: any): HealthCheckRating => {
//   if (!rating) {
//     throw new Error(`Missing rating`);
//   }
//   const ratingNumber: number = parseInt(rating);
//   if (isNaN(ratingNumber) || !isRating(ratingNumber)) {
//     throw new Error(`Incorrect rating number: ${Object.values(HealthCheckRating).join(' | ')}`);
//   }
//   return ratingNumber;
// };

export const toNewEntry = (object: any): BaseEntry => {
  const baseEntry: BaseEntry = {
    id: uuid(),
    travelClass: parseTravelClass(object.travelClass),
    date: parseDateOfBirth(object.date),
    route: parseString(object.route, "route"),
  };
  if (!object.type || !isString(object.type)) {
    throw new Error(`Missing or invalid entry type`);
  }

  return {
    ...baseEntry
  };
}; 

