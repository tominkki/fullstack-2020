import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import { Patient } from '../types';
import { useStateValue, updatePatient } from '../state';
import { apiBaseUrl } from '../constants';
import AddEntryModal from '../AddEntryModal';
import { EntryFormValues } from '../AddEntryModal/AddEntryForm';

import { Icon, Button } from 'semantic-ui-react';
import EntryData from './Entry';

const PatientPage: React.FC = () => {

  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const [ open, setOpen ] = React.useState<boolean>(false);
  const [ error, setError ] = React.useState<string | undefined>(undefined);
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

  React.useEffect(() => {
    if (!patient || !patient.ssn) {
      getPatient(id);
    }
  }, []);

  const openModal = (): void => setOpen(true);

  const closeModal = (): void => {
    setOpen(false);
    setError(undefined);
  };

  const submitEntry = async (values: EntryFormValues) => {
    try {
      const { data: patient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        { 
          ...values,
          type: 'HealthCheck',
          healthCheckRating: parseInt((values.healthCheckRating as unknown) as string)
        }
      );
      dispatch(updatePatient(patient));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data);
    }
  };

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
        <div>
          <h3>Entries:</h3>
          {patient.entries.map(entry => 
            <EntryData key={entry.id} entry={entry}/>
          )}
        </div>
        : null
      }
      <AddEntryModal
        modalOpen={open}
        onSubmit={submitEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
    </div>
  );
};

export default PatientPage;
