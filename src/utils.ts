import {
  Patient,
  CensoredPatient,
  NewPatientEntry,
  BaseEntry,
  HealthCheckRating,
  Entry,
  Diagnosis,
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

type Fields = {name: unknown, ssn: unknown, dateOfBirth: unknown, travelClass: unknown, seatNumber: unknown, dietaryRequirements: unknown, rating: number};

export const toNewPatientEntry = ({name, ssn, dateOfBirth, travelClass, 
  seatNumber, dietaryRequirements, rating} : Fields): NewPatientEntry => {
  const newPatient: NewPatientEntry = {
    rating,
    name: parseString(name, "name"),
    ssn: parseString(ssn, "ssn"),
    seatNumber: parseString(seatNumber, "seat number"),
    travelClass: parseTravelClass(travelClass),
    dateOfBirth: parseDateOfBirth(dateOfBirth),
    entries: [],
    dietaryRequirements: parseString(dietaryRequirements, "meal type")
  };

  return newPatient;
}

const isString = (text: any): text is string => {
  // console.log(text)
  // console.log('world')
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

const parseArrayStringCodes = (data: any): Array<Diagnosis['code']> => {

  if (!data) {
    return [];
  }

  const codes: Array<Diagnosis['code']> = [];
  const error = '"diagnosisCodes" is an array of codes as string';

  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const dataCodes: Array<Diagnosis['code']> = typeof data === 'object' ? data : JSON.parse(data);
    if (!Array.isArray(dataCodes)) throw new Error(error);
    dataCodes.forEach((code) => {
      if (!isString(code)) {
        throw new Error(error);
      }
      codes.push(code);
    });

  } catch (error) {
    throw new Error(error);
  }

  return codes
};

const isRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseRating = (rating: any): HealthCheckRating => {
  if (!rating) {
    throw new Error(`Missing rating`);
  }
  const ratingNumber: number = parseInt(rating);
  if (isNaN(ratingNumber) || !isRating(ratingNumber)) {
    throw new Error(`Incorrect rating number: ${Object.values(HealthCheckRating).join(' | ')}`);
  }
  return ratingNumber;
};

export const toNewEntry = (object: any): Entry => {
  const baseEntry: BaseEntry = {
    id: uuid(),
    description: parseString(object.description, "description"),
    date: parseDateOfBirth(object.date),
    specialist: parseString(object.specialist, "specialist"),
    diagnosisCodes: parseArrayStringCodes(object.diagnosisCodes),
  };
  if (!object.type || !isString(object.type)) {
    throw new Error(`Missing or invalid entry type`);
  }
  switch (object.type) {
    case 'HealthCheck':
      return {
        ...baseEntry,
        type: 'HealthCheck',
        healthCheckRating: parseRating(object.healthCheckRating)
      };

    case 'Hospital':
      return {
        ...baseEntry,
        type: 'Hospital',
        discharge: {
          date: parseDateOfBirth(object.dischargeDate),
          criteria: parseString('dischargeCriteria', object.dischargeCriteria)
        }
      };

    case 'OccupationalHealthcare':
      let sickLeave;
      if (object.sickLeaveStartDate && object.sickLeaveEndDate) {
        sickLeave = {
          startDate: parseDateOfBirth(object.sickLeaveStartDate),
          endDate: parseDateOfBirth(object.sickLeaveEndDate)
        };
      }
      return {
        ...baseEntry,
        type: 'OccupationalHealthcare',
        employerName: parseString('employerName', object.employerName),
        sickLeave
      };

    default:
      throw new Error(`Incorrect entry type`);
  }
}; 

