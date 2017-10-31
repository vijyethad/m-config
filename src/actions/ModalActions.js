export const SET_CREATE_TABLE_MODAL_STATE = 'SET_CREATE_TABLE_MODAL_STATE'
export const SET_FIELD_INFO_MODAL_STATE = 'SET_FIELD_INFO_MODAL_STATE'

export const setCreateTableModalState = shouldShowCreateTableModal => ({
	type: SET_CREATE_TABLE_MODAL_STATE,
	shouldShowCreateTableModal
})

export const setFieldInfoModalState = shouldShowFieldInfoModal => ({
	type: SET_FIELD_INFO_MODAL_STATE,
	shouldShowFieldInfoModal
})
