import {
  FAVORITES_REQUEST,
  FAVORITES_SUCCESS,
  FAVORITES_FAILURE,
} from '../constants/ActionTypes'

const initialState = {
  collection: [],
  isFetching: false,
  error: null
}

export default function comments(state = initialState, action = {}) {
  switch (action.type) {
    case FAVORITES_REQUEST:
      return {
        ... state,
        isFetching: true,
        error: null
      }
    case FAVORITES_SUCCESS:
      return {
        ... state,
        isFetching: false,
        collection: action.collection,
        error: null
      }
    case FAVORITES_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    default:
      return state
  }
}
