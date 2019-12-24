import {
	UPDATE_CARDS,
	ADD_CARD
} from '../constants/actionTypes';
import { generateId } from '../util/generateId';
import { updateLists } from './list';
import { hideModal, showFormError } from './modal';

export const addCard = () => async (dispatch, getState) => {
	const { modal, lists } = getState();
	const { form, origin: listId } = modal;
	const emptyKey = Object.keys(form).find(elem => !form[elem]);
	if (emptyKey) {
		dispatch(showFormError(emptyKey))
	} else {
		const id = generateId();
		const newLists = lists.map(list => {
			if (list.id === listId) {
				return {
					...list,
					cards: [
						...list.cards,
						id
					]
				}
			}
			return list
		});
		await dispatch({
			type: ADD_CARD,
			payload: {
				...form,
				parent: listId,
				id,
				comments: []
			}
		});
		await dispatch(updateLists(newLists));
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
		await dispatch({
			type: UPDATE_CARDS,
			payload: newCards
		});
		dispatch(hideModal());
	}
}

export const updateCards = (payload) => {
	return ({
		type: UPDATE_CARDS,
		payload
	})
}

export const removeCard = ({cardId, listId}) => async (dispatch, getState) => {
	const {cards, lists} = getState();
	const newCards = cards.filter(card => card.id !== cardId);
	const updatedLists = lists.map(list => {
		if (list.id === listId) {
			return ({
				...list,
				cards: list.cards.filter(card => card !== cardId)
			});
		}
		return list
	});
	dispatch(updateCards(newCards));
	dispatch(updateLists(updatedLists));
}