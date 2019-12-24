import {
    ADD_COMMENT,
    UPDATE_COMMENTS
} from '../constants/actionTypes';
import {generateId} from '../util/generateId';
import {updateCards} from './card';

export const addComment = (content, parent, id) => async (dispatch, getState) => {
    const {user} = getState();
    dispatch({
        type: ADD_COMMENT,
        payload: {
            content,
            parent,
            id,
            sender: user
        }
    });
}

export const addCommentToCard = ({comment, cardId}) => async (dispatch, getState) => {
    const id = generateId();
    const {cards} = getState();
    const updatedCards = cards.map(card => {
        if (card.id === cardId) {
            return {...card, comments: [...card.comments, id]}
        }
        return card
    })
    dispatch(addComment(comment, cardId, id));
    dispatch(updateCards(updatedCards));
}

export const removeComment = ({commentId}) => async (dispatch, getState) => {
    const {comments} = getState();
    const newComments = comments.filter(comment => comment.id !== commentId);

    // NOTE: in case user is given the option to delete a comment - this will be required
    // const {cards} = getState();
	// const updatedCards = cards.map(card => {
	// 	if (card.id === cardId) {
	// 		return ({
	// 			...card,
	// 			comments: card.comments.filter(comment => comment.id !== commentId)
	// 		});
	// 	}
	// 	return card
    // });
    // await dispatch(updateCards(updatedCards));

    dispatch(updateComments(newComments));
}

export const updateComments = (payload) => {
    return ({
        type: UPDATE_COMMENTS,
        payload
    })
}