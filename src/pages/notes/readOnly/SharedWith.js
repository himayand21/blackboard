import React from 'react';
import PropTypes from 'prop-types';

import {Icon} from '../../../components/icon';

export const SharedWith = (props) => {
    const {note} = props;

    return (
        <div className="create-board">
            <div className="create-board-header">Share</div>
            {note.sharedWithDetails.length ? (
                <div className="shared-with-section">
                    <div className="share-header">SHARED WITH</div>
                    {note.sharedWithDetails.map((each) => (
                        <div className="share-wrapper" key={each.id}>
                            <div className="share-icon">
                                <Icon name={each.name} />
                            </div>
                            <div className="share-details">
                                <div className="share-name">
                                    {each.name}
                                </div>
                                <div className="share-email">
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