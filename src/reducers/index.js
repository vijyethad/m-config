import { combineReducers } from 'redux'
import { tableList, createTable, insertTableFields } from './TableReducer'
import { modalState } from './ModalReducer'

const rootReducer = combineReducers({
	tableList,
	createTable,
	modalState,
	insertTableFields
})

export default rootReducer
