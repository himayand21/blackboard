import React from 'react';
import PropTypes from 'prop-types';
import {useHistory} from 'react-router-dom';
import {useMutation} from '@apollo/react-hooks';

import {Loader} from '../../../components/loader';
import {Toast} from '../../../components/toast/Toast';

import refetchQuery from '../../../queries/refetchQuery';
import mutation from '../../../mutations/deleteNote';

import {REDIRECT_TOKEN} from '../../../constants';

export const DeleteNote = (props) => {
    const [mutate, {loading: deleting, error: mutationError}] = useMutation(mutation, {
        awaitRefetchQueries: true
    });

    const {note, hideModal, backURL} = props;
    const {id, owner} = note;

    const history = useHistory();

    const deleteNote = async () => {
        await mutate({
            variables: {
                id
            },
            refetchQueries: [{
                query: refetchQuery,
                variables: {
                    id: owner
                }
            }]
        });
        sessionStorage.setItem(REDIRECT_TOKEN, backURL);
        hideModal();
        history.push(backURL);
    };

    return (
        <div className="create-board">
            {mutationError ? (
                <Toast content={{
                    message: 'Uh oh! Note deletion failed.',
                    type: 'error'
                }} />
            ) : null}
            <div className="create-board-header">
				Are you sure?
            </div>
            <div className="create-board-intro delete-board">
				This process is irreversible and would remove all data associated with<span>{note.name ? note.name : 'Untitled'}</span>.
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

DeleteNote.propTypes = {
    hideModal: PropTypes.func,
    note: PropTypes.object,
    backURL: PropTypes.string
};
