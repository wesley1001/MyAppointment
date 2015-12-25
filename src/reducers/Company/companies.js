import {
  COMPANIES_REQUEST,
  COMPANIES_SUCCESS,
  COMPANIES_FAILURE,
} from '../../constants/ActionTypes'

const initialState = {
  collection: [],
  isFetching: false,
  error: null
}

export default function companies(state = initialState, action = {}) {
  switch (action.type) {
    case COMPANIES_REQUEST:
      return {
        ... state,
        isFetching: true,
        error: null
      }
    case COMPANIES_SUCCESS:
      return {
        ... state,
        isFetching: false,
        collection: action.collection,
        error: null
      }
    case COMPANIES_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    default:
      return state
  }
}
