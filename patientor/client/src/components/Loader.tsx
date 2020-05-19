import React from 'react';
import { Dimmer, Loader } from "semantic-ui-react";

const MyLoader: React.FC = () => {
    return (
        <Dimmer active>
            <Loader />
        </Dimmer>
    );
};
export default MyLoader;