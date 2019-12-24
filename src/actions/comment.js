import {ADD_COMMENT} from '../constants/actionTypes';
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