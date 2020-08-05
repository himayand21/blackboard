import React, {useState} from 'react';
import PropTypes from 'prop-types';

import {AddConnection} from './AddConnection';
import {Connection} from './Connection';

export const Connections = (props) => {
    const {connections, connectionIds} = props;
    const [inAddStep, setInAddStep] = useState(false);

    const switchToShowConnections = () => setInAddStep(false);
    const switchToAddConnection = () => setInAddStep(true);

    return (
        <div className="modal-content">
            <header className="modal-content-header">
                {inAddStep ? (
                    <div className="back-button-wrapper">
                        <button className="standard-button back-button" onClick={switchToShowConnections}>
                            <i className="fas fa-chevron-left" />
                            <span>Back</span>
                        </button>
                        {'Add Connection'}
                    </div>
                ) : 'Connections'}
            </header>
            {inAddStep ? (
                <AddConnection
                    connections={connectionIds}
                />
            ) : (
                <>
                    {connections.length ? (
                        <div className="connections-section">
                            {connections.map((connection) => (
                                <Connection
                                    connection={connection}
                                    key={connection.id}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="connection-header">{'YOU DON\'T HAVE ANY CONNECTIONS YET'}</div>
                    )}
                    <footer className="modal-footer">
                        <button
                            className="standard-button footer-button"
                            onClick={switchToAddConnection}
                        >
                            Add Connection
                        </button>
                    </footer>
                </>
            )}
        </div>
    );
};

Connections.propTypes = {
    connections: PropTypes.array,
    connectionIds: PropTypes.array
};