import React from 'react';
import PropTypes from 'prop-types';
import {useMutation} from '@apollo/react-hooks';

import {getRelativeTime} from '../../../util/getRelativeTime';
import {Icon} from '../../../components/icon';
import {Toast} from '../../../components/toast/Toast';
import {Loader} from '../../../components/loader';

import query from '../../../queries/getPinnedNotes';
import refetchQuery from '../../../queries/boardDetails';
import recentNotesQuery from '../../../queries/getRecentNotes';
import mutation from '../../../mutations/togglePinNote';

export const NoteBox = (props) => {
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
        id,
        pinned,
        board,
        owner,
        ownerDetails,
        boardDetails
    } = note;
    const relativeTime = getRelativeTime(time);
    const showcCommentBox = comments.length || sharedWith.length;

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
                query,
                variables: {id: owner}
            }, {
                query: refetchQuery,
                variables: {id: board}
            }, {
                query: recentNotesQuery,
                variables: {id: board}
            }]
        });
    };

    return (
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
                {showcCommentBox ? (
                    <div className="note-comment-count">
                        {comments.length ?
                            <span>
                                <i className="fas fa-comments" />
                                {comments.length}
                            </span> : null}
                        {sharedWith.length ?
                            <span>
                                <i className="fas fa-paper-plane" />
                                {sharedWith.length}
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
                        <span>
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
    );
};

NoteBox.propTypes = {
    note: PropTypes.object,
    goToNote: PropTypes.func,
    color: PropTypes.string,
    shared: PropTypes.bool,
    preview: PropTypes.bool
};