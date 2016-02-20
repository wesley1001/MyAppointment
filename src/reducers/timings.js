import {
  TIMING_REQUEST,
  TIMING_SUCCESS,
  TIMING_FAILURE
} from '../constants/ActionTypes'

const initialState = {
  collection: [],
  isFetching: false,
  error: null,
}

export default function timings(state = initialState, action = {}) {
  switch (action.type) {
    case TIMING_REQUEST:
      return {
        ... state,
        isFetching: true,
        error: null
      }
    case TIMING_SUCCESS:
      return {
        ... state,
        isFetching: false,
        collection: action.collection,
        error: null
      }
    case TIMING_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    default:
      return state
  }
}
