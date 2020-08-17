import React from 'react';
import PropTypes from 'prop-types';
import {useHistory} from 'react-router-dom';
import {useMutation} from '@apollo/react-hooks';

import {Loader} from '../../../components/loader';
import {Toast} from '../../../components/toast/Toast';

import deleteNote from '../../../mutations/deleteNote';
import dashboardRefresh from '../../../queries/dashboardRefresh';

import {REDIRECT_TOKEN} from '../../../constants';

export const DeleteNote = (props) => {
    const [remove, {loading: deleting, error: mutationError}] = useMutation(deleteNote, {
        refetchQueries: [{
            query: dashboardRefresh
        }]
    });

    const {note, hideModal, backURL} = props;
    const {id} = note;

    const history = useHistory();

    const handleDeleteNote = async () => {
        await remove({
            variables: {
                id
            }
        });
        sessionStorage.setItem(REDIRECT_TOKEN, backURL);
        hideModal();
        history.push(backURL);
    };

    return (
        <div className="modal-content">
            {mutationError ? (
                <Toast content={{
                    message: 'Uh oh! Note deletion failed.',
                    type: 'error'
                }} />
            ) : null}
            <div className="modal-content-header">
				Are you sure?
            </div>
            <div className="modal-content-intro delete-board">
				This process is irreversible and would remove all data associated with<span>{note.name ? note.name : 'Untitled'}</span>.
            </div>
            <footer className="modal-footer">
                <button
                    className="standard-button footer-button"
                    onClick={handleDeleteNote}
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
