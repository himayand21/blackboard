import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {useHistory, useRouteMatch} from 'react-router-dom';
import {useMutation} from '@apollo/react-hooks';

import {getRelativeTime} from '../../util/getRelativeTime';
import {getPlural} from '../../util/getPlural';

import mutation from '../../mutations/addNote';
import query from '../../queries/boardDetails';

import {Loader} from '../../components/loader';

import {
    BOARDS,
    REDIRECT_TOKEN
} from '../../constants';

export const Notes = (props) => {
    const history = useHistory();
    const match = useRouteMatch();

    const {color, notes, boardName, boardId, owner} = props;

    const [mutate, received] = useMutation(mutation, {
        refetchQueries: [{
            query,
            variables: {
                id: boardId
            }
        }]
    });

    const {loading, data} = received;

    const goBack = () => {
        sessionStorage.removeItem(REDIRECT_TOKEN);
        history.push(BOARDS);
    };

    const goToNote = (noteId) => {
        const noteURL = `${match.url}/${noteId}`;
        history.push(noteURL);
        sessionStorage.setItem(REDIRECT_TOKEN, noteURL);
    };

    const goToCreateNote = async () => {
        mutate({
            variables: {
                board: boardId,
                owner,
                editor: '',
                name: '',
                description: ''
            }
        });
    };

    useEffect(() => {
        if (data?.addNote?.id) {
            const {addNote: {id}} = data;
            const noteURL = `${match.url}/${id}/edit`;
            history.push(noteURL);
            sessionStorage.setItem(REDIRECT_TOKEN, noteURL);
        }
    }, [data]);

    if (!notes.length) {
        return (
            <div className={`notes-section notes-wrapper notes-not-found ${color}-section`}>
                <div className="notes-header multi-options">
                    <div className="notes-left-header">
                        <button
                            onClick={goBack}
                            className="standard-button"
                        >
                            <i className="fas fa-arrow-left" />
                        </button>
                    </div>
                    <div className="notes-right-header">
                        <div className="note-header-name">
                            {boardName}
                        </div>
                    </div>
                </div>
                <div className="notes-message-section">
                    <div className="notes-header-section">
                        <div className="note-header">{'Looks like, you don\'t have any notes here.'}</div>
                    </div>
                    <div className="notes-button-row">
                        <button
                            className="standard-button"
                            onClick={goToCreateNote}
                        >
							Create a Note
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`notes-section notes-wrapper ${color}-section`}>
            <div className="notes-header multi-options">
                <div className="notes-left-header">
                    <button
                        onClick={goBack}
                        className="standard-button"
                    >
                        <i className="fas fa-arrow-left" />
                    </button>
                </div>
                <div className="notes-right-header">
                    <div className="note-header-name">
                        {boardName}
                    </div>
                </div>
            </div>
            <div className="notes-container">
                <div className="notes">
                    {notes.map((each) => {
                        const {
                            name,
                            description,
                            comments,
                            time,
                            id
                        } = each;
                        const relativeTime = getRelativeTime(time);

                        return (
                            <div
                                className="note-box"
                                onClick={() => goToNote(id)}
                                key={time}
                            >
                                <div className="note-details">
                                    <div className="note-name">
                                        {name ? name : 'Untitled'}
                                    </div>
                                    <div className="note-description">
                                        {description}
                                    </div>
                                    <div className="note-comment-count">
                                        {comments.length ? `${comments.length} comment${getPlural(comments.length)}` : 'No comments yet'}
                                    </div>
                                </div>
                                <div className="note-time">
                                    <span>
                                        {relativeTime}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="absolute-button-wrapper">
                <button
                    className="standard-button"
                    onClick={goToCreateNote}
                >
                    {loading ? <Loader /> : <i className="fas fa-plus" />}
                </button>
            </div>
        </div>
    );
};

Notes.propTypes = {
    color: PropTypes.string,
    notes: PropTypes.array,
    boardName: PropTypes.string,
    boardId: PropTypes.string,
    owner: PropTypes.string
};