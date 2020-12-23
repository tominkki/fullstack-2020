import React from 'react';
import { CoursePart } from '../types';

interface CourseParts {
  courseParts: Array<CoursePart>;
}

const Total: React.FC<CourseParts> = ({ courseParts }) => (
  <div>
    <p>
       Total exercises {courseParts.reduce((acc, curr) => acc + curr.exerciseCount, 0)}
    </p>
  </div>
);

export default Total;
