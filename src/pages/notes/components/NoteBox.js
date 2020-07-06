import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useHistory} from 'react-router-dom';
import {useMutation} from '@apollo/react-hooks';

import {getRelativeTime} from '../../../util/getRelativeTime';
import {Icon} from '../../../components/icon';
import {Toast} from '../../../components/toast/Toast';
import {Loader} from '../../../components/loader';
import {Popup} from '../../../components/popup';

import refetchQuery from '../../../queries/refetchQuery';
import mutation from '../../../mutations/togglePinNote';
import {DASHBOARD, NOTES, REDIRECT_TOKEN} from '../../../constants';

export const NoteBox = (props) => {
    const [commentPopupVisible, setCommentPopupVisible] = useState(false);
    const [sharePopupVisible, setSharePopupVisible] = useState(false);
    const [mousePosition, setMousePosition] = useState({
        x: 0,
        y: 0
    });

    const {
        note,
        color,
        goToNote,
        shared,
        preview
    } = props;
    const {
        name,
        description,
        comments,
        time,
        sharedWith,
        sharedWithDetails,
        id,
        pinned,
        board,
        ownerDetails,
        boardDetails
    } = note;

    const history = useHistory();

    const relativeTime = getRelativeTime(time);
    const showCommentBox = comments.length || sharedWith.length;

    const [mutate, {loading, error: mutationError}] = useMutation(mutation, {
        awaitRefetchQueries: true
    });

    const togglePin = (event) => {
        event.stopPropagation();
        mutate({
            variables: {
                id,
                pinned: !pinned
            },
            refetchQueries: [{
                query: refetchQuery
            }]
        });
    };

    const goToBoard = (event) => {
        event.stopPropagation();
        const boardURL = `${DASHBOARD}/${board}${NOTES}`;
        sessionStorage.setItem(REDIRECT_TOKEN, boardURL);
        history.push(boardURL);
    };

    const showCommentPopup = (event) => {
        event.stopPropagation();
        setCommentPopupVisible(true);
        const x = event.clientX;
        const y = event.clientY;
        if (x < (window.innerWidth / 2)) {
            setMousePosition({
                x: x - 25,
                y: y + 20
            });
        } else {
            setMousePosition({
                x: x - 200,
                y: y + 20
            });
        }
    };

    const showSharePopup = (event) => {
        event.stopPropagation();
        setSharePopupVisible(true);
        const x = event.clientX;
        const y = event.clientY;
        if (x < (window.innerWidth / 2)) {
            setMousePosition({
                x: x - 25,
                y: y + 20
            });
        } else {
            setMousePosition({
                x: x - 200,
                y: y + 20
            });
        }
    };

    const hideCommentPopup = () => {
        setCommentPopupVisible(false);
        setMousePosition({
            x: 0,
            y: 0
        });
    };

    const hideSharePopup = () => {
        setSharePopupVisible(false);
        setMousePosition({
            x: 0,
            y: 0
        });
    };

    const noOfComments = comments.length;
    const latestComment = comments[0];

    const noOfShares = sharedWith.length;
    const lastShare = sharedWithDetails[0];

    return (
        <>
            <div
                className={`note-box ${color}-note-box`}
                onClick={() => goToNote(id)}
                key={time}
            >
                {mutationError ? (
                    <Toast content={{
                        message: 'Uh oh! Failed to update your note.',
                        type: 'error'
                    }} />
                ) : null}
                <div className="note-details">
                    <div className="note-name">
                        <span className="note-name-span">{name ? name : 'Untitled'}</span>
                        {shared ? null : (
                            <span className={`note-name-pin ${pinned ? 'note-name-pinned' : ''}`}>
                                {loading ? <Loader /> : <i className="fas fa-thumbtack" onClick={togglePin} />}
                            </span>
                        )}
                    </div>
                    <div className="note-description">
                        {description}
                    </div>
                    {showCommentBox ? (
                        <div className="note-comment-count">
                            {noOfComments ?
                                <span onClick={showCommentPopup}>
                                    <i className="fas fa-comments" />
                                    {noOfComments}
                                </span> : null}
                            {noOfShares ?
                                <span onClick={showSharePopup}>
                                    <i className="fas fa-paper-plane" />
                                    {noOfShares}
                                </span> : null}
                        </div>
                    ) : null}
                    {shared ? (
                        <div className="note-owned-by">
                            <Icon name={ownerDetails.name} />
                            <span className="note-owned-by-name">{ownerDetails.name}</span>
                        </div>
                    ) : null}
                    {preview ? (
                        <div className="note-preview">
                            <span onClick={goToBoard}>
                                <i className="fas fa-clipboard" />
                                {boardDetails.name}
                            </span>
                        </div>
                    ) : null}
                </div>
                <div className="note-time">
                    <span>
                        {relativeTime}
                    </span>
                </div>
            </div>
            {noOfComments ?  (
                <Popup
                    show={commentPopupVisible}
                    hidePopup={hideCommentPopup}
                    position={{
                        left: mousePosition.x,
                        top: mousePosition.y
                    }}
                >
                    <div className="popup-message">
                        {`${latestComment.senderDetails.name} commented ${getRelativeTime(latestComment.time)}.`}
                    </div>
                </Popup>
            ) : null}
            {noOfShares ?  (
                <Popup
                    show={sharePopupVisible}
                    hidePopup={hideSharePopup}
                    position={{
                        left: mousePosition.x,
                        top: mousePosition.y
                    }}
                >
                    <div className="popup-message">
                        {`Shared with ${lastShare.name}${noOfShares > 1 ? ` and ${noOfShares - 1} others` : ''}.`}
                    </div>
                </Popup>
            ) : null}
        </>
    );
};

NoteBox.propTypes = {
    note: PropTypes.object,
    goToNote: PropTypes.func,
    color: PropTypes.string,
    shared: PropTypes.bool,
    preview: PropTypes.bool
};