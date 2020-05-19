import React from 'react';
import { Icon } from "semantic-ui-react";
import { Gender } from '../types';

interface GenderIconProps {
    gender: Gender;
}

const GenderIcon: React.FC<GenderIconProps> = ({ gender }) => {

    switch (gender) {
        case "male":
            return <Icon name="mars" />;
        case "female":
            return <Icon name="venus" />;
        default:
            return <Icon name="other gender" />;
    }
};
export default GenderIcon;