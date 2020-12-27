import React from 'react';
import { useStateValue } from '../../state';
import { Entry } from '../../types';

interface EntryDataProps {
  entry: Entry;
}

const EntryData: React.FC<EntryDataProps> = ({ entry }) => {

  const [{ diagnosis }] = useStateValue();
  
  return (
    <div>
      <p>{entry.date} <i>{entry.description}</i></p>
      {entry.diagnosisCodes ?
        <ul>
        {entry.diagnosisCodes.map(code => 
          <li key={code}><b>{code} </b>{diagnosis[code] ? diagnosis[code].name : null}</li>
          )}
      </ul>
      : null  
      }
    </div>
  );
};

export default EntryData;
