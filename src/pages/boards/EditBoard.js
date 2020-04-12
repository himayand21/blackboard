import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {graphql} from 'react-apollo';

import {Loader} from '../../components/loader';
import {Pallete} from '../../components/pallete';

import query from '../../queries/boards';
import mutation from '../../mutations/updateBoard';

const EditBoardComponent = (props) => {
    const [updating, setUpdating] = useState(false);

    const {
        mutate,
        id,
        hideModal,
        selectedBoard,
        setSelectedBoard
    } = props;

    const updateBoard = async () => {
        setUpdating(true);
        await mutate({
            variables: {
                id: selectedBoard.id,
                name: selectedBoard.name,
                color: selectedBoard.color
            },
            refetchQueries: [{
                query,
                variables: {user: id}
            }]
        });
        setUpdating(false);
        hideModal();
    };

    const handleInput = (event) => {
        const boardName = event.target.value;
        if (boardName.length <= 25) {
            setSelectedBoard({
                ...selectedBoard,
                name: boardName
            });
        }
    };

    const handleBoardColor = (boardColor) => {
        setSelectedBoard({
            ...selectedBoard,
            color: boardColor
        });
    };

    const {
        name,
        color
    } = selectedBoard;

    return (
        <div className="create-board">
            <header className="create-board-header">Edit Board</header>
            <div className="create-board-form">
                <div className="form-label">
					TITLE
                </div>
                <input
                    type="text"
                    value={name}
                    placeholder="Maximum 25 characters"
                    onChange={handleInput}
                />
                <div className="form-label">
					COLOR
                </div>
                <Pallete
                    selected={color}
                    handleChange={handleBoardColor}
                />
                <div className="form-error-row" />
            </div>
            <footer className="create-board-footer">
                <button
                    className="standard-button"
                    disabled={!name.length}
                    onClick={updateBoard}
                >
                    {updating ? <Loader /> : 'Confirm'}
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

EditBoardComponent.propTypes = {
    mutate: PropTypes.func,
    id: PropTypes.string,
    hideModal: PropTypes.func,
    selectedBoard: PropTypes.object,
    setSelectedBoard: PropTypes.func
};

export const EditBoard = graphql(mutation, {
    options: {
        awaitRefetchQueries: true,
        ignoreResults: true
    }
})(EditBoardComponent);