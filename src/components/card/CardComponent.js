import React, { useState, Fragment, useEffect } from 'react';
import { Comment } from '../comment';
import { Popup } from '../popup';
import {ListOptions} from './listOptions';

export const CardComponent = (props) => {
    const [commentsVisible, setCommentVisible] = useState(false);
    const [comment, setComment] = useState('');
    const [moveFlag, setMoveFlag] = useState(false);
    const {
        card,
        comments,
        addComment,
        showEditCard,
        lists,
        removeCard,
        moveCardToList
    } = props;
    const {
        id: cardId,
        parent: listId,
        name: cardName,
        description: cardDescription
    } = card;

    const switchToMainMenu = () => setMoveFlag(false);

    const cardComments = comments.filter(comment => comment.parent === cardId);
    const buttonLabel = commentsVisible ? 'Hide Comments' : 'Show Comments';

    const toggleCommentsVisible = () => setCommentVisible(!commentsVisible);
    const handleInputChange = (e) => setComment(e.target.value);
    const handleKeyPress = (e) => {
        const code = e.keyCode || e.which;
        if (code == 13) postComment();
    }
    const postComment = () => {
        if (comment) {
            setComment('');
            setCommentVisible(true);
            addComment({ comment, cardId });
        }
    }

    const otherLists = lists.filter(list => list.id !== listId);
    const moveTo = (listId) => moveCardToList({cardId, listId});

    return (
        <section className="card-wrapper">
            <header className="card-header">
                <div className="card-name">{cardName}</div>
                <Popup>
                    {moveFlag ?
                        <ListOptions
                            lists={otherLists}
                            switchToMainMenu={switchToMainMenu}
                            moveTo={moveTo}
                        /> :
                        <Fragment>
                            <button onClick={() => showEditCard(card)}>Edit</button>
                            <button onClick={() => removeCard({ cardId })}>Delete</button>
                            {otherLists.length ? <button onClick={() => setMoveFlag(true)}>Move</button> : null}
                        </Fragment>
                    }
                </Popup>
            </header>
            <article className="card-details">
                <div className="card-desc">{cardDescription}</div>
            </article>
            {cardComments.length ?
                <Fragment>
                    <button className="card-button" onClick={toggleCommentsVisible}>{buttonLabel}</button>
                    {commentsVisible ?
                        <div className="comments-wrapper">
                            {cardComments.map(comment => (
                                <Comment
                                    key={`comment-${comment.id}`}
                                    comment={comment}
                                />
                            ))}
                        </div> : null}
                </Fragment> : null}
            <div className="comment-add">
                <input
                    onChange={handleInputChange}
                    value={comment}
                    className="comment-add-input"
                    placeholder="Add a comment"
                    onKeyPress={handleKeyPress}
                />
                <button
                    className="comment-add-button"
                    onClick={postComment}
                >
                    Post
                </button>
            </div>
        </section>
    )
};