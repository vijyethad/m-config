import {
	RECIEVE_TABLE_LIST,
	RECIEVE_CREATE_TABLE_RESPONSE,
	RECIEVE_INSERT_TABLE_FIELDS_RESPONSE,
	SET_SELECTED_OPTIONS,
	RECIEVE_DELETE_TABLES_RESPONSE,
	INSERT_TABLE_VALUES_RESPONSE
} from '../actions/TableActions'

export const tableList = (state={}, action) => {
	switch (action.type) {
		case RECIEVE_TABLE_LIST:
			return {
				...state,
				...action.tableList
			}
		case SET_SELECTED_OPTIONS:
			return {
				...state,
				selectedOptions: action.selectedOptions
			}
		case RECIEVE_DELETE_TABLES_RESPONSE:
			return {
				...state,
				deleteTablesResponse: action.deleteTablesResponse
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
				isTableCreated: action.isTableCreated,
				tableName: action.tableName,
				fieldCount: action.fieldCount
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
				isFieldsInfoInserted: action.isFieldsInfoInserted,
				fieldsInfo: action.fieldsInfo
			}
		default:
			return state
	}
}

export const insertTableValues = (state={isValuesInserted: false}, action) => {
	switch (action.type) {
		case INSERT_TABLE_VALUES_RESPONSE:
			return {
				...state,
				isValuesInserted: action.isValuesInserted
			}
		default:
			return state
	}
}
