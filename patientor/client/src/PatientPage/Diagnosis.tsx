import React from 'react';
import { useStateValue } from '../state';
import { Diagnose } from '../types';
import { Header } from 'semantic-ui-react';

interface EntriesProps {
    diagnosisCodes: Array<Diagnose["code"]>;
}

const Diagnosis: React.FC<EntriesProps> = ({ diagnosisCodes }) => {
    const [{ diagnosis }] = useStateValue();
    return (
        <div>
            <Header content="Diagnosis codes:" as="h4" />
            <ul>
                {diagnosisCodes.map((code) =>
                    <li key={code}>
                        <strong>{code}</strong>{" "}{diagnosis[`${code}`]?.name}
                        <br />
                        <em>{diagnosis[`${code}`]?.latin}</em>
                    </li>)}
            </ul>
        </div>
    );
};
export default Diagnosis;