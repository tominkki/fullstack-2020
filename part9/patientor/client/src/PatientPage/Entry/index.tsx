import React from 'react';
import { Card, Icon } from 'semantic-ui-react';
import HealthRatingBar from '../../components/HealthRatingBar';
import { useStateValue } from '../../state';
import { Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthCareEntry } from '../../types';

interface EntryDataProps {
  entry: Entry;
}

const Hospital: React.FC<{entry: HospitalEntry}> = ({entry}) => {

  const [{ diagnosis }] = useStateValue();

  return (
    <Card fluid={true} raised={true}>
      <Card.Content>
        <Card.Header>
          <Icon floated='right' name='hospital' size='large'/>
          {entry.date}
        </Card.Header>
        <Card.Meta>
          {entry.description}
        </Card.Meta>
        <Card.Description>
            {entry.diagnosisCodes ?
            <ul>
            {entry.diagnosisCodes.map(code => 
              <li key={code}><b>{code} </b>{diagnosis[code] ? diagnosis[code].name : null}</li>
              )}
          </ul>
          : null  
          }
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

const Occupational: React.FC<{entry: OccupationalHealthCareEntry}> = ({entry}) => {

  const [{ diagnosis }] = useStateValue();

  return (
    <Card fluid={true} raised={true}>
      <Card.Content>
        <Card.Header>
          <Icon floated='right' name='stethoscope' size='large'/>
          {entry.date} {entry.employerName}
        </Card.Header>
        <Card.Meta>
          {entry.description}
        </Card.Meta>
        <Card.Description>
            {entry.diagnosisCodes ?
            <ul>
            {entry.diagnosisCodes.map(code => 
              <li key={code}><b>{code} </b>{diagnosis[code] ? diagnosis[code].name : null}</li>
              )}
          </ul>
          : null  
          }
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

const HealthCheck: React.FC<{entry: HealthCheckEntry}> = ({entry}) => {

  const [{ diagnosis }] = useStateValue();

  return (
    <Card fluid={true} raised={true}>
      <Card.Content>
        <Card.Header>
          <Icon floated='right' name='user md' size='large'/>
          {entry.date}
        </Card.Header>
        <Card.Meta>
          {entry.description}
        </Card.Meta>
        <Card.Description>
            {entry.diagnosisCodes ?
            <ul>
            {entry.diagnosisCodes.map(code => 
              <li key={code}><b>{code} </b>{diagnosis[code] ? diagnosis[code].name : null}</li>
              )}
          </ul>
          : null  
          }
        <HealthRatingBar showText={false} rating={entry.healthCheckRating}/>
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

const assertNever = (val: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(val)}`
  );
};

const EntryData: React.FC<EntryDataProps> = ({ entry }) => {
  switch (entry.type) {
    case 'Hospital':
      return <Hospital entry={entry}/>;
    case 'OccupationalHealthcare':
      return <Occupational entry={entry}/>;
    case 'HealthCheck':
      return <HealthCheck entry={entry}/>;
    default:
      return assertNever(entry);
  }
};

export default EntryData;
