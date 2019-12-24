import {
	UPDATE_CARDS,
	ADD_CARD
} from '../constants/actionTypes';
import { generateId } from '../util/generateId';
import { updateLists } from './list';
import { hideModal, showFormError } from './modal';
import { removeComment } from './comment';

export const addCard = () => async (dispatch, getState) => {
	const { modal } = getState();
	const { form, origin: listId } = modal;
	const emptyKey = Object.keys(form).find(elem => !form[elem]);
	if (emptyKey) {
		dispatch(showFormError(emptyKey))
	} else {
		const id = generateId();
		await dispatch({
			type: ADD_CARD,
			payload: {
				...form,
				parent: listId,
				id
			}
		});
		dispatch(hideModal());
	}
}

export const updateCard = () => async (dispatch, getState) => {
	const { modal, cards } = getState();
	const { form, origin: cardId } = modal;
	const emptyKey = Object.keys(form).find(elem => !form[elem]);
	if (emptyKey) {
		dispatch(showFormError(emptyKey))
	} else {
		const id = generateId();
		const newCards = cards.map(card => {
			if (card.id === cardId) {
				return {
					...card,
					...form
				}
			}
			return card
		});
		await dispatch(updateCards(newCards));
		dispatch(hideModal());
	}
}

export const updateCards = (payload) => {
	return ({
		type: UPDATE_CARDS,
		payload
	})
}

export const removeCard = ({cardId}) => async (dispatch, getState) => {
	const {cards, comments} = getState();
	const newCards = cards.filter(card => card.id !== cardId);
	await dispatch(updateCards(newCards));
	const removedComments = comments.filter(comment => comment.parent === cardId);
	removedComments.forEach(async (comment) => await dispatch(removeComment({commentId: comment.id})));
}

export const moveCardToList = ({cardId, listId}) => async (dispatch, getState) => {
	const {cards} = getState();
	const newCards = cards.map(card => {
		if (card.id === cardId) {
			return ({
				...card,
				parent: listId
			});
		}
		return card;
	});
	dispatch(updateCards(newCards));
}