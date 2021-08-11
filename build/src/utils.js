"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewEntry = exports.toNewPatientEntry = exports.censorPatient = void 0;
const types_1 = require("./types");
const uuid_1 = require("uuid");
const censorPatient = ({ id, name, dateOfBirth, travelClass, dietaryRequirements, entries, seatNumber, rating }) => {
    return { id, name, dateOfBirth, entries, travelClass, seatNumber, dietaryRequirements, rating };
};
exports.censorPatient = censorPatient;
const toNewPatientEntry = ({ name, confirmNumber, dateOfBirth, travelClass, seatNumber, dietaryRequirements, rating }) => {
    const newPatient = {
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
};
exports.toNewPatientEntry = toNewPatientEntry;
const isString = (text) => {
    return typeof text === "string" || text instanceof String;
};
const parseString = (text, field) => {
    if (!text || !isString(text) || text.trim() === "") {
        throw new Error(`Invalid or missing ${field}`);
    }
    return text.trim();
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
const toNewEntry = (object) => {
    const baseEntry = {
        id: uuid_1.v4(),
        travelClass: parseTravelClass(object.travelClass),
        date: parseDateOfBirth(object.date),
        route: parseString(object.route, "route"),
    };
    if (!object.type || !isString(object.type)) {
        throw new Error(`Missing or invalid entry type`);
    }
    return Object.assign({}, baseEntry);
};
exports.toNewEntry = toNewEntry;
