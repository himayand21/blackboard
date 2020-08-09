import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useLazyQuery} from '@apollo/react-hooks';

import getSearchByEmail from '../../../../queries/searchByEmail';

import {Loader} from '../../../../components/loader';
import {Icon} from '../../../../components/icon';

export const FindAndShare = (props) => {
    const [text, setText] = useState('');

    const {
        note,
        loading,
        shareNote,
        unshareNote
    } = props;

    const [searchByEmail, {loading: searching, data}] = useLazyQuery(getSearchByEmail);

    const search = () => {
        searchByEmail({
            variables: {
                email: text,
                note: note.id
            }
        });
    };

    const {sharedWith} = note;

    const handleEnter = (event) => {
        if (text.length && event.keyCode === 13) {
            search();
        }
    };

    return (
        <>
            <div className="action-row">
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
                    {data.searchByEmail ? (
                        <>
                            <div className="connection-header">SEARCH RESULT</div>
                            <div className="connections-wrapper">
                                <div className="connection-icon">
                                    <Icon name={data.searchByEmail.name} />
                                </div>
                                <div className="connection-details">
                                    <div className="connection-name">
                                        {data.searchByEmail.name}
                                    </div>
                                    <div className="connection-email">
                                        {data.searchByEmail.email}
                                    </div>
                                </div>
                                <div className="confirm-button">
                                    {sharedWith.includes(data.searchByEmail.id) ? (
                                        <button
                                            className="standard-button cancel-button"
                                            disabled={loading}
                                            onClick={() => unshareNote(data.searchByEmail.id)}
                                        >
                                            Revert
                                        </button>
                                    ) : (
                                        <button
                                            className="standard-button"
                                            disabled={loading}
                                            onClick={() => shareNote(data.searchByEmail.id)}
                                        >
                                            Share
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

FindAndShare.propTypes = {
    note: PropTypes.object,
    loading: PropTypes.bool,
    shareNote: PropTypes.func,
    unshareNote: PropTypes.func
};
