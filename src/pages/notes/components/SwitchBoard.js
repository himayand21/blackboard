import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useQuery} from '@apollo/react-hooks';

import {Loader} from '../../../components/loader';
import {Toast} from '../../../components/toast/Toast';

import query from '../../../queries/boards';

export const SwitchBoard = (props) => {
    const {
        hideModal,
        switching,
        handleConfirm,
        board,
        owner
    } = props;

    const [selectedBoard, setSelectedBoard] = useState(board);
    const {data, error, loading} = useQuery(query, {
        variables: {
            user: owner
        }
    });

    if (error) {
        return (
            <>
                <Toast content={{
                    message: 'Uh oh! Failed to load your boards.',
                    type: 'error'
                }} />
                <div className="create-board">
                    <div className="create-board-header">
                        Sorry
                    </div>
                    <div className="create-board-intro delete-board">
                        There seems to be a problem loading your boards ...
                    </div>
                </div>
            </>
        );
    }

    const updateSelectedBoard = (boardId) => setSelectedBoard(boardId);

    if (loading) {
        return (
            <div className="create-board">
                <div className="create-board-header">
                Switch Board
                </div>
                <div className="create-board-intro delete-board">
                Just a Second ...
                </div>
            </div>
        );
    }

    const {boards} = data;

    return (
        <div className="create-board">
            <div className="create-board-header">
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
            <footer className="create-board-footer">
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
    owner: PropTypes.string
};
