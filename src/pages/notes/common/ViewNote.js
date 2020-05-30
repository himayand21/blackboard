import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useHistory, useRouteMatch} from 'react-router-dom';
import {useQuery} from '@apollo/react-hooks';
import {convertFromRaw, EditorState} from 'draft-js';

import {
    REDIRECT_TOKEN,
    ERROR
} from '../../../constants';

import query from '../../../queries/noteDetails';

import {NoteEditor} from '../components/NoteEditor';
import {Options} from './Options';

export const ViewNote = (props) => {
    const {backURL, user} = props;
    const [editorState, onChange] = useState(null);

    const history = useHistory();
    const match = useRouteMatch();

    const {noteId} = match.params;

    const {data, error, loading} = useQuery(query, {
        variables: {
            id: noteId
        }
    });

    useEffect(() => {
        if (data?.note) {
            const {note} = data;
            if (note.editor) {
                const rawEditorState = convertFromRaw(JSON.parse(note.editor));
                const newEditorState = EditorState.createWithContent(rawEditorState);
                onChange(newEditorState);
            }
        }
    }, [data]);

    useEffect(() => {
        if (error) {
            history.push(ERROR);
        }
    }, [error]);

    if (error) {
        return null;
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
        const {name, description, boardDetails} = note;

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
                            user={user}
                            backURL={backURL}
                            switchToEdit={switchToEdit}
                        />
                    </div>
                </div>
                <div className="note-wrapper">
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
    user: PropTypes.string
};
