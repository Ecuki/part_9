import React from 'react';
import { Entry, HealthType } from '../types';
import { assertNever } from '../utils';
import HospitalEntryDetails from './HospitalEntryDetails';
import HealthCheckEntryDetails from './HealthCheckEntryDetails';
import OccupationalEntryDetails from './OccupationalEntryDetails';


interface EntryProps {
    entry: Entry;
}

const EntryDetails: React.FC<EntryProps> = ({ entry }) => {
    switch (entry.type) {
        case HealthType.Hospital:
            return <HospitalEntryDetails entry={entry} />;
        case HealthType.HealthCheck:
            return <HealthCheckEntryDetails entry={entry} />;
        case HealthType.OccupationalHealthcare:
            return <OccupationalEntryDetails entry={entry} />;
        default:
            return assertNever(entry);
    }
};
export default EntryDetails;