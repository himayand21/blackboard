import {
	UPDATE_LISTS,
	ADD_LIST
} from '../constants/actionTypes';
import { generateId } from '../util/generateId';
import { updateBoards } from './board';
import { hideModal, showFormError } from './modal';
import {removeCard} from './card';

export const addList = () => async (dispatch, getState) => {
	const { modal } = getState();
	const { form, origin: boardId } = modal;
	const emptyKey = Object.keys(form).find(elem => !form[elem]);
	if (emptyKey) {
		dispatch(showFormError(emptyKey))
	} else {
		const id = generateId();
		await dispatch({
			type: ADD_LIST,
			payload: {
				...form,
				parent: boardId,
				id
			}
		});
		dispatch(hideModal());
	}
}

export const updateList = () => async (dispatch, getState) => {
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
					...form
				}
			}
			return list
		});
		await dispatch(updateLists(newLists));
		dispatch(hideModal());
	}
}

export const removeList = ({listId}) => async (dispatch, getState) => {
	const {lists, cards} = getState();
	const newLists = lists.filter(list => list.id !== listId);
	await dispatch(updateLists(newLists));
	const removedCards = cards.filter(card => card.parent === listId);
	removedCards.forEach(async (card) => await dispatch(removeCard({cardId: card.id})))
}

export const updateLists = (payload) => {
	return ({
		type: UPDATE_LISTS,
		payload
	})
}