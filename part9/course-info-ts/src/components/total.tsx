import React from 'react';
import { CourseParts } from '../types';

const Total: React.FC<CourseParts> = ({ courseParts }) => (
  <div>
    <p>
            Number of exercises {courseParts.reduce((acc, curr) => acc + curr.exerciseCount, 0)}
    </p>
  </div>
);

export default Total;
