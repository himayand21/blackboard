import {
    ADD_COMMENT,
    UPDATE_COMMENTS
} from '../constants/actionTypes';
import {generateId} from '../util/generateId';
import {updateCards} from './card';

export const addComment = ({comment: content, cardId}) => async (dispatch, getState) => {
    const id = generateId();
    const {user} = getState();
    dispatch({
        type: ADD_COMMENT,
        payload: {
            content,
            parent: cardId,
            id,
            sender: user
        }
    });
}

export const removeComment = ({commentId}) => async (dispatch, getState) => {
    const {comments} = getState();
    const newComments = comments.filter(comment => comment.id !== commentId);
    dispatch(updateComments(newComments));
}

export const updateComments = (payload) => {
    return ({
        type: UPDATE_COMMENTS,
        payload
    })
}