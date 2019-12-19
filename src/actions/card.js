import { ADD_CARD_ITEM } from '../constants/actionTypes';

export const addCardItem = (payload) => {
	return ({
		type: ADD_CARD_ITEM,
		payload
	})
}