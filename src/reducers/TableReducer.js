import {
	RECIEVE_TABLE_LIST,
	RECIEVE_CREATE_TABLE_RESPONSE,
	RECIEVE_INSERT_TABLE_FIELDS_RESPONSE
} from '../actions/TableActions'

export const tableList = (state={}, action) => {
	switch (action.type) {
		case RECIEVE_TABLE_LIST:
			return {
				...state,
				...action.tableList
			}
		default:
			return state
	}
}

export const createTable = (state={isTableCreated: false}, action) => {
	switch (action.type) {
		case RECIEVE_CREATE_TABLE_RESPONSE:
			return {
				...state,
				isTableCreated: action.isTableCreated
			}
		default:
			return state
	}
}

export const insertTableFields = (state={isFieldsInfoInserted: false}, action) => {
	switch (action.type) {
		case RECIEVE_INSERT_TABLE_FIELDS_RESPONSE:
			return {
				...state,
				isFieldsInfoInserted: action.isFieldsInfoInserted
			}
		default:
			return state
	}
}
