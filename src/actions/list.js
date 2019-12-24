import {UPDATE_LISTS} from '../constants/actionTypes';

// export const addListItem = (payload) => {
// 	return ({
// 		type: ADD_LIST_ITEM,
// 		payload
// 	})
// }

export const updateLists = (payload) => {
	return ({
		type: UPDATE_LISTS,
		payload
	})
}