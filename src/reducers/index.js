import { combineReducers } from 'redux'
import { tableList, createTable, insertTableFields, insertTableValues, loading } from './TableReducer'

const rootReducer = combineReducers({
	tableList,
	createTable,
	insertTableFields,
	insertTableValues,
	loading
})

export default rootReducer
