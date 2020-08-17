import React from 'react';
import PropTypes from 'prop-types';
import {useMutation} from '@apollo/react-hooks';

import {Toast} from '../../../components/toast/Toast';
import {Icon} from '../../../components/icon';
import {Loader} from '../../../components/loader';
import removeConnection from '../../../mutations/removeConnection';

export const Connection = (props) => {
    const {connection} = props;
    const {id, name, email} = connection;

    const [remove, {loading, error: mutationError}] = useMutation(removeConnection);

    const handleRemoveConnection = () => {
        remove({
            variables: {
                connection: id
            }
        });
    };

    return (
        <div
            className="connections-wrapper"
            key={id}
        >
            {mutationError ? (
                <Toast content={{
                    message: 'Uh oh! Failed to remove connection.',
                    type: 'error'
                }} />
            ) : null}
            <div className="connection-icon">
                <Icon name={name} />
            </div>
            <div className="connection-details">
                <div className="connection-name">{name}</div>
                <div className="connection-email">{email}</div>
            </div>
            <div className="confirm-button">
                <button
                    className="standard-button cancel-button"
                    onClick={handleRemoveConnection}
                >
                    {loading ? <Loader /> : 'Remove'}
                </button>
            </div>
        </div>
    );
};

Connection.propTypes = {
    connection: PropTypes.object
};