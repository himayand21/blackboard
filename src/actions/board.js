import {
	UPDATE_BOARDS,
	ADD_BOARD
} from '../constants/actionTypes';
import { generateId } from '../util/generateId';
import { hideModal, showFormError } from './modal';
import { removeList } from './list';

export const updateBoards = (payload) => {
	return ({
		type: UPDATE_BOARDS,
		payload
	})
}

export const updateBoard = () => async (dispatch, getState) => {
	const { modal, boards } = getState();
	const { form, origin: boardId } = modal;
	const emptyKey = Object.keys(form).find(elem => !form[elem]);
	if (emptyKey) {
		dispatch(showFormError(emptyKey))
	} else {
		const id = generateId();
		const newBoards = boards.map(board => {
			if (board.id === boardId) {
				return {
					...board,
					...form
				}
			}
			return board
		});
		await dispatch(updateBoards(newBoards));
		dispatch(hideModal());
	}
}

export const removeBoard = ({boardId}) => async (dispatch, getState) => {
	const {boards} = getState();
	const selectedBoard = boards.find(board => board.id === boardId);
	const newBoards = boards.filter(board => board.id !== boardId);
	await dispatch(updateBoards(newBoards));
	selectedBoard.lists.forEach(list => dispatch(removeList({listId: list})))
}

export const addBoard = () => async (dispatch, getState) => {
	const { modal } = getState();
	const { form } = modal;
	const emptyKey = Object.keys(form).find(elem => !form[elem]);
	if (emptyKey) {
		dispatch(showFormError(emptyKey))
	} else {
		const id = generateId();
		await dispatch({
			type: ADD_BOARD,
			payload: {
				...form,
				id,
				lists: []
			}
		});
		dispatch(hideModal());
	}
}