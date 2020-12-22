import React from 'react';
import { CourseParts } from '../types';

const Content: React.FC<CourseParts> = ({ courseParts }) => (
  <div>
    {courseParts.map(part => 
      <p key={part.name}>
        {part.name} {part.exerciseCount}
      </p>
    )}
  </div>
);

export default Content;
