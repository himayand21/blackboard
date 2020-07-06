import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useLazyQuery} from '@apollo/react-hooks';

import lazyQuery from '../../../../queries/searchByEmail';

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

    const [searchByEmail, {loading: searching, data}] = useLazyQuery(lazyQuery);

    const search = () => {
        searchByEmail({
            variables: {
                email: text,
                note: note.id
            }
        });
    };

    const {sharedWith} = note;

    return (
        <>
            <div className="action-row">
                <div className="type-comment">
                    <input
                        placeholder="someone@example.com"
                        onChange={(event) => setText(event.target.value)}
                        value={text}
                    />
                </div>
                <div className="send-comment">
                    <button
                        className="standard-button footer-button"
                        onClick={search}
                    >
                        {searching ? <Loader /> : 'Search'}
                    </button>
                </div>
            </div>
            {data ? (
                <div className="share-section">
                    {data.searchByEmail ? (
                        <>
                            <div className="share-header">SEARCH RESULT</div>
                            <div className="share-wrapper">
                                <div className="share-icon">
                                    <Icon name={data.searchByEmail.name} />
                                </div>
                                <div className="share-details">
                                    <div className="share-name">
                                        {data.searchByEmail.name}
                                    </div>
                                    <div className="share-email">
                                        {data.searchByEmail.email}
                                    </div>
                                </div>
                                <div className="share-button">
                                    <button
                                        className="standard-button"
                                        disabled={loading}
                                        onClick={() => sharedWith.includes(data.searchByEmail.id) ? unshareNote(data.searchByEmail.id) : shareNote(data.searchByEmail.id)}
                                    >
                                        {sharedWith.includes(data.searchByEmail.id) ? 'Revert' : 'Share'}
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="share-header">NO SEARCH RESULTS FOUND</div>
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
