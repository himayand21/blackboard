import {
    ADD_CARD,
    UPDATE_CARDS
} from '../constants/actionTypes';

const initialState = [
    {
        id: 'card#1',
        name: 'Goa',
        parent: 'list#1',
        description: 'Just so that we can cancel it later.'
    },
    {
        id: 'card#2',
        name: 'Pondicherry',
        parent: 'list#1',
        description: `We are gonna settle for this, aren't we?`
    },
    {
        id: 'card#3',
        name: 'Dark Knight Rises',
        parent: 'list#2',
        description: 'I am BATMAN !!!'
    }
];

export default (state = initialState, action) => {
	switch (action.type) {
		case ADD_CARD: {
			return [
                ...state,
                {...action.payload}
            ]
        }
        case UPDATE_CARDS: {
            return action.payload
        }
		default: {
			return state
		}
	}
}