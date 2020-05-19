import React from 'react';
import Part from './Part';
import { CoursePart } from '../types';

const assertNever = (value: never): never => {
    throw new Error(`Unauthorized discriminated union member:${JSON.stringify(value)}`);
};

interface CourseProps {
    parts: Array<CoursePart>;
}

const Content: React.FC<CourseProps> = ({ parts }) => {

    return <>
        {parts.map(part => {
            switch (part.name) {
                case "Fundamentals":
                    return <Part part={part} />;
                case "Using props to pass data":
                    return <Part part={part} />;
                case "Deeper type usage":
                    return <Part part={part} />;
                case "Make world better":
                    return <Part part={part} />;
                default:
                    return assertNever(part);
            }
        })}
    </>;
};

export default Content;
