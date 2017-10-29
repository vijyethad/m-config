import { combineReducers } from 'redux'
import { tableList, createTable } from './TableReducer'

const rootReducer = combineReducers({
  tableList,
  createTable
})

export default rootReducer
