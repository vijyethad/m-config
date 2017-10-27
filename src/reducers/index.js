import { combineReducers } from 'redux'
import {
  RECIEVE_TABLE_LIST
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

const rootReducer = combineReducers({
  tableList
})

export default rootReducer
