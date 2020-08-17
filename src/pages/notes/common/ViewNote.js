import React, {useEffect, useState, useRef} from 'react';
import PropTypes from 'prop-types';
import {useHistory, useRouteMatch} from 'react-router-dom';
import {useQuery} from '@apollo/react-hooks';
import {convertFromRaw, EditorState} from 'draft-js';

import {
    REDIRECT_TOKEN
} from '../../../constants';

import {NotFound} from '../../error/NotFound';

import getNoteDetails from '../../../queries/noteDetails';

import {NoteEditor} from '../components/NoteEditor';
import {Options} from './Options';

export const ViewNote = (props) => {
    const {backURL, user, boards} = props;
    const [editorState, onChange] = useState(null);

    const history = useHistory();
    const match = useRouteMatch();
    const editorRef = useRef(null);

    const {noteId} = match.params;

    const {data, error, loading} = useQuery(getNoteDetails, {
        variables: {
            id: noteId
        }
    });

    useEffect(() => () => document.title = 'Blackboard', []);

    useEffect(() => {
        if (data?.note) {
            const {note} = data;
            document.title = `[Note]: ${note.name || 'Untitled'} - Blackboard`;
            if (note.editor) {
                const rawEditorState = convertFromRaw(JSON.parse(note.editor));
                const newEditorState = EditorState.createWithContent(rawEditorState);
                onChange(newEditorState);
            }
        }
    }, [data]);

    if (error) {
        return (
            <div className="screen-loader">
                <div className="loading-section">
                    <NotFound type="note" />
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="boards-wrapper">
                <div className="loading-section">
                    <span className="loading-board-details">
                        Just a Second ...
                    </span>
                </div>
            </div>
        );
    }

    const {note} = data;

    const goBack = () => {
        sessionStorage.setItem(REDIRECT_TOKEN, backURL);
        history.push(backURL);
    };

    const switchToEdit = () => {
        const editURL = `${match.url}/edit`;
        sessionStorage.setItem(REDIRECT_TOKEN, editURL);
        history.push(editURL);
    };

    if (note) {
        const {name, description, boardDetails, owner} = note;
        const isOwner = owner === user;

        return (
            <div className={`notes-section ${boardDetails.color}-section`}>
                <div className="notes-header multi-options">
                    <div className="notes-left-header">
                        <button
                            className="standard-button"
                            onClick={goBack}
                        >
                            <i className="fas fa-arrow-left" />
                        </button>
                    </div>
                    <div className="notes-right-header option-wrapper">
                        <Options
                            note={note}
                            backURL={backURL}
                            switchToEdit={switchToEdit}
                            isOwner={isOwner}
                            boards={boards}
                        />
                    </div>
                </div>
                <div
                    className="note-wrapper"
                    onClick={isOwner ? switchToEdit : null}
                    ref={editorRef}
                >
                    <div className="note-title">
                        <input
                            value={name}
                            readOnly
                            placeholder={'Title'}
                        />
                    </div>
                    <div className="note-description">
                        <input
                            value={description}
                            readOnly
                            placeholder={'Overview'}
                            rows={3}
                        />
                    </div>
                    <div className="note-story">
                        <NoteEditor
                            editorState={editorState}
                            onChange={onChange}
                            editorRef={editorRef}
                            readOnly
                        />
                    </div>
                </div>
            </div>
        );
    }
};

ViewNote.propTypes = {
    color: PropTypes.string,
    backURL: PropTypes.string,
    user: PropTypes.string,
    boards: PropTypes.array
};
