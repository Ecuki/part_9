import React from 'react';
import { HealthCheckEntry, HealthCheckRating, HealthColor } from '../types';
import { Label, Icon } from 'semantic-ui-react';
import { assertNever } from '../utils';


interface HealthCheckEntryProps {
    entry: HealthCheckEntry;
}


const HealthCheckEntryDetails: React.FC<HealthCheckEntryProps> = ({ entry }) => {
    let color: HealthColor;
    let text: string;

    switch (entry.healthCheckRating) {
        case HealthCheckRating.Healthy:
            color = HealthColor.Healthy;
            text = "Healthy";
            break;
        case HealthCheckRating.LowRisk:
            color = HealthColor.LowRisk;
            text = "Low risk";
            break;
        case HealthCheckRating.HighRisk:
            color = HealthColor.HighRisk;
            text = "High risk";
            break;
        case HealthCheckRating.CriticalRisk:
            color = HealthColor.CriticalRisk;
            text = "Critical risk";
            break;
        default:
            return assertNever(entry.healthCheckRating);
    }


    return <>
        <Label color="olive" attached='top' >
            <Icon name="calendar check outline" size="big" />
            <span style={{ fontSize: "1.2rem", padding: 0 }}>Health Check</span>
        </Label>
        <Label color={color} ribbon size="large" >
            {text}
        </Label>
    </>;
};

export default HealthCheckEntryDetails;