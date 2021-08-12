"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../../data/patients"));
const utils_1 = require("../utils");
const uuid_1 = require("uuid");
const types_1 = require("../types");
const patients = patients_1.default;
const id = uuid_1.v1();
const getPatients = () => {
    return patients.map((patient) => utils_1.censorPatient(patient));
};
const getSinglePatient = (id) => {
    const patient = patients.find(p => p.id === id);
    if (!patient) {
        throw new Error('Patient not found');
    }
    else {
        return patient;
    }
};
const addPatient = (entry) => {
    //at this point, the backend will query database if passenger has past experience 
    //with the airline. If yes, the previous rating score will be fetched. Likewise with
    //the frequent flyer status
    //For now, this will be a random number
    const rating = Math.floor(Math.random() * 5);
    //For now, frequent flyer status is determined by class of travel. 
    if (entry.travelClass !== types_1.TravelClass.Economy) {
        let frequentFlyer;
        if (entry.travelClass === types_1.TravelClass.First) {
            frequentFlyer = types_1.FrequentFlyer.Platinum;
        }
        else if (entry.travelClass === types_1.TravelClass.Business) {
            frequentFlyer = types_1.FrequentFlyer.Gold;
        }
        else if (entry.travelClass === types_1.TravelClass.PremiumEconomy) {
            frequentFlyer = types_1.FrequentFlyer.Silver;
        }
        else {
            frequentFlyer = types_1.FrequentFlyer.Silver;
        }
        const newPatient = Object.assign(Object.assign({ id: id }, entry), { rating,
            frequentFlyer });
        patients.push(newPatient);
        return newPatient;
    }
    else {
        const newPatient = Object.assign(Object.assign({ id: id }, entry), { rating });
        patients.push(newPatient);
        return newPatient;
    }
};
const addEntry = (patientId, entry) => {
    const patient = getSinglePatient(patientId);
    if (!patient) {
        throw new Error(`Incorrect patient id`);
    }
    patient.entries.push(entry);
    return entry;
};
exports.default = {
    getPatients,
    addPatient,
    getSinglePatient,
    addEntry
};
