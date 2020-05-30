import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useQuery, useLazyQuery, useMutation} from '@apollo/react-hooks';

import {Loader} from '../../../components/loader';
import {Icon} from '../../../components/icon';

import lazyQuery from '../../../queries/searchByEmail';
import mutation from '../../../mutations/shareNote';
import refetechQuery from '../../../queries/noteDetails';
import query from '../../../queries/userDetails';

export const ShareNote = (props) => {
    const {note, user} = props;
    const [text, setText] = useState('');

    const {data: userData} = useQuery(query, {
        variables: {
            id: user
        }
    });

    const [searchByEmail, {loading, data}] = useLazyQuery(lazyQuery);
    const [mutate, {loading: sharing}] = useMutation(mutation);

    const search = () => {
        searchByEmail({
            variables: {
                email: text,
                note: note.id
            }
        });
    };

    const shareNote = async (sharingWith) => {
        await mutate({
            variables: {
                id: note.id,
                sharingWith,
                sharingFrom: user
            },
            awaitRefetchQueries: true,
            refetchQueries: [{
                query: refetechQuery,
                variables: {
                    id: note.id
                },
            }, {
                query,
                variables: {
                    id: user
                }
            }]
        });
    };

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
                        {loading ? <Loader /> : 'Search'}
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
                                        disabled={sharing || note.sharedWith.includes(data.searchByEmail.id)}
                                        onClick={() => shareNote(data.searchByEmail.id)}
                                    >
                                        {note.sharedWith.includes(data.searchByEmail.id) ? (
                                            <i className="fas fa-check" />
                                        ) : (
                                            <>{sharing ? <Loader /> : 'Share'}</>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="share-header">NO SEARCH RESULTS FOUND</div>
                    )}
                </div>
            ) : null}
            {userData?.userDetail?.connections?.length ? (
                <div className="shared-with-section">
                    <div className="share-header">CONNECTIONS</div>
                    {userData.userDetail.connectionDetails.map((each) => (
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
                            <div className="share-button">
                                <button
                                    className="standard-button"
                                    disabled={sharing || note.sharedWith.includes(each.id)}
                                    onClick={() => shareNote(each.id)}
                                >
                                    {note.sharedWith.includes(each.id) ? (
                                        <i className="fas fa-check" />
                                    ) : (
                                        <>
                                            {sharing ?
                                                <Loader /> :
                                                'Share'
                                            }
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : null}
        </div>
    );
};

ShareNote.propTypes = {
    note: PropTypes.object,
    user: PropTypes.string
};