"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewEntry = exports.toNewPatientEntry = exports.censorPatient = void 0;
const types_1 = require("./types");
const uuid_1 = require("uuid");
const censorPatient = ({ id, name, dateOfBirth, gender, travelClass, dietaryRequirements, occupation, entries, seatNumber, rating }) => {
    return { id, name, dateOfBirth, gender, occupation, entries, travelClass, seatNumber, dietaryRequirements, rating };
};
exports.censorPatient = censorPatient;
const toNewPatientEntry = ({ name, ssn, dateOfBirth, gender, occupation, travelClass, seatNumber, dietaryRequirements, rating }) => {
    const newPatient = {
        rating,
        name: parseString(name, "name"),
        ssn: parseString(ssn, "ssn"),
        seatNumber: parseString(seatNumber, "seat number"),
        travelClass: parseTravelClass(travelClass),
        dateOfBirth: parseDateOfBirth(dateOfBirth),
        gender: parseGender(gender),
        occupation: parseString(occupation, "occupation"),
        entries: [],
        dietaryRequirements: parseString(dietaryRequirements, "meal type")
    };
    return newPatient;
};
exports.toNewPatientEntry = toNewPatientEntry;
const isString = (text) => {
    // console.log(text)
    // console.log('world')
    return typeof text === "string" || text instanceof String;
};
const parseString = (text, field) => {
    if (!text || !isString(text) || text.trim() === "") {
        throw new Error(`Invalid or missing ${field}`);
    }
    return text.trim();
};
// const isMealType = (mealType: any): mealType is MealType => {
//   return Object.values(MealType).includes(mealType);
// };
// const parseMealType = (mealType: any): MealType => {
//   if (!mealType || !isString(mealType) || !isMealType(mealType)) {
//     throw new Error(`Invalid or missing meal type`);
//   }
//   return mealType;
// };
const isGender = (gender) => {
    return Object.values(types_1.Gender).includes(gender);
};
const parseGender = (gender) => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error(`Invalid or missing gender`);
    }
    return gender;
};
const isTravelClass = (travelClass) => {
    return Object.values(types_1.TravelClass).includes(travelClass);
};
const parseTravelClass = (travelClass) => {
    if (!travelClass || !isTravelClass(travelClass) || !isString(travelClass)) {
        throw new Error(`Invalid or missing travel class`);
    }
    return travelClass;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const parseDateOfBirth = (date) => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error(`Invalid or missing date of birth`);
    }
    return date.trim();
};
const parseArrayStringCodes = (data) => {
    if (!data) {
        return [];
    }
    const codes = [];
    const error = '"diagnosisCodes" is an array of codes as string';
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const dataCodes = typeof data === 'object' ? data : JSON.parse(data);
        if (!Array.isArray(dataCodes))
            throw new Error(error);
        dataCodes.forEach((code) => {
            if (!isString(code)) {
                throw new Error(error);
            }
            codes.push(code);
        });
    }
    catch (error) {
        throw new Error(error);
    }
    return codes;
};
const isRating = (param) => {
    return Object.values(types_1.HealthCheckRating).includes(param);
};
const parseRating = (rating) => {
    if (!rating) {
        throw new Error(`Missing rating`);
    }
    const ratingNumber = parseInt(rating);
    if (isNaN(ratingNumber) || !isRating(ratingNumber)) {
        throw new Error(`Incorrect rating number: ${Object.values(types_1.HealthCheckRating).join(' | ')}`);
    }
    return ratingNumber;
};
const toNewEntry = (object) => {
    const baseEntry = {
        id: uuid_1.v4(),
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
            return Object.assign(Object.assign({}, baseEntry), { type: 'HealthCheck', healthCheckRating: parseRating(object.healthCheckRating) });
        case 'Hospital':
            return Object.assign(Object.assign({}, baseEntry), { type: 'Hospital', discharge: {
                    date: parseDateOfBirth(object.dischargeDate),
                    criteria: parseString('dischargeCriteria', object.dischargeCriteria)
                } });
        case 'OccupationalHealthcare':
            let sickLeave;
            if (object.sickLeaveStartDate && object.sickLeaveEndDate) {
                sickLeave = {
                    startDate: parseDateOfBirth(object.sickLeaveStartDate),
                    endDate: parseDateOfBirth(object.sickLeaveEndDate)
                };
            }
            return Object.assign(Object.assign({}, baseEntry), { type: 'OccupationalHealthcare', employerName: parseString('employerName', object.employerName), sickLeave });
        default:
            throw new Error(`Incorrect entry type`);
    }
};
exports.toNewEntry = toNewEntry;
