
import React from 'react';


interface TotalProps {
    exercisesNumber: number;
}

const Total: React.FC<TotalProps> = ({ exercisesNumber }) => {
    return (<div>
        <h2>Number of exercises:{" "}
            {exercisesNumber}</h2>
    </div>
    );
};

export default Total;
