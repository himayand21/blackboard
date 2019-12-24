import React from "react";
import './comment.scss';

export const Comment = (props) => {
    const {comment} = props;
    const {
        sender,
        content
    } = comment;
    const {
        name
    } = sender;

    return (
        <section className="comment-wrapper">
            <div className="comment-sender">{name}</div>
            <div className="comment-content">{content}</div>
        </section>
    )
}