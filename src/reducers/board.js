import {UPDATE_BOARDS, ADD_BOARD} from '../constants/actionTypes';

const initialState = [
    {
        id: 'board#1',
        name: 'Favorites'
    }
];

export default (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_BOARDS: {
			return action.payload
		}
		case ADD_BOARD: {
			return [
                ...state,
                {...action.payload}
            ]
        }
		default: {
			return state
		}
	}
}