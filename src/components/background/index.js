import React, {Fragment} from 'react';

import blackboard from '../../assets/blackboard.jpg';

export const Background = () => {
    return (
        <Fragment>
            <div className="background-wrapper" />
            <img src={blackboard} className="background-image" />
        </Fragment>
    );
};
