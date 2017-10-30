import {
	SET_CREATE_TABLE_MODAL_STATE
} from '../actions/ModalActions'

const initialState = {
	shouldShowCreateTableModal: false
}

export const modalState = (state=initialState, action) => {
	switch (action.type) {
		case SET_CREATE_TABLE_MODAL_STATE:
			return {
				...state,
				shouldShowCreateTableModal: action.shouldShowCreateTableModal
			}
		default:
			return state
	}
}
