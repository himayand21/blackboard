import React from 'react';
import PropTypes from 'prop-types';
import {useMutation} from '@apollo/react-hooks';

import {Loader} from '../../components/loader';
import {Pallete} from '../../components/pallete';
import {Toast} from '../../components/toast/Toast';

import getBoards from '../../queries/boards';
import updateBoard from '../../mutations/updateBoard';

export const EditBoard = (props) => {
    const {
        hideModal,
        selectedBoard,
        setSelectedBoard
    } = props;

    const [update, {loading: updating, error: mutationError}] = useMutation(updateBoard, {
        awaitRefetchQueries: true
    });

    const handleClick = async () => {
        await update({
            variables: {
                id: selectedBoard.id,
                name: selectedBoard.name,
                color: selectedBoard.color
            },
            refetchQueries: [{
                query: getBoards
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

    const handleEnter = (event) => {
        if (name.length && event.keyCode === 13) {
            handleClick();
        }
    };

    const {
        name,
        color
    } = selectedBoard;

    return (
        <div className="modal-content">
            {mutationError ? (
                <Toast content={{
                    message: 'Uh oh! Failed to update your board.',
                    type: 'error'
                }} />
            ) : null}
            <header className="modal-content-header">Edit Board</header>
            <div className="modal-form">
                <div className="form-label">
					TITLE
                </div>
                <input
                    type="text"
                    value={name}
                    placeholder="Maximum 25 characters"
                    onChange={handleInput}
                    onKeyDown={handleEnter}
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
            <footer className="modal-footer">
                <button
                    className="standard-button"
                    disabled={!name.length}
                    onClick={handleClick}
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
    hideModal: PropTypes.func,
    selectedBoard: PropTypes.object,
    setSelectedBoard: PropTypes.func
};