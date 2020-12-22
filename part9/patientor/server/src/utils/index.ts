import { newPatient } from '../types';
import { Gender } from '../types';
/* eslint-disable @typescript-eslint/no-explicit-any */

const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

const parseString = (text: any): string => {
    if(!text || !isString(text)) {
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

const toNewPatient = (obj: any): newPatient => {
    const newEntry: newPatient = {
        name: parseString(obj.name),
        dateOfBirth: parseString(obj.dateOfBirth),
        ssn: parseString(obj.ssn),
        gender: parseGender(obj.gender),
        occupation: parseString(obj.occupation)
    };

    return newEntry;
}

export { toNewPatient };
