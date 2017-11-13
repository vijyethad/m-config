import { combineReducers } from 'redux'
import { tableList, createTable, insertTableFields, insertTableValues } from './TableReducer'
import { modalState } from './ModalReducer'

const rootReducer = combineReducers({
	tableList,
	createTable,
	modalState,
	insertTableFields,
	insertTableValues
})

export default rootReducer
