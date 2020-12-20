import patients from '../data/patients.json';
import { Patient } from '../types';

const getPatients = (): Omit<Patient, 'ssn'>[] => (
    patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }))
);

export default { getPatients };
