import { combineReducers } from 'redux'
import { tableList, createTable } from './TableReducer'
import { modalState } from './ModalReducer'

const rootReducer = combineReducers({
  tableList,
  createTable,
  modalState
})

export default rootReducer
