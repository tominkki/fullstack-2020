import React from 'react';
import { CoursePart } from '../types';

const assertNever = (val: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(val)}`
  );
}

interface Part {
  part: CoursePart
}

const Part: React.FC<Part> = ({ part }) => {
  switch (part.name) {
  case "Fundamentals" : {
    return (
      <div>
        <b>{part.name} {part.exerciseCount}</b>
        <p>{part.description}</p>
      </div>
    );
  }
  case "Using props to pass data": {
    return (
      <div>
        <b>{part.name} {part.exerciseCount}</b>
        <p>Group Projects: {part.groupProjectCount}</p>
      </div>
    );
  }
  case "Deeper type usage": {
    return (
      <div>
        <b>{part.name} {part.exerciseCount}</b>
        <p>{part.description}</p>
        <a href={part.exerciseSubmissionLink}>Submission link</a>
      </div>
    );
  }
  case "My own part": {
    return (
      <div>
        <b>{part.name} {part.exerciseCount}</b>
        <p>{part.description}</p>
      </div>
    );
  }
  default: {
    return assertNever(part);
  }
  }
}

interface CourseParts {
  courseParts: Array<CoursePart>;
}

const Content: React.FC<CourseParts> = ({ courseParts }) => (
  <div>
    {courseParts.map(part => 
      <Part key={part.name} part={part}/>
    )}
  </div>
);

export default Content;
