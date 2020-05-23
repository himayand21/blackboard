import React from 'react';
import PropTypes from 'prop-types';
import {useMutation} from '@apollo/react-hooks';

import {Loader} from '../../components/loader';
import {Pallete} from '../../components/pallete';

import query from '../../queries/boards';
import mutation from '../../mutations/updateBoard';

export const EditBoard = (props) => {
    const {
        id,
        hideModal,
        selectedBoard,
        setSelectedBoard
    } = props;

    const [mutate, {loading: updating}] = useMutation(mutation, {
        awaitRefetchQueries: true
    });

    const updateBoard = async () => {
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

EditBoard.propTypes = {
    id: PropTypes.string,
    hideModal: PropTypes.func,
    selectedBoard: PropTypes.object,
    setSelectedBoard: PropTypes.func
};