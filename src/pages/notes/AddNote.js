import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useHistory} from 'react-router-dom';
import {graphql} from 'react-apollo';
import {convertToRaw} from 'draft-js';

import {Loader} from '../../components/loader';
import {
    REDIRECT_TOKEN
} from '../../constants';

import mutation from '../../mutations/addNote';
import query from '../../queries/boardDetails';

import {NoteEditor} from './NoteEditor';

const AddNoteComponent = (props) => {
    const [editorState, onChange] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [adding, setAdding] = useState(false);

    const history = useHistory();
    const {backURL, color, mutate, boardId, owner} = props;

    const goBack = () => {
        sessionStorage.setItem(REDIRECT_TOKEN, backURL);
        history.push(backURL);
    };

    const saveNote = async () => {
        setAdding(true);
        await mutate({
            variables: {
                board: boardId,
                name: title,
                description,
                editor: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
                owner
            },
            refetchQueries: [{
                query,
                variables: {id: boardId}
            }]
        });
        setAdding(false);
        goBack();
    };

    const handleTitleChange = (event) => {
        const newTitle = event.target.value;
        if (newTitle.length <= 25) {
            setTitle(event.target.value);
        }
    };

    const handleDescriptionChange = (event) => {
        const newDescription = event.target.value;
        if (newDescription.length <= 140) {
            setDescription(event.target.value);
        }
    };

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
                <div className="notes-right-header">
                    <button
                        className="standard-button"
                        disabled={!title || !description}
                        onClick={saveNote}
                    >
                        {adding ? <Loader /> : 'Save'}
                    </button>
                </div>
            </div>
            <div
                className="note-wrapper"
            >
                <div className="note-title">
                    <input
                        onChange={handleTitleChange}
                        value={title}
                        placeholder={'Title'}
                    />
                    <span className="note-length">
						[{title.length}/25]
                    </span>
                </div>
                <div className="note-description">
                    <input
                        onChange={handleDescriptionChange}
                        value={description}
                        placeholder={'Overview'}
                        rows={3}
                    />
                    <span className="note-length">
						[{description.length}/140]
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

AddNoteComponent.propTypes = {
    backURL: PropTypes.string,
    color: PropTypes.string,
    mutate: PropTypes.func,
    boardId: PropTypes.string,
    owner: PropTypes.string
};

export const AddNote = graphql(mutation, {
    options: {
        awaitRefetchQueries: true,
        ignoreResults: true
    }
})(AddNoteComponent);