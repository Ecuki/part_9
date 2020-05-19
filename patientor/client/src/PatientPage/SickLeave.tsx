import React from 'react';
import { Icon, Header } from 'semantic-ui-react';
import { SickLeave as SickLeaveType } from '../types';

interface SickLeaveProps {
    sickLeave: SickLeaveType;
}

const SickLeave: React.FC<SickLeaveProps> = ({ sickLeave }) => {
    return (
        <Header as='h3'>
            <Icon name='calendar alternate' />
            <Header.Content>
                Sick leave start: {sickLeave.startDate}
                <br />
            Sick leave end: {sickLeave.endDate}
            </Header.Content>
        </Header>

    );
};

export default SickLeave;
