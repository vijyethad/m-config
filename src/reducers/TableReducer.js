import {
	RECIEVE_TABLE_LIST,
	RECIEVE_CREATE_TABLE_RESPONSE,
	RECIEVE_INSERT_TABLE_FIELDS_RESPONSE,
	SET_SELECTED_OPTIONS,
	RECIEVE_DELETE_TABLES_RESPONSE,
	INSERT_TABLE_VALUES_RESPONSE,
	IS_LOADING,
	RECIEVE_TABLE_DATA_RESPONSE,
	SHOULD_SHOW_SAVE_CHANGES_BUTTON,
	UPDATE_TABLE
} from '../actions/TableActions'

export const updateTable = (state={shouldShowSaveChangesBtn: false, didColumnUpdate: false}, action) => {
	switch (action.type) {
		case UPDATE_TABLE:
			return {
				...state,
				didColumnUpdate: action.didColumnUpdate,
				newTableData: action.newTableData,
				shouldShowSaveChangesBtn: action.shouldShowSaveChangesBtn
			}
		default:
			return state
	}
}

export const loading = (state={}, action) => {
	switch (action.type) {
		case IS_LOADING:
			return {
				...state,
				isLoading: action.isLoading
			}
		default:
			return state
	}
}

export const shouldShowSaveChangesBtn = (state={}, action) => {
	switch (action.type) {
		case SHOULD_SHOW_SAVE_CHANGES_BUTTON:
			return {
				...state,
				value: action.shouldShowSaveChangesBtn
			}
		default:
			return state
	}
}

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
				isValuesInserted: action.insertTableValuesResponse.mXRefResponse.TblValues.EXECUTION_STATUS
			}
		default:
			return state
	}
}

export const tableData = (state={}, action) => {
	switch (action.type) {
		case RECIEVE_TABLE_DATA_RESPONSE:
			return {
				...state,
				...action.tableData
			}
		default:
			return state
	}
}
