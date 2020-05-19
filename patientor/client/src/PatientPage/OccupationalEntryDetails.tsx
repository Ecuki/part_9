import React from 'react';
import { OccupationalHealthcareEntry } from '../types';
import { Label, Icon, Header } from 'semantic-ui-react';
import SickLeave from './SickLeave';

interface OccupationalEntryProps {
    entry: OccupationalHealthcareEntry;
}

const OccupationalEntryDetails: React.FC<OccupationalEntryProps> = ({ entry }) => {

    return (
        <div>
            <Label color="orange" attached='top' >
                <Icon name="id card" size="big" />
                <span style={{ fontSize: "1.2rem", padding: 0 }}>
                    Occupational Healthcare
                </span>
            </Label>
            <Header as='h2'>
                <Icon name='settings' />
                <Header.Content>
                    Employer: {entry.employerName}
                </Header.Content>
            </Header>
            {entry?.sickLeave && <SickLeave sickLeave={entry.sickLeave} />}
        </div>
    );
};
export default OccupationalEntryDetails;