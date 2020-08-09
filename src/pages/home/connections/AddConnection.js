import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useLazyQuery, useMutation} from '@apollo/react-hooks';

import getSearchUserByEmail from '../../../queries/searchUserByEmail';
import {Loader} from '../../../components/loader';
import {Icon} from '../../../components/icon';
import {Toast} from '../../../components/toast/Toast';

import removeConnection from '../../../mutations/removeConnection';
import addConnection from '../../../mutations/addConnection';
import getUserDetails from '../../../queries/userDetails';

export const AddConnection = (props) => {
    const {connections} = props;
    const [text, setText] = useState('');

    const [searchUser, {loading: searching, data}] = useLazyQuery(getSearchUserByEmail);

    const search = () => {
        searchUser({
            variables: {
                email: text
            }
        });
    };

    const [remove, {loading: removing, error: removeError}] = useMutation(removeConnection);
    const [add, {loading: adding, error: addError}] = useMutation(addConnection);

    const removeConnectionFromUser = (id) => {
        remove({
            variables: {
                connection: id
            },
            refetchQueries: [{
                query: getUserDetails
            }],
            awaitRefetchQueries: true
        });
    };

    const addConnectionToUser = (id) => {
        add({
            variables: {
                connection: id
            },
            refetchQueries: [{
                query: getUserDetails
            }],
            awaitRefetchQueries: true
        });
    };

    const handleEnter = (event) => {
        if (text.length && event.keyCode === 13) {
            search();
        }
    };

    return (
        <>
            <div className="action-row">
                {removeError ? (
                    <Toast content={{
                        message: 'Uh oh! Failed to remove connection.',
                        type: 'error'
                    }} />
                ) : null}
                {addError ? (
                    <Toast content={{
                        message: 'Uh oh! Failed to add connection.',
                        type: 'error'
                    }} />
                ) : null}
                <div className="input-wrapper">
                    <input
                        placeholder="someone@example.com"
                        onChange={(event) => setText(event.target.value)}
                        value={text}
                        onKeyDown={handleEnter}
                    />
                </div>
                <div className="action-button">
                    <button
                        className="standard-button footer-button"
                        onClick={search}
                        disabled={!text.length}
                    >
                        {searching ? <Loader /> : 'Search'}
                    </button>
                </div>
            </div>
            {data ? (
                <div className="search-section">
                    {data.searchUserByEmail ? (
                        <>
                            <div className="connection-header">SEARCH RESULT</div>
                            <div className="connections-wrapper">
                                <div className="connection-icon">
                                    <Icon name={data.searchUserByEmail.name} />
                                </div>
                                <div className="connection-details">
                                    <div className="connection-name">
                                        {data.searchUserByEmail.name}
                                    </div>
                                    <div className="connection-email">
                                        {data.searchUserByEmail.email}
                                    </div>
                                </div>
                                <div className="confirm-button">
                                    {connections.includes(data.searchUserByEmail.id) ? (
                                        <button
                                            className="standard-button cancel-button"
                                            disabled={removing}
                                            onClick={() => removeConnectionFromUser(data.searchUserByEmail.id)}
                                        >
                                            Remove
                                        </button>
                                    ) : (
                                        <button
                                            className="standard-button"
                                            disabled={adding}
                                            onClick={() => addConnectionToUser(data.searchUserByEmail.id)}
                                        >
                                            Add
                                        </button>
                                    )}
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="connection-header">NO SEARCH RESULTS FOUND</div>
                    )}
                </div>
            ) : null}
        </>
    );
};

AddConnection.propTypes = {
    connections: PropTypes.array
};