import {ADD_CARD_ITEM} from '../constants/actionTypes';

const initialState = [
    {
        id: 'card#1',
        name: 'Goa',
        comments: ['comment#1', 'comment#2']
    },
    {
        id: 'card#2',
        name: 'Pondicherry',
        comments: ['comment#3']
    },
    {
        id: 'card#3',
        name: 'Dark Knight Rises',
        comments: ['comment#4']
    }
];

export default (state = initialState, action) => {
	switch (action.type) {
		case ADD_CARD_ITEM: {
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