import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {graphql} from 'react-apollo';

import {Loader} from '../../components/loader';

import query from '../../queries/boards';
import mutation from '../../mutations/deleteBoard';

const DeleteBoardComponent = (props) => {
    const [deleting, setDeleting] = useState(false);

    const {
        hideModal,
        id,
        selectedBoard,
        mutate
    } = props;

    const deleteBoard = async () => {
        setDeleting(true);
        await mutate({
            variables: {
                id: selectedBoard.id
            },
            refetchQueries: [{
                query,
                variables: {user: id}
            }]
        });
        setDeleting(false);
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

DeleteBoardComponent.propTypes = {
    mutate: PropTypes.func,
    id: PropTypes.string,
    hideModal: PropTypes.func,
    selectedBoard: PropTypes.object,
    setSelectedBoard: PropTypes.func
};

export const DeleteBoard = graphql(mutation, {
    options: {
        awaitRefetchQueries: true,
        ignoreResults: true
    }
})(DeleteBoardComponent);