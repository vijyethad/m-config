import { combineReducers } from 'redux'
import {
  RECIEVE_TABLE_LIST,
  RECIEVE_CREATE_TABLE_RESPONSE
} from '../actions'

const tableList = (state={}, action) => {
  switch (action.type) {
    case RECIEVE_TABLE_LIST:
      return {
        ...state,
        ...action.tableList
      }
    default:
      return state
  }
}

const createTable = (state={}, action) => {
  switch (action.type) {
    case RECIEVE_CREATE_TABLE_RESPONSE:
      return {
        ...state,
        isTableCreated: action.isTableCreated
      }
      default:
        return state
  }
}

const rootReducer = combineReducers({
  tableList,
  createTable
})

export default rootReducer
