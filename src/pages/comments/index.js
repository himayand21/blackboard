import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useMutation} from '@apollo/react-hooks';

import {Loader} from '../../components/loader';
import {Icon} from '../../components/icon';
import {Toast} from '../../components/toast/Toast';

import query from '../../queries/noteDetails';
import mutation from '../../mutations/addComment';
import {getRelativeTime} from '../../util/getRelativeTime';

export const Comments = (props) => {
    const {note} = props;
    const {comments} = note;

    const [text, setText] = useState('');

    const [mutate, {loading: updating, error: mutationError}] = useMutation(mutation, {
        awaitRefetchQueries: true
    });

    const sendComment = async () => {
        await mutate({
            variables: {
                content: text,
                note: note.id
            },
            refetchQueries: [{
                query,
                variables: {id: note.id}
            }]
        });
        setText('');
    };

    return (
        <div className="create-board">
            {mutationError ? (
                <Toast content={{
                    message: 'Uh oh! Failed to post your comment',
                    type: 'error'
                }} />
            ) : null}
            <div className="create-board-header">
                Comments
            </div>
            <div className="comments-section">
                {comments.length ? (
                    <div className="comment-section">
                        {comments.map((comment) => {
                            const {
                                id,
                                content,
                                senderDetails,
                                time
                            } = comment;
                            const {
                                name
                            } = senderDetails;
                            return (
                                <div
                                    className="comment-wrapper"
                                    key={id}
                                >
                                    <div className="comment-sender-icon">
                                        <Icon name={name} />
                                    </div>
                                    <div className="comment-details">
                                        <div className="comment-sender-details">
                                            <span className="comment-sender-name">{name}</span>
                                            <span className="comment-time">{getRelativeTime(time)}</span>
                                        </div>
                                        <div className="comment-message">
                                            {content}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : null}
                <div className="action-row">
                    <div className="type-comment">
                        <input
                            placeholder="Type your comment ..."
                            onChange={(event) => setText(event.target.value)}
                            value={text}
                        />
                    </div>
                    <div className="send-comment">
                        <button
                            className="standard-button footer-button"
                            onClick={sendComment}
                        >
                            {updating ? <Loader /> : 'Send'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

Comments.propTypes = {
    data: PropTypes.object,
    note: PropTypes.object
};