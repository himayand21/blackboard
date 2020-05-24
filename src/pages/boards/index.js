/* eslint-disable no-nested-ternary */
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {useHistory} from 'react-router-dom';
import {useQuery} from '@apollo/react-hooks';

import {Modal} from '../../components/modal';

import {getRelativeTime} from '../../util/getRelativeTime';
import {getSpan} from '../../util/getSpan';

import query from '../../queries/boards';
import {getPlural} from '../../util/getPlural';

import {
    REDIRECT_TOKEN,
    BOARDS,
    NOTES,
    ERROR
} from '../../constants';
import {DeleteBoard} from './DeleteBoard';
import {EditBoard} from './EditBoard';
import {CreateBoard} from './CreateBoard';

export const Boards = (props) => {
    const [show, setShow] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [deleteMode, setDeleteMode] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [selectedBoard, setSelectedBoard] = useState(null);

    const history = useHistory();

    const {id} = props;
    const {error, loading, data} = useQuery(query, {
        variables: {
            user: id
        }
    });

    useEffect(() => {
        if (error) {
            history.push(ERROR);
        }
    }, [error]);

    if (error) {
        return null;
    }

    if (loading) {
        return (
            <div className="boards-wrapper">
                <div className="loading-section">
                    <span className="loading-board-details">
                        Almost there ...
                    </span>
                </div>
            </div>
        );
    }

    const {boards} = data;

    const showCreateBoardModal = () => {
        setShow(true);
        setShowOptions(false);
        setEditMode(false);
        setDeleteMode(false);
    };
    const hideModal = () => {
        setShow(false);
        setEditMode(false);
        setDeleteMode(false);
    };

    const showEditBox = () => {
        setEditMode(!editMode);
        setDeleteMode(false);
    };
    const showDeleteBox = () => {
        setEditMode(false);
        setDeleteMode(!deleteMode);
    };

    const toggleShowOptions = () => {
        if (showOptions) {
            setEditMode(false);
            setDeleteMode(false);
        }
        setShowOptions(!showOptions);
    };

    const showActionModal = (board) => {
        setShowOptions(false);
        setShow(true);
        setSelectedBoard(board);
    };

    const handleBoardClick = (boardId) => {
        if (!editMode && !deleteMode) {
            const nextRoute = `${BOARDS}/${boardId}${NOTES}`;
            sessionStorage.setItem(REDIRECT_TOKEN, nextRoute);
            history.push(nextRoute);
        }
    };

    if (!boards.length) {
        return (
            <>
                <div className="boards-wrapper">
                    <div className="boards-header-section">
                        <div className="board-header">{'Looks like, you don\'t have any boards here.'}</div>
                        <div className="board-subheader">If you are new, go ahead and <span>take a tour.</span></div>
                    </div>
                    <div className="boards-button-row">
                        <button onClick={showCreateBoardModal}>Create a Board</button>
                    </div>
                </div>
                <Modal
                    hideModal={hideModal}
                    show={show}
                >
                    <CreateBoard
                        hideModal={hideModal}
                        id={id}
                    />
                </Modal>
            </>
        );
    }

    return (
        <>
            <div className="boards-wrapper home-wrapper">
                <div className="boards-container">
                    <div className="boards-header-section">
                        <div className="board-header">Boards</div>
                    </div>
                    <div className="boards">
                        {boards.map((board, index) => {
                            const {
                                id: boardId,
                                name,
                                color,
                                time,
                                notes
                            } = board;
                            const relativeTime = getRelativeTime(time);
                            const noOfNotes = notes.length;
                            const {span, toBeDisplayed} = getSpan(noOfNotes);
                            const selectedNotes = notes.slice(0, toBeDisplayed);
                            const leftOut = noOfNotes - toBeDisplayed;
                            const positiveLeftOut = leftOut > 0;
                            return (
                                <div
                                    className={`board-box board-box-${color} animate-${index + 1} ${editMode || deleteMode ? 'action-box' : ''} grid-${span}`}
                                    onClick={() => handleBoardClick(boardId)}
                                    key={boardId}
                                >
                                    <div className="board-details">
                                        <div className="board-name">{name}</div>
                                        <div className="board-notes">
                                            {selectedNotes.map(({name: noteName, id: noteId}) => (
                                                <div className="board-note" key={noteId}>
                                                    <div className="board-note-icon">
                                                        <i className="fas fa-chevron-right" />
                                                    </div>
                                                    <div className="board-note-name">
                                                        {noteName ? noteName : 'Untitled'}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="board-note-count">
                                            {noOfNotes ? `${positiveLeftOut ? '+ ' + leftOut : noOfNotes} note${getPlural(positiveLeftOut ? leftOut : noOfNotes)}` : 'No notes yet'}
                                        </div>
                                    </div>
                                    <div className="board-time">
                                        <span>{relativeTime}</span>
                                    </div>
                                    {editMode || deleteMode ?
                                        <div
                                            className={`action-box-absolute ${editMode || deleteMode ? 'action-box-animate' : ''}`}
                                            onClick={() => showActionModal(board)}
                                        >
                                            <div className="animate-1 action-box-container">
                                                {editMode ? <span>edit</span> : null}
                                                {deleteMode ? <span>delete</span> : null}
                                            </div>
                                        </div> : null}
                                </div>
                            );
                        })}
                        <div className="board-box add-board-box" onClick={showCreateBoardModal}>
                            <div className="board-details">
                                <div className="add-board-icon">+</div>
                                <div className="add-board-text">Add Board</div>
                            </div>
                            <div className="board-time" />
                        </div>
                    </div>
                </div>
                <div
                    className={`${showOptions ? 'with-options' : ''} absolute-button-wrapper`}
                >
                    <button
                        className="standard-button"
                        onClick={toggleShowOptions}
                    >
                        <i className="fas fa-chevron-left" />
                    </button>
                    {showOptions ?
                        <div className="options-wrapper">
                            <button onClick={showCreateBoardModal}>
                                <i className="fas fa-plus" />
                            </button>
                            <button onClick={showEditBox}>
                                <i className="fas fa-pen-fancy" />
                            </button>
                            <button onClick={showDeleteBox}>
                                <i className="fas fa-trash" />
                            </button>
                        </div> :
                        null
                    }
                </div>
            </div>
            <Modal
                hideModal={hideModal}
                show={show}
            >
                {selectedBoard && editMode ?
                    <EditBoard
                        hideModal={hideModal}
                        selectedBoard={selectedBoard}
                        setSelectedBoard={setSelectedBoard}
                        id={id}
                    /> : selectedBoard && deleteMode ?
                        <DeleteBoard
                            hideModal={hideModal}
                            selectedBoard={selectedBoard}
                            setSelectedBoard={setSelectedBoard}
                            id={id}
                        /> :
                        <CreateBoard
                            hideModal={hideModal}
                            id={id}
                        />
                }
            </Modal>
        </>
    );
};

Boards.propTypes = {
    id: PropTypes.string
};