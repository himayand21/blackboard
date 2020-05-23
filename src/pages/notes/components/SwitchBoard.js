import React, {useState, Fragment} from 'react';
import PropTypes from 'prop-types';
import {useQuery} from '@apollo/react-hooks';
import {useHistory} from 'react-router-dom';

import {Loader} from '../../../components/loader';

import query from '../../../queries/boards';

import {ERROR} from '../../../constants';

export const SwitchBoard = (props) => {
    const {
        hideModal,
        switching,
        handleConfirm,
        board,
        owner
    } = props;

    const [selectedBoard, setSelectedBoard] = useState(board);
    const history = useHistory();
    const {data, error, loading} = useQuery(query, {
        user: owner
    });

    if (error) {
        history.push(ERROR);
    }

    const updateSelectedBoard = (boardId) => setSelectedBoard(boardId);

    return (
        <div className="create-board">
            <div className="create-board-header">
                Switch Board
            </div>
            {loading ? <div className="create-board-intro delete-board">
                Just a Second ...
            </div> : null}
            {!loading ?
                <Fragment>
                    <div className="create-board-list">
                        <div className="select-board-wrapper">
                            {data.boards.map((each) => (
                                <div
                                    className={`board-box board-box-${each.color}`}
                                    onClick={() => updateSelectedBoard(each.id)}
                                    key={each.id}
                                >
                                    <span className="board-name">{each.name}</span>
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
                </Fragment> : null}
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
