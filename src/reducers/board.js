import {ADD_BOARD_ITEM} from '../constants/actionTypes';

const initialState = [
    {
        id: 'board#1',
        name: 'Favorites',
        lists: ['list#1', 'list#2']
    }
];

export default (state = initialState, action) => {
	switch (action.type) {
		case ADD_BOARD_ITEM: {
			return ([
                ...initialState,
                {...action.payload}
            ])
		}
		default: {
			return state
		}
	}
}