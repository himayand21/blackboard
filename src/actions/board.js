import { ADD_BOARD_ITEM } from '../constants/actionTypes';

export const addBoardItem = (payload) => {
	return ({
		type: ADD_BOARD_ITEM,
		payload
	})
}