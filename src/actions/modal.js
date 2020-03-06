import {
	SHOW_MODAL,
	HIDE_MODAL,
	UPDATE_FORM,
	SHOW_FORM_ERROR
} from '../constants/actionTypes';
import {
	ADD_CARD_MODAL,
	EDIT_CARD_MODAL,
	ADD_LIST_MODAL,
	EDIT_LIST_MODAL,
	EDIT_BOARD_MODAL,
	ADD_BOARD_MODAL,
	SIGNUP_MODAL,
	LOGIN_MODAL
} from '../constants/modalTypes';

const formConfig = {
	card: {
		name: '',
		description: ''
	},
	list: {
		name: ''
	},
	board: {
		name: ''
	}
}

const showModal = ({modalType, form, origin}) => {
	return ({
		type: SHOW_MODAL,
		modalType,
		form,
		origin
	})
}

export const showEditCard = (cardDetails) => async (dispatch) => {
	const modalType = EDIT_CARD_MODAL;
	const form = {
		name: cardDetails.name,
		description: cardDetails.description
	}
    dispatch(showModal({
		modalType,
		form,
		origin: cardDetails.id
	}));
}

export const showEditList = (listDetails) => async (dispatch) => {
	const modalType = EDIT_LIST_MODAL;
	const form = {
		name: listDetails.name
	}
    dispatch(showModal({
		modalType,
		form,
		origin: listDetails.id
	}));
}

export const showEditBoard = (boardDetails) => async (dispatch) => {
	const modalType = EDIT_BOARD_MODAL;
	const form = {
		name: boardDetails.name
	}
    dispatch(showModal({
		modalType,
		form,
		origin: boardDetails.id
	}));
}

export const showFormError = (key) => {
	return ({
		type: SHOW_FORM_ERROR,
		formError: key
	})
}

export const handleFormChange = (value, label) => async (dispatch, getState) => {
	const {modal} = getState();
	const {form} = modal;
	dispatch({
		type: UPDATE_FORM,
		form: {...form, [label]: value}
	})
}

export const showAddCard = (listId) => async (dispatch) => {
	const modalType = ADD_CARD_MODAL;
	const form = formConfig.card;
    dispatch(showModal({
		modalType,
		form,
		origin: listId
	}));
}

export const showAddList = (boardId) => async (dispatch) => {
	const modalType = ADD_LIST_MODAL;
	const form = formConfig.list;
    dispatch(showModal({
		modalType,
		form,
		origin: boardId
	}));
}

export const showAddBoard = () => async (dispatch) => {
	const modalType = ADD_BOARD_MODAL;
	const form = formConfig.board;
    dispatch(showModal({
		modalType,
		form,
		origin: null
	}));
}

export const hideModal = () => {
	return ({
		type: HIDE_MODAL
	})
}

export const showSignupModal = () => (dispatch) => {
	dispatch(showModal({
		modalType: SIGNUP_MODAL
	}))
}

export const showLoginModal = () => (dispatch) => {
	dispatch(showModal({
		modalType: LOGIN_MODAL
	}))
}