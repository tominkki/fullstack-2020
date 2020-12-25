import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import { Patient } from '../types';
import { useStateValue, updatePatient } from '../state';
import { apiBaseUrl } from '../constants';

import { Icon } from 'semantic-ui-react';
import EntryData from './Entry';

const PatientPage: React.FC = () => {

  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const patient = patients[id];

  const getPatient = async (id: string): Promise<void> => {
    try {
      const res = await axios
          .get<Patient>(`${apiBaseUrl}/patients/${id}`);
      
          dispatch(updatePatient(res.data));
    } catch ({ message }) {
      console.log(message);
    }
  } ;

  const genderIcon = (patient: Patient) => {
    switch (patient.gender) {
      case 'male':
        return 'mars';
      case 'female':
        return 'venus';
      case 'other':
        return 'genderless';
      default:
        return 'question circle';
    }
  };

  useEffect(() => {
    if (!patient || !patient.ssn) {
      getPatient(id);
    }
  }, []);

  if (!patient || !patient.entries) return null;

  return (
    <div>
      <h1>
        {patient.name}
        <Icon name={genderIcon(patient)}/>
      </h1>
      <ul> 
        <li>SSN: {patient.ssn}</li>
        <li>Born: {patient.dateOfBirth}</li>
        <li>Occupation: {patient.occupation}</li>
      </ul>
      {patient.entries.length !== 0 ?
        patient.entries.map(entry => 
          <EntryData key={entry.id} entry={entry}/>
          )
        : null
      }
    </div>
  );
};

export default PatientPage;
