import React from 'react';
import PropTypes from 'prop-types';
import {useMutation} from '@apollo/react-hooks';

import {Loader} from '../../components/loader';
import {Toast} from '../../components/toast/Toast';

import getBoards from '../../queries/boards';
import deleteBoard from '../../mutations/deleteBoard';

export const DeleteBoard = (props) => {
    const {
        hideModal,
        selectedBoard
    } = props;

    const [remove, {loading: deleting, error: mutationError}] = useMutation(deleteBoard, {
        awaitRefetchQueries: true
    });

    const handleClick = async () => {
        await remove({
            variables: {
                id: selectedBoard.id
            },
            refetchQueries: [{
                query: getBoards
            }]
        });
        hideModal();
    };

    return (
        <div className="modal-content">
            {mutationError ? (
                <Toast content={{
                    message: 'Uh oh! Failed to delete board',
                    type: 'error'
                }} />
            ) : null}
            <div className="modal-content-header">
				Are you sure?
            </div>
            <div className="modal-content-intro delete-board">
				This process is irreversible and would remove all Notes associated with<span>{selectedBoard.name}</span>.
            </div>
            <footer className="modal-footer">
                <button
                    className="standard-button"
                    onClick={handleClick}
                >
                    {deleting ? <Loader /> : 'Confirm'}
                </button>
                <button
                    className="standard-button"
                    onClick={hideModal}
                >
					Cancel
                </button>
            </footer>
        </div>
    );
};

DeleteBoard.propTypes = {
    hideModal: PropTypes.func,
    selectedBoard: PropTypes.object,
    setSelectedBoard: PropTypes.func
};