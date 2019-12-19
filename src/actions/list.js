import { ADD_LIST_ITEM } from '../constants/actionTypes';

export const addListItem = (payload) => {
	return ({
		type: ADD_LIST_ITEM,
		payload
	})
}