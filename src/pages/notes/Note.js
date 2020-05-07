import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {useHistory, withRouter} from 'react-router-dom';
import {graphql} from 'react-apollo';
import {convertFromRaw, EditorState, convertToRaw} from 'draft-js';

import {
    REDIRECT_TOKEN
} from '../../constants';

import query from '../../queries/noteDetails';
import mutation from '../../mutations/updateNote';

import {Loader} from '../../components/loader';
import {NoteEditor} from './NoteEditor';
import {Options} from './Options';

const NoteComponent = (props) => {
    const {color, backURL, data, mutate} = props;
    const {loading, note} = data;

    if (loading) {
        return (
            <div className="boards-wrapper">
                <div className="loading-section">
                    <span className="loading-board-details">
                        Loading your Note ...
                    </span>
                </div>
            </div>
        );
    }

    const history = useHistory();
    const goBack = () => {
        sessionStorage.setItem(REDIRECT_TOKEN, backURL);
        history.push(backURL);
    };

    const [newDescription, setDescription] = useState('');
    const [newTitle, setTitle] = useState('');
    const [editorState, onChange] = useState(null);
    const [updating, setUpdating] = useState(false);

    const updateNote = async () => {
        const {id, board} = note;
        setUpdating(true);
        await mutate({
            variables: {
                id,
                name: newTitle,
                description: newDescription,
                editor: JSON.stringify(convertToRaw(editorState.getCurrentContent()))
            },
            refetchQueries: [{
                query,
                variables: {id: board}
            }]
        });
        setUpdating(false);
        goBack();
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

    useEffect(() => {
        if (note) {
            const {name, description, editor} = note;
            const rawEditorState = convertFromRaw(JSON.parse(editor));
            setTitle(name);
            setDescription(description);
            const newEditorState = EditorState.createWithContent(rawEditorState);
            onChange(newEditorState);
        }
    }, [note]);

    return (
        <div className={`notes-section ${color}-section`}>
            <div className="notes-header multi-options">
                <div className="notes-left-header">
                    <button
                        className="standard-button"
                        onClick={goBack}
                    >
						Back
                    </button>
                </div>
                <div className="notes-right-header option-wrapper">
                    <button
                        className="standard-button"
                        disabled={!newTitle || !newDescription}
                        onClick={updateNote}
                    >
                        {updating ? <Loader /> : 'Update'}
                    </button>
                    <Options
                        note={note}
                        backURL={backURL}
                    />
                </div>
            </div>
            <div
                className="note-wrapper"
            >
                <div className="note-title">
                    <input
                        onChange={handleTitleChange}
                        value={newTitle}
                        placeholder={'Title'}
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
                    />
                </div>
            </div>
        </div>
    );
};

NoteComponent.propTypes = {
    color: PropTypes.string,
    backURL: PropTypes.string,
    data: PropTypes.object,
    mutate: PropTypes.func
};

export const Note = withRouter(graphql(query, {
    options: (props) => ({
        variables: {
            id: props.match.params.noteId
        }
    })
})(graphql(mutation, {
    options: {
        awaitRefetchQueries: true,
        ignoreResults: true
    }
})(NoteComponent)));