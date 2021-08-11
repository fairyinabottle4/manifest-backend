import patientData from '../../data/patients'
import { censorPatient } from "../utils";
import {v1 as uuid} from 'uuid'
import { Patient, CensoredPatient, NewPatientEntry } from '../types'
import { BaseEntry } from '../types'

const patients: Array<Patient> = patientData

const id = uuid()

const getPatients = (): CensoredPatient[] => {
  return patients.map((patient) => censorPatient(patient));
}

const getSinglePatient = (id: string): Patient => {
  const patient = patients.find(p => p.id === id)
  if (!patient) {
    throw new Error('Patient not found')
  } else {
    return patient
  }
}

const addPatient = ( entry: NewPatientEntry ): Patient => {
  //at this point, the backend will query database if passenger has past experience 
  //with the airline. If yes, the previous rating score will be fetched. 

  //For now, this will be a random number
  const rating = Math.floor(Math.random() * 5)
  const newPatient = {
    id: id,
    ...entry,
    rating
  };
  patients.push(newPatient);
  return newPatient;
}

const addEntry = (patientId: string, entry: BaseEntry): BaseEntry => {

  const patient: Patient | undefined = getSinglePatient(patientId);
  if (!patient) {
    throw new Error(`Incorrect patient id`);
  }

  patient.entries.push(entry);

  return entry;
};


export default {
  getPatients,
  addPatient,
  getSinglePatient,
  addEntry
}