import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {useHistory, useRouteMatch} from 'react-router-dom';
import {useMutation} from '@apollo/react-hooks';

import addNote from '../../mutations/addNote';
import getBoardDetails from '../../queries/boardDetails';

import {Loader} from '../../components/loader';
import {Toast} from '../../components/toast/Toast';

import {
    DASHBOARD,
    REDIRECT_TOKEN
} from '../../constants';
import {NoteBox} from './components/NoteBox';

export const Notes = (props) => {
    const history = useHistory();
    const match = useRouteMatch();

    const {color, notes, boardName, boardId} = props;

    const [add, {loading, data, error: mutationError}] = useMutation(addNote, {
        refetchQueries: [{
            query: getBoardDetails,
            variables: {
                id: boardId
            }
        }]
    });

    const goBack = () => {
        sessionStorage.removeItem(REDIRECT_TOKEN);
        history.push(DASHBOARD);
    };

    const goToNote = (noteId) => {
        const noteURL = `${match.url}/${noteId}`;
        history.push(noteURL);
        sessionStorage.setItem(REDIRECT_TOKEN, noteURL);
    };

    const goToCreateNote = async () => {
        add({
            variables: {
                board: boardId,
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

    useEffect(() => {
        document.title = `[Board]: ${boardName || 'Untitled'} - Blackboard`;
    }, [boardName]);

    useEffect(() => () => document.title = 'Blackboard', []);

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
            {mutationError ? (
                <Toast content={{
                    message: 'Uh oh! Note creation failed.',
                    type: 'error'
                }} />
            ) : null}
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
                <div className="boards">
                    {notes.map((each) => (
                        <NoteBox
                            key={each.id}
                            note={each}
                            goToNote={goToNote}
                            color={color}
                        />
                    ))}
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