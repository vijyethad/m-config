import {
	SET_CREATE_TABLE_MODAL_STATE,
	SET_FIELD_INFO_MODAL_STATE
} from '../actions/ModalActions'

const initialState = {
	shouldShowCreateTableModal: false,
	shouldShowFieldInfoModal: false
}

export const modalState = (state=initialState, action) => {
	switch (action.type) {
		case SET_CREATE_TABLE_MODAL_STATE:
			return {
				...state,
				shouldShowCreateTableModal: action.shouldShowCreateTableModal
			}
		case SET_FIELD_INFO_MODAL_STATE:
			return {
				...state,
				shouldShowFieldInfoModal: action.shouldShowFieldInfoModal
			}
		default:
			return state
	}
}
