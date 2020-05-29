import React from 'react';
import PropTypes from 'prop-types';

import {getRelativeTime} from '../../../util/getRelativeTime';
import {Icon} from '../../../components/icon';

export const NoteBox = (props) => {
    const {
        note,
        color,
        goToNote,
        shared
    } = props;
    const {
        name,
        description,
        comments,
        time,
        sharedWith,
        id,
        ownerDetails
    } = note;
    const relativeTime = getRelativeTime(time);

    return (
        <div
            className={`note-box ${color}-note-box`}
            onClick={() => goToNote(id)}
            key={time}
        >
            <div className="note-details">
                <div className="note-name">
                    {name ? name : 'Untitled'}
                </div>
                <div className="note-description">
                    {description}
                </div>
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
                {shared ? (
                    <div className="note-owned-by">
                        <Icon name={ownerDetails.name} />
                        <span className="note-owned-by-name">{ownerDetails.name}</span>
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
    shared: PropTypes.bool
};