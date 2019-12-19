import {ADD_COMMENT} from '../constants/actionTypes';

const initialState = [
    {
        id: 'comment#1',
        sender: {
            name: 'Himayan',
            id: 'user#1'
        },
        parent: 'card#1',
        content: 'Sunburn.'
    },
    {
        id: 'comment#2',
        sender: {
            name: 'Himayan',
            id: 'user#1'
        },
        parent: 'card#1',
        content: 'Beach Days.'
    },
    {
        id: 'comment#3',
        sender: {
            name: 'Himayan',
            id: 'user#1'
        },
        parent: 'card#2',
        content: 'Weekend trip is on.'
    },
    {
        id: 'comment#4',
        sender: {
            name: 'Himayan',
            id: 'user#1'
        },
        parent: 'card#3',
        content: 'Classic.'
    }
];

export default (state = initialState, action) => {
	switch (action.type) {
		case ADD_COMMENT: {
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