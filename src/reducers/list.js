import {
    UPDATE_LISTS,
    ADD_LIST
} from '../constants/actionTypes';

const initialState = [
    {
        id: 'list#1',
        name: 'Trips',
        parent: 'board#1'
    },
    {
        id: 'list#2',
        parent: 'board#1',
        name: 'Movies'
    }
];

export default (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_LISTS: {
            return action.payload
        }
        case ADD_LIST: {
            return [
                ...state,
                action.payload
            ]
        }
		default: {
			return state
		}
	}
}