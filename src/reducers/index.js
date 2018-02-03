import { combineReducers } from 'redux'
import { tableList, createTable, insertTableFields, insertTableValues, loading } from './TableReducer'
import { modalState } from './ModalReducer'

const rootReducer = combineReducers({
	tableList,
	createTable,
	modalState,
	insertTableFields,
	insertTableValues,
	loading
})

export default rootReducer
