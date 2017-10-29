import {
  RECIEVE_TABLE_LIST,
  RECIEVE_CREATE_TABLE_RESPONSE
} from '../actions/TableActions'

const initialState = {
  isTableCreated: false
}

export const tableList = (state={}, action) => {
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

export const createTable = (state=initialState, action) => {
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
