import { uuid } from 'uuidv4';
import patientData from '../data/patients';
import { Patient, newPatient, PublicPatient, Entry } from '../types';

let patients = patientData;

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
  patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }))
);

const getPatient = (id: string): Patient => {
  const [ patient ] = patients.filter(p => p.id === id
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

const addEntry = (id: string, entry: Entry): Patient => {
  const patient = getPatient(id);
  const updated = {
    ...patient,
    entries: [ ...patient.entries, entry ]
  };

  patients = patients.map(elem => (
    elem.id === id ? updated : elem
  ));

  return updated;
};

export default { getPatients, addPatient, getPatient, addEntry };
