import React from 'react';
import { CoursePart } from '../types';

interface PartProps {
    part: CoursePart;
}

const Part: React.FC<PartProps> = ({ part }) => {
    console.log(part);

    return <div>
        <h3>Name: <em>{part.name}</em></h3>
        <p>Exercises: <em>{part.exerciseCount}</em></p>
        {part?.description && <p>Description: <em>{part.description}</em></p>}
        {part?.groupProjectCount && <p>Projects: <em>{part.groupProjectCount}</em></p>}
        {part?.exerciseSubmissionLink && <p>Submission link: <em>{part.exerciseSubmissionLink}</em></p>}
        {part?.prize && <p>Prize: <em>{part.prize}</em></p>}
    </div>;
};

export default Part;