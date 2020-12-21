import { uuid } from 'uuidv4';
import patients from '../data/patients.json';
import { Patient } from '../types';

const removeSSN = (patient: Patient): Omit<Patient, 'ssn'> => {
    const { id, name, dateOfBirth, gender, occupation } = patient;
    return {
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    };
};

const getPatients = (): Omit<Patient, 'ssn'>[] => (
    patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }))
);

const addPatient = (
    patient: Patient
): Omit<Patient, 'ssn'> => {
    const newPatient: Patient = {
        ...patient,
        id: uuid()
    };
    patients.push(newPatient);
    return removeSSN(newPatient);
};

export default { getPatients, addPatient };
