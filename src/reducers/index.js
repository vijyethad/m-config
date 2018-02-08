import { combineReducers } from 'redux'
import {
	tableList, createTable, insertTableFields,
	insertTableValues, loading, tableData,
	shouldShowSaveChangesBtn, updateTable
} from './TableReducer'

const rootReducer = combineReducers({
	tableList,
	createTable,
	insertTableFields,
	insertTableValues,
	loading,
	tableData,
	shouldShowSaveChangesBtn,
	updateTable
})

export default rootReducer
