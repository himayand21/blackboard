import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useHistory} from 'react-router-dom';
import {graphql} from 'react-apollo';

import {Loader} from '../../components/loader';

import query from '../../queries/boardDetails';
import mutation from '../../mutations/deleteNote';

import {REDIRECT_TOKEN} from '../../constants';

const DeleteNoteComponent = (props) => {
    const [deleting, setDeleting] = useState(false);

    const {note, hideModal, mutate, backURL} = props;
    const {id, board} = note;

    const history = useHistory();

    const deleteNote = async () => {
        setDeleting(true);
        await mutate({
            variables: {
                id
            },
            refetchQueries: [{
                query,
                variables: {
                    id: board
                }
            }]
        });
        setDeleting(false);
        sessionStorage.setItem(REDIRECT_TOKEN, backURL);
        history.push(backURL);
        hideModal();
    };

    return (
        <div className="create-board">
            <div className="create-board-header">
				Are you sure?
            </div>
            <div className="create-board-intro delete-board">
				This process is irreversible and would remove all data associated with<span>{note.name}</span>.
            </div>
            <footer className="create-board-footer">
                <button
                    className="standard-button footer-button"
                    onClick={deleteNote}
                >
                    {deleting ? <Loader /> : 'Confirm'}
                </button>
                <button
                    className="standard-button footer-button"
                    onClick={hideModal}
                >
					Cancel
                </button>
            </footer>
        </div>
    );
};

DeleteNoteComponent.propTypes = {
    mutate: PropTypes.func,
    hideModal: PropTypes.func,
    note: PropTypes.object,
    backURL: PropTypes.string
};

export const DeleteNote = graphql(mutation, {
    options: {
        awaitRefetchQueries: true,
        ignoreResults: true
    }
})(DeleteNoteComponent);