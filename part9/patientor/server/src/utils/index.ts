import { uuid } from 'uuidv4';
import { newPatient, Gender, BaseEntry, Entry, Diagnose, HealthCheckRating } from '../types';
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access*/
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */



const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseString = (text: any): string => {
  if (!text || !isString(text)) {
    throw new Error(`Incorrect or missing field ${text}`);
  }
  return text;
};

const parseGender = (param: any): Gender => {
  if (!param || !isGender(param)) {
    throw new Error(`Incorrect or missing field ${param}`);
  }
  return param;
};

const parseHealthCheckRating = (param: any): HealthCheckRating => {
  if (param === undefined || !isHealthCheckRating(param)) {
    throw new Error(`Incorrect or missing field ${param}`);
  }
  return param;
};

const toNewPatient = (obj: any): newPatient => {
  const newEntry: newPatient = {
    name: parseString(obj.name),
    dateOfBirth: parseString(obj.dateOfBirth),
    ssn: parseString(obj.ssn),
    gender: parseGender(obj.gender),
    occupation: parseString(obj.occupation)
  };

  return newEntry;
};

const parseDiagnoseCodes = (arr: any): Array<Diagnose['code']> => {
  if (!Array.isArray(arr)) {
    throw new Error(`Incorrect or missing field ${arr}`);
  }
  return arr.map(code => parseString(code));
};

const toNewEntry = (obj: any): Entry => {

  const newEntry: BaseEntry = {
    id: uuid(),
    description: parseString(obj.description),
    date: parseString(obj.date),
    specialist: parseString(obj.specialist),
    diagnosisCodes: obj.diagnosisCodes
      ? parseDiagnoseCodes(obj.diagnosisCodes)
      : []
  };

  switch (obj.type) {
  case 'HealthCheck': {
    return {
      ...newEntry,
      type: 'HealthCheck',
      healthCheckRating: parseHealthCheckRating(obj.healthCheckRating)
    };
  }
  case 'OccupationalHealthcare': {
    let entry: Entry = {
      ...newEntry,
      type: 'OccupationalHealthcare',
      employerName: parseString(obj.employerName)
    };

    if (obj.sickLeave) {
      entry = {
        ...entry,
        sickLeave: {
          startDate: parseString(obj.sickLeave.startDate),
          endDate: parseString(obj.sickLeave.endDate)
        }
      };
    }
    return entry;
  }
  case 'Hospital': {
    return {
      ...newEntry,
      type: 'Hospital',
      discharge: {
        date: parseString(obj.discharge.date),
        criteria: parseString(obj.discharge.criteria)
      }
    };
  }
  default: {
    throw new Error('Invalid entry');
  }
  }
};

export { toNewPatient, toNewEntry };
