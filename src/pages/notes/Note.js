import React from 'react';
import PropTypes from 'prop-types';
import {useHistory, useRouteMatch} from 'react-router-dom';
import {useQuery} from '@apollo/react-hooks';
import {convertFromRaw, EditorState} from 'draft-js';

import {
    REDIRECT_TOKEN,
    ERROR
} from '../../constants';

import query from '../../queries/noteDetails';

import {NoteEditor} from './NoteEditor';
import {Options} from './Options';

export const Note = (props) => {
    const {color, backURL} = props;

    const history = useHistory();
    const match = useRouteMatch();

    const {noteId} = match.params;

    const {data, error, loading} = useQuery(query, {
        variables: {
            id: noteId
        }
    });

    if (error) {
        history.push(ERROR);
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
        const {name, description, editor} = note;
        let editorState = null;
        if (editor) {
            const rawEditorState = convertFromRaw(JSON.parse(editor));
            editorState = EditorState.createWithContent(rawEditorState);
        }

        return (
            <div className={`notes-section ${color}-section`}>
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
                        />
                    </div>
                </div>
                <div
                    className="note-wrapper"
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
                            onChange={() => {}}
                            readOnly
                        />
                    </div>
                </div>
            </div>
        );
    }
};

Note.propTypes = {
    color: PropTypes.string,
    backURL: PropTypes.string
};
