import {
	UPDATE_LISTS,
	ADD_LIST
} from '../constants/actionTypes';
import { generateId } from '../util/generateId';
import { updateBoards } from './board';
import { hideModal, showFormError } from './modal';
import {removeCard} from './card';

export const addList = () => async (dispatch, getState) => {
	const { modal, boards } = getState();
	const { form, origin: boardId } = modal;
	const emptyKey = Object.keys(form).find(elem => !form[elem]);
	if (emptyKey) {
		dispatch(showFormError(emptyKey))
	} else {
		const id = generateId();
		const newBoards = boards.map(board => {
			if (board.id === boardId) {
				return ({
					...board,
					lists: [
						...board.lists,
						id
					]
				})
			}
			return board
		});
		await dispatch({
			type: ADD_LIST,
			payload: {
				...form,
				parent: boardId,
				id,
				cards: []
			}
		});
		await dispatch(updateBoards(newBoards));
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
	const {lists} = getState();
	const selectedList = lists.find(list => list.id === listId);
	const newLists = lists.filter(list => list.id !== listId);
	await dispatch(updateLists(newLists));
	selectedList.cards.forEach(card => dispatch(removeCard({cardId: card})))
}

export const removeListAndUpdateBoard = ({boardId, listId}) => async (dispatch, getState) => {
	const {boards} = getState();
	const updatedBoards = boards.map(board => {
		if (board.id === boardId) {
			return ({
				...board,
				lists: board.lists.filter(list => list !== listId)
			});
		}
		return board
	});
	await dispatch(updateBoards(updatedBoards));
	dispatch(removeList({listId}));
}

export const updateLists = (payload) => {
	return ({
		type: UPDATE_LISTS,
		payload
	})
}