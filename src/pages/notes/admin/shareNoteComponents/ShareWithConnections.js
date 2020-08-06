import React from 'react';
import PropTypes from 'prop-types';

import {Icon} from '../../../../components/icon';
import {ShareButton} from './ShareButton';

export const ShareWithConnections = (props) => {
    const {note, connections, loading, shareNote, unshareNote} = props;
    const {sharedWith} = note;

    if (!connections.length) {
        return (
            <div className="connection-header">
                {'You don\'t have any connections yet.'}
            </div>
        );
    }

    const handleShare = async (id) => {
        if (sharedWith.includes(id)) await unshareNote(id);
        else await shareNote(id);
    };

    return (
        <div className="connections-section">
            {connections.map((each) => (
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
                            alreadyShared={sharedWith.includes(each.id)}
                            id={each.id}
                            handleShare={handleShare}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

ShareWithConnections.propTypes = {
    note: PropTypes.object,
    connections: PropTypes.array,
    loading: PropTypes.bool,
    shareNote: PropTypes.func,
    unshareNote: PropTypes.func
};