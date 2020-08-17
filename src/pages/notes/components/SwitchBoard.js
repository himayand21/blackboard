import React, {useState} from 'react';
import PropTypes from 'prop-types';

import {Loader} from '../../../components/loader';

export const SwitchBoard = (props) => {
    const {
        hideModal,
        switching,
        handleConfirm,
        board
    } = props;

    const [selectedBoard, setSelectedBoard] = useState(board);
    const {boards} = props;

    const updateSelectedBoard = (boardId) => setSelectedBoard(boardId);

    return (
        <div className="modal-content">
            <div className="modal-content-header">
                Switch Board
            </div>
            <div className="create-board-list">
                <div className="select-board-wrapper">
                    {boards.map((each) => (
                        <div
                            className={`board-box board-tile board-box-${each.color}`}
                            onClick={() => updateSelectedBoard(each.id)}
                            key={each.id}
                        >
                            <span className="board-title">{each.name}</span>
                            {(selectedBoard === each.id) ? (
                                <div className="absolute-board">
                                    <i className="fas fa-check" />
                                </div>
                            ) : null}
                        </div>
                    ))}
                </div>
            </div>
            <footer className="modal-footer">
                <button
                    className="standard-button footer-button"
                    onClick={() => handleConfirm(selectedBoard)}
                    disabled={selectedBoard === board}
                >
                    {switching ? <Loader /> : 'Confirm'}
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

SwitchBoard.propTypes = {
    board: PropTypes.string,
    hideModal: PropTypes.func,
    switching: PropTypes.bool,
    handleConfirm: PropTypes.func,
    boards: PropTypes.array
};
