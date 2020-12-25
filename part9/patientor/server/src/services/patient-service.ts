import { uuid } from 'uuidv4';
import patients from '../data/patients';
import { Patient, newPatient, PublicPatient } from '../types';

const removeSSN = (patient: Patient): PublicPatient => {
    const { id, name, dateOfBirth, gender, occupation } = patient;
    return {
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    };
};

const getPatients = (): PublicPatient[] => (
    patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }))
);

const getPatient = (id: string): Patient => {
  const [ patient ] = patients.filter(p =>
    p.id === id
  );

  if (!patient) {
    throw new Error('Invalid id');
  }

  return patient;
};

const addPatient = (
    patient: newPatient
): PublicPatient => {
    const addedPatient: Patient = {
        ...patient,
        id: uuid(),
        entries: []
    };
    patients.push(addedPatient);
    return removeSSN(addedPatient);
};

export default { getPatients, addPatient, getPatient };
