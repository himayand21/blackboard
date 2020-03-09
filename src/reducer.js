import {
    SHOW_MODAL,
    HIDE_MODAL
} from './constants/actionTypes';

export default (state = initialState, action) => {
	switch (action.type) {
		case SHOW_MODAL: {
			return ({
				...state,
                show: true,
				childKey: action.childKey
            })
        }
        case HIDE_MODAL: {
            return ({
				...state,
				show: false,
				childKey: null
			})
        }
		default: {
			return state
		}
	}
}