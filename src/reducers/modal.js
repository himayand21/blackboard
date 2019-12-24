import {
    SHOW_MODAL,
    HIDE_MODAL,
    UPDATE_FORM,
    SHOW_FORM_ERROR
} from '../constants/actionTypes';

const initialState = {
    show: false,
    modalType: null,
    form: null,
    origin: null,
    formError: null
}

export default (state = initialState, action) => {
	switch (action.type) {
		case SHOW_MODAL: {
            const {
                modalType,
                form,
                origin
            } = action;
			return ({
                show: true,
                modalType,
                form,
                origin
            })
        }
        case SHOW_FORM_ERROR: {
            return ({
                ...state,
                formError: action.formError
            })
        }
        case HIDE_MODAL: {
            return initialState
        }
        case UPDATE_FORM: {
            return ({
                ...state,
                form: action.form,
                formError: null
            })
        }
		default: {
			return state
		}
	}
}