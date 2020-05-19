import React from 'react';
import { HospitalEntry } from '../types';
import { Label, Icon, Header } from 'semantic-ui-react';

interface HospitalEntryProps {
    entry: HospitalEntry;
}

const HospitalEntryDetails: React.FC<HospitalEntryProps> = ({ entry }) => {

    return (
        <>
            <Label color="red" attached='top' >
                <Icon name="add" size="big" />
                <span style={{ fontSize: "1.2rem", padding: 0 }}>
                    Hospital
                </span>
            </Label>
            <Header as='h3'>
                <Icon name='calendar alternate' />
                <Header.Content>
                    Discharge date: {entry.discharge.date}
                    <br />
                    Discharge criteria: {entry.discharge.criteria}
                </Header.Content>
            </Header>
        </>
    );
};
export default HospitalEntryDetails;