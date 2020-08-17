import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useMutation} from '@apollo/react-hooks';

import {Loader} from '../../components/loader';
import {Pallete} from '../../components/pallete';
import {Toast} from '../../components/toast/Toast';

import addBoard from '../../mutations/addBoard';

export const CreateBoard = (props) => {
    const [boardColor, setBoardColor] = useState('grey');
    const [boardName, setBoardName] = useState('');

    const {
        hideModal
    } = props;

    const [add, {loading: adding, error: mutationError}] = useMutation(addBoard);

    const handleClick = async () => {
        await add({
            variables: {
                name: boardName,
                color: boardColor
            }
        });
        hideModal();
    };

    const handleInput = (event) => {
        const name = event.target.value;
        if (name.length <= 25) setBoardName(event.target.value);
    };

    const handleEnter = (event) => {
        if (boardName.length && event.keyCode === 13) {
            handleClick();
        }
    };

    useEffect(() => {
        setBoardName('');
        setBoardColor('grey');
        return (() => {
            setBoardName('');
            setBoardColor('grey');
        });
    }, []);

    return (
        <div className="modal-content">
            {mutationError ? (
                <Toast content={{
                    message: 'Uh oh! Board creation failed.',
                    type: 'error'
                }} />
            ) : null}
            <header className="modal-content-header">Create a Board</header>
            <div className="modal-content-intro">
				A board is like a collection. For example, if you are planning for a Goa trip - the board title could be
                <span>Trip to Goa.</span>
            </div>
            <div className="modal-form">
                <div className="form-label">
					TITLE
                </div>
                <input
                    type="text"
                    value={boardName}
                    placeholder="Maximum 25 characters"
                    onChange={handleInput}
                    onKeyDown={handleEnter}
                />
                <div className="form-label">
					COLOR
                </div>
                <Pallete
                    selected={boardColor}
                    handleChange={setBoardColor}
                />
                <div className="form-error-row" />
            </div>
            <footer className="modal-footer">
                <button
                    className="standard-button"
                    disabled={!boardName.length}
                    onClick={handleClick}
                >
                    {adding ? <Loader /> : 'Confirm'}
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

CreateBoard.propTypes = {
    hideModal: PropTypes.func
};