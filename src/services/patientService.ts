import patientData from '../../data/patients'
import { censorPatient } from "../utils";
import {v1 as uuid} from 'uuid'
import { Patient, CensoredPatient, NewPatientEntry } from '../types'
import { BaseEntry, FrequentFlyer, TravelClass } from '../types'

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
  //with the airline. If yes, the previous rating score will be fetched. Likewise with
  //the frequent flyer status
  //For now, this will be a random number
  const rating = Math.floor(Math.random() * 5)
  //For now, frequent flyer status is determined by class of travel. 
  if (entry.travelClass !== TravelClass.Economy) {
    let frequentFlyer: FrequentFlyer;
    if (entry.travelClass === TravelClass.First) {
      frequentFlyer = FrequentFlyer.Platinum;
    } else if (entry.travelClass === TravelClass.Business) {
      frequentFlyer = FrequentFlyer.Gold;
    } else if (entry.travelClass === TravelClass.PremiumEconomy) {
      frequentFlyer = FrequentFlyer.Silver;
    } else {
      frequentFlyer = FrequentFlyer.Silver;
    }
    const newPatient = {
      id: id,
      ...entry,
      rating,
      frequentFlyer
    };
    patients.push(newPatient);
    return newPatient;  
  } else {
    const newPatient = {
      id: id,
      ...entry,
      rating
    };
    patients.push(newPatient);
    return newPatient;  
  }
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