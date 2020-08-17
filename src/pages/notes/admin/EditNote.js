import React, {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {useHistory, useRouteMatch} from 'react-router-dom';
import {useQuery, useMutation} from '@apollo/react-hooks';
import {convertFromRaw, EditorState, convertToRaw} from 'draft-js';

import {
    REDIRECT_TOKEN,
    ERROR
} from '../../../constants';

import getNoteDetails from '../../../queries/noteDetails';
import updateNote from '../../../mutations/updateNote';
import dashboardRefresh from '../../../queries/dashboardRefresh';

import {Toast} from '../../../components/toast/Toast';
import {Loader} from '../../../components/loader';
import {NoteEditor} from '../components/NoteEditor';

export const EditNote = (props) => {
    const {color, backURL} = props;

    const [message, setMessage] = useState(null);
    const [newDescription, setDescription] = useState('');
    const [newTitle, setTitle] = useState('');
    const [editorState, onChange] = useState(null);
    const editorRef = useRef(null);

    const match = useRouteMatch();
    const {noteId} = match.params;

    const {data, loading, error} = useQuery(getNoteDetails, {
        variables: {
            id: noteId
        }
    });

    const [update, {loading: updating, error: mutationError}] = useMutation(updateNote, {
        refetchQueries: [{
            query: dashboardRefresh
        }]
    });

    const history = useHistory();

    useEffect(() => () => document.title = 'Blackboard', []);

    useEffect(() => {
        if (data?.note) {
            const {name, description, editor} = data.note;
            if (editor) {
                const rawEditorState = convertFromRaw(JSON.parse(editor));
                const newEditorState = EditorState.createWithContent(rawEditorState);
                onChange(newEditorState);
            }
            setTitle(name);
            setDescription(description);
        }
    }, [data]);

    useEffect(() => {
        if (note) {
            const wasNoteEmpty = note.editor === '';
            const isNoteEmpty = !editorState?.getCurrentContent().hasText();

            const rawState = editorState ? JSON.stringify(convertToRaw(editorState.getCurrentContent())) : null;
            const isNoteUnedited = (wasNoteEmpty && isNoteEmpty) || (rawState === note.editor);

            if (isNoteUnedited && (newTitle === note.name) && (newDescription === note.description)) setMessage(null);
            else setMessage('You have unsaved changes ...');
        }
    }, [editorState, newTitle, newDescription]);

    useEffect(() => {
        document.title = `[Note]: ${newTitle || 'Untitled'} - Blackboard`;
    }, [newTitle]);

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

    const switchToReadOnly = () => {
        const readOnlyURL = match.url.split('/edit')[0];
        sessionStorage.setItem(REDIRECT_TOKEN, readOnlyURL);
        history.push(readOnlyURL);
    };

    const goBack = () => {
        sessionStorage.setItem(REDIRECT_TOKEN, backURL);
        history.push(backURL);
    };

    const handleUpdateNote = async () => {
        const {id} = note;
        await update({
            variables: {
                id,
                name: newTitle,
                description: newDescription,
                editor: JSON.stringify(convertToRaw(editorState.getCurrentContent()))
            }
        });
    };

    const handleDescriptionChange = (event) => {
        const changedDescription = event.target.value;
        if (changedDescription.length <= 140) {
            setDescription(changedDescription);
        }
    };

    const handleTitleChange = (event) => {
        const changedTitle = event.target.value;
        if (changedTitle.length <= 25) {
            setTitle(changedTitle);
        }
    };

    return (
        <div className={`notes-section ${color}-section`}>
            {mutationError ? (
                <Toast content={{
                    message: 'Uh oh! Failed to update your note.',
                    type: 'error'
                }} />
            ) : null}
            <div className="notes-header multi-options">
                <div className="notes-left-header">
                    <button
                        className="standard-button"
                        onClick={goBack}
                    >
                        <i className="fas fa-arrow-left" />
                    </button>
                    <button
                        className="standard-button"
                        onClick={switchToReadOnly}
                    >
                        Discard
                    </button>
                </div>
                <div className="notes-right-header option-wrapper">
                    <button
                        className="standard-button"
                        disabled={!message}
                        onClick={handleUpdateNote}
                    >
                        {updating ? <Loader /> : 'Save'}
                    </button>
                </div>
            </div>
            <div className="note-wrapper" ref={editorRef}>
                <div className="note-title">
                    <input
                        onChange={handleTitleChange}
                        value={newTitle}
                        placeholder={'Title'}
                        autoFocus
                    />
                    <span className="note-length">
                        [{newTitle.length}/25]
                    </span>
                </div>
                <div className="note-description">
                    <input
                        onChange={handleDescriptionChange}
                        value={newDescription}
                        placeholder={'Overview'}
                        rows={3}
                    />
                    <span className="note-length">
                        [{newDescription.length}/140]
                    </span>
                </div>
                <div className="note-story">
                    <NoteEditor
                        editorState={editorState}
                        onChange={onChange}
                        editorRef={editorRef}
                    />
                </div>
            </div>
        </div>
    );
};

EditNote.propTypes = {
    color: PropTypes.string,
    backURL: PropTypes.string
};
