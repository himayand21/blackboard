import React, { useState, Fragment } from 'react';
import { Comment } from '../comment';
import {Popup} from '../popup';

export const CardComponent = (props) => {
    const [commentsVisible, setCommentVisible] = useState(false);
    const [comment, setComment] = useState('');
    const {
        card,
        comments,
        addCommentToCard,
        showEditCard,
        removeCardAndUpdateList
    } = props;
    const {
        comments: commentIds,
        id: cardId,
        parent: listId,
        name: cardName,
        description: cardDescription
    } = card;

    const cardComments = comments.filter(comment => commentIds.includes(comment.id));
    const buttonLabel = commentsVisible ? 'Hide Comments' : 'Show Comments';

    const toggleCommentsVisible = () => setCommentVisible(!commentsVisible);
    const handleInputChange = (e) => setComment(e.target.value);
    const handleKeyPress = (e) => {
        const code = e.keyCode || e.which;
        if (code == 13) addComment();
    }
    const addComment = () => {
        if (comment) {
            setComment('');
            setCommentVisible(true);
            addCommentToCard({comment, cardId});
        }
    }

    return (
        <section className="card-wrapper">
            <header className="card-header">
                <div className="card-name">{cardName}</div>
                <Popup>
                    <button onClick={() => showEditCard(card)}>Edit</button>
                    <button onClick={() => removeCardAndUpdateList({cardId, listId})}>Delete</button>
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
                    onClick={addComment}
                >
                    Post
                </button>
            </div>
        </section>
    )
};