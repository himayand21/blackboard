import React from 'react';
import PropTypes from 'prop-types';

import {Icon} from '../../../components/icon';

export const SharedWith = (props) => {
    const {note} = props;

    return (
        <div className="modal-content">
            <div className="modal-content-header">Share</div>
            {note.sharedWithDetails.length ? (
                <div className="connections-section">
                    <div className="connection-header">SHARED WITH</div>
                    {note.sharedWithDetails.map((each) => (
                        <div className="connections-wrapper" key={each.id}>
                            <div className="connection-icon">
                                <Icon name={each.name} />
                            </div>
                            <div className="connection-details">
                                <div className="connection-name">
                                    {each.name}
                                </div>
                                <div className="connection-email">
                                    {each.email}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : null}
        </div>
    );
};

SharedWith.propTypes = {
    note: PropTypes.object
};