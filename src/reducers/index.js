import { combineReducers } from 'redux'
import { tableList, createTable, insertTableFields,
					insertTableValues, loading, tableData, shouldShowSaveChangesBtn } from './TableReducer'

const rootReducer = combineReducers({
	tableList,
	createTable,
	insertTableFields,
	insertTableValues,
	loading,
	tableData,
	shouldShowSaveChangesBtn
})

export default rootReducer
