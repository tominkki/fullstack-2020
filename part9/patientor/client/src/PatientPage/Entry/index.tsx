import React from 'react';
import { Entry } from '../../types';

interface EntryDataProps {
  entry: Entry;
}

const EntryData: React.FC<EntryDataProps> = ({ entry }) => (
  <div>
    <p>{entry.date} <i>{entry.description}</i></p>
    {entry.diagnosisCodes ?
      <ul>
      {entry.diagnosisCodes.map(code => 
        <li key={code}>{code}</li>
        )}
    </ul>
    : null  
    }
  </div>
);

export default EntryData;
