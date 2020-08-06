import React from 'react';
import PropTypes from 'prop-types';

import {Icon} from '../../../../components/icon';
import {ShareButton} from './ShareButton';

export const SharedWith = (props) => {
    const {note, loading, unshareNote} = props;
    const {sharedWithDetails, sharedWith} = note;

    if (!sharedWith.length) {
        return (
            <div className="connection-header">
                This note is not shared with anyone yet.
            </div>
        );
    }

    const handleShare = (id) => unshareNote(id);

    return (
        <div className="connections-section">
            {sharedWithDetails.map((each) => (
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
                    <div className="confirm-button">
                        <ShareButton
                            loading={loading}
                            alreadyShared
                            id={each.id}
                            handleShare={handleShare}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

SharedWith.propTypes = {
    note: PropTypes.object,
    loading: PropTypes.bool,
    unshareNote: PropTypes.func
};