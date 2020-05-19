import React from 'react';
import ReactDOM from 'react-dom';

import Header from './Components/Header';
import Content from './Components/Content';
import Total from './Components/Total';
import { CoursePart } from './types';

const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
  },
  {
    name: "Make world better",
    exerciseCount: 1,
    description: "it's very important",
    exerciseSubmissionLink: "https://better-world.dev",
    prize: "Nobel Prize"
  }
];


const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const exercisesNumber = courseParts.reduce((carry, part) => carry + part.exerciseCount, 0);

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total exercisesNumber={exercisesNumber} />
    </div>
  );
};

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

