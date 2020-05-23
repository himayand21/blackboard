import React from 'react';
import PropTypes from 'prop-types';
import {useMutation} from '@apollo/react-hooks';

import {Loader} from '../../components/loader';

import query from '../../queries/boards';
import mutation from '../../mutations/deleteBoard';

export const DeleteBoard = (props) => {
    const {
        hideModal,
        id,
        selectedBoard
    } = props;

    const [mutate, {loading: deleting}] = useMutation(mutation, {
        awaitRefetchQueries: true
    });

    const deleteBoard = async () => {
        await mutate({
            variables: {
                id: selectedBoard.id
            },
            refetchQueries: [{
                query,
                variables: {user: id}
            }]
        });
        hideModal();
    };

    return (
        <div className="create-board">
            <div className="create-board-header">
				Are you sure?
            </div>
            <div className="create-board-intro delete-board">
				This process is irreversible and would remove all Notes associated with<span>{selectedBoard.name}</span>.
            </div>
            <footer className="create-board-footer">
                <button
                    className="standard-button"
                    onClick={deleteBoard}
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
    id: PropTypes.string,
    hideModal: PropTypes.func,
    selectedBoard: PropTypes.object,
    setSelectedBoard: PropTypes.func
};