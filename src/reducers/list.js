import {ADD_LIST_ITEM} from '../constants/actionTypes';

const initialState = [
    {
        id: 'list#1',
        name: 'Trips',
        cards: ['card#1', 'card#2']
    },
    {
        id: 'list#2',
        name: 'Movies',
        cards: ['card#3']
    }
];

export default (state = initialState, action) => {
	switch (action.type) {
		case ADD_LIST_ITEM: {
			return [
                ...initialState,
                {...action.payload}
            ]
		}
		default: {
			return state
		}
	}
}