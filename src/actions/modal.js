import {
	SHOW_MODAL,
	HIDE_MODAL,
	UPDATE_FORM,
	SHOW_FORM_ERROR
} from '../constants/actionTypes';
import {
	ADD_CARD_MODAL,
	EDIT_CARD_MODAL
} from '../constants/modalTypes';

const formConfig = {
	card: {
		name: null,
		description: null
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

export const hideModal = () => {
	return ({
		type: HIDE_MODAL
	})
}