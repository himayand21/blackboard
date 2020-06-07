/* eslint-disable no-nested-ternary */
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {useHistory, useRouteMatch} from 'react-router-dom';
import {useQuery} from '@apollo/react-hooks';

import {getRelativeTime} from '../../util/getRelativeTime';
import {getSpan} from '../../util/getSpan';
import {getPlural} from '../../util/getPlural';

import sharedNotesQuery from '../../queries/getSharedNotes';
import recentNotesQuery from '../../queries/getRecentNotes';
import pinnedNotesQuery from '../../queries/getPinnedNotes';
import query from '../../queries/boards';

import {Modal} from '../../components/modal';
import {NoteBox} from '../notes/components/NoteBox';

import {
    REDIRECT_TOKEN,
    DASHBOARD,
    NOTES,
    ERROR
} from '../../constants';
import {Interactive} from '../../components/interactive';
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
    const match = useRouteMatch();

    const {id} = props;
    const {error, loading, data} = useQuery(query, {
        variables: {
            user: id
        }
    });
    const {error: sharedNotesError, loading: loadingSharedNotes, data: sharedNotesData} = useQuery(sharedNotesQuery, {
        variables: {
            id
        }
    });
    const {error: recentNotesError, loading: loadingRecentNotes, data: recentNotesData} = useQuery(recentNotesQuery, {
        variables: {
            id
        }
    });
    const {error: pinnedNotesError, loading: loadingPinnedNotes, data: pinnedNotesData} = useQuery(pinnedNotesQuery, {
        variables: {
            id
        }
    });

    useEffect(() => {
        if (error || sharedNotesError || recentNotesError || pinnedNotesError) {
            history.push(ERROR);
        }
    }, [error, sharedNotesError, recentNotesError, pinnedNotesError]);

    if (error || sharedNotesError || recentNotesError || pinnedNotesError) {
        return null;
    }

    if (loading || loadingSharedNotes || loadingRecentNotes || loadingPinnedNotes) {
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
    const {getSharedNotes: sharedNotes} = sharedNotesData;
    const {getRecentNotes: recentNotes} = recentNotesData;
    const {getPinnedNotes: pinnedNotes} = pinnedNotesData;

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
            const nextRoute = `${DASHBOARD}/${boardId}${NOTES}`;
            sessionStorage.setItem(REDIRECT_TOKEN, nextRoute);
            history.push(nextRoute);
        }
    };

    const goToViewNote = (noteId) => {
        const noteRoute = `${match.path}/note/${noteId}`;
        sessionStorage.setItem(REDIRECT_TOKEN, noteRoute);
        history.push(noteRoute);
    };

    const goToNote = (note) => {
        const {board: boardId, id: noteId} = note;
        const noteRoute = `${match.path}/${boardId}/notes/${noteId}`;
        sessionStorage.setItem(REDIRECT_TOKEN, noteRoute);
        history.push(noteRoute);
    };

    return (
        <>
            <div className="boards-wrapper home-wrapper">
                <div className="boards-container">
                    {pinnedNotes.length ? (
                        <div className="section-container">
                            <div className="boards-title-section">
                                <div className="board-title-header">PINNED NOTES</div>
                            </div>
                            <div className="boards">
                                {pinnedNotes.map((note) => (
                                    <NoteBox
                                        key={note.id}
                                        note={note}
                                        color={note.boardDetails.color}
                                        goToNote={() => goToNote(note)}
                                        preview
                                    />
                                ))}
                            </div>
                        </div>
                    ) : null}
                    {recentNotes.length ? (
                        <div className="section-container">
                            <div className="boards-title-section">
                                <div className="board-title-header">RECENTS</div>
                            </div>
                            <div className="boards">
                                {recentNotes.map((note) => (
                                    <NoteBox
                                        key={note.id}
                                        note={note}
                                        color={note.boardDetails.color}
                                        goToNote={() => goToNote(note)}
                                        preview
                                    />
                                ))}
                            </div>
                        </div>
                    ) : null}
                    <div className="section-container">
                        <div className="boards-title-section">
                            <div className="board-title-header">MY BOARDS</div>
                            {boards.length ? (
                                <div className={`${showOptions ? 'with-options' : ''} board-options-wrapper`}>
                                    <Interactive
                                        className={'fas fa-chevron-left'}
                                        onClick={toggleShowOptions}
                                        title={showOptions ? 'Hide Options' : 'Show Options'}
                                    />
                                    <div className="standard-interactive-group">
                                        <Interactive
                                            className={'fas fa-plus'}
                                            title={'Add'}
                                            onClick={showCreateBoardModal}
                                        />
                                        <Interactive
                                            className={'fas fa-pen-fancy'}
                                            title={'Edit'}
                                            onClick={showEditBox}
                                        />
                                        <Interactive
                                            className={'fas fa-trash'}
                                            title={'Delete'}
                                            onClick={showDeleteBox}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className="board-options-wrapper">
                                    <Interactive
                                        className={'fas fa-plus'}
                                        title={'Add'}
                                        onClick={showCreateBoardModal}
                                    />
                                </div>
                            )
                            }
                        </div>
                        <div className="boards">
                            <div className="board-box add-board-box" onClick={showCreateBoardModal}>
                                <div className="board-details">
                                    <div className="add-board-icon">+</div>
                                    <div className="add-board-text">Add Board</div>
                                </div>
                                <div className="board-time" />
                            </div>
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
                        </div>
                    </div>
                    {sharedNotes.length ? (
                        <div className="section-container">
                            <div className="boards-title-section">
                                <div className="board-title-header">SHARED WITH ME</div>
                            </div>
                            <div className="boards">
                                {sharedNotes.map((note) => (
                                    <NoteBox
                                        key={note.id}
                                        note={note}
                                        color={note.boardDetails.color}
                                        goToNote={() => goToViewNote(note.id)}
                                        shared
                                    />
                                ))}
                            </div>
                        </div>
                    ) : null}
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