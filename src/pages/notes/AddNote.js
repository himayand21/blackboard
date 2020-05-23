// descoped

import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useHistory} from 'react-router-dom';
import {useMutation} from '@apollo/react-hooks';
import {convertToRaw} from 'draft-js';

import {Loader} from '../../components/loader';
import {Modal} from '../../components/modal';

import {
    REDIRECT_TOKEN,
    BOARDS,
    NOTES,
    NEW
} from '../../constants';

import mutation from '../../mutations/addNote';
import query from '../../queries/boardDetails';

import {SwitchBoard} from './components/SwitchBoard';
import {NoteEditor} from './NoteEditor';

export const AddNote = (props) => {
    const [editorState, onChange] = useState(null);
    const [show, setShow] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const [mutate, {loading: adding}] = useMutation(mutation, {
        awaitRefetchQueries: true
    });

    const history = useHistory();
    const {backURL, color, boardId, owner} = props;

    const goBack = () => {
        sessionStorage.setItem(REDIRECT_TOKEN, backURL);
        history.push(backURL);
    };

    const hideModal = () => setShow(false);
    const showModal = () => setShow(true);

    const saveNote = async () => {
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

    const handleConfirm = async (selectedBoard) => {
        hideModal();
        const newRoute = `${BOARDS}/${selectedBoard}${NOTES}${NEW}`;
        history.push(newRoute);
        sessionStorage.setItem(REDIRECT_TOKEN, newRoute);
    };

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
                <div className="notes-right-header">
                    <button
                        className="standard-button switch-button"
                        onClick={showModal}
                    >
                        Switch Board
                    </button>
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
            <Modal
                hideModal={hideModal}
                show={show}
            >
                <SwitchBoard
                    owner={owner}
                    board={boardId}
                    hideModal={hideModal}
                    handleConfirm={handleConfirm}
                />
            </Modal>
        </div>
    );
};

AddNote.propTypes = {
    backURL: PropTypes.string,
    color: PropTypes.string,
    boardId: PropTypes.string,
    owner: PropTypes.string
};
