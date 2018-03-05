import { combineReducers } from 'redux'
import {
	tableList, createTable, insertTableFields,
	insertTableValues, loading, tableData,
	shouldShowSaveChangesBtn, updateTable,
	updateTableRows
} from './TableReducer'

const rootReducer = combineReducers({
	tableList,
	createTable,
	insertTableFields,
	insertTableValues,
	loading,
	tableData,
	shouldShowSaveChangesBtn,
	updateTable,
	updateTableRows
})

export default rootReducer
