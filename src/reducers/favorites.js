import {
  APPOINTMENT_REQUEST,
  APPOINTMENT_SUCCESS,
  APPOINTMENT_FAILURE
} from '../constants/ActionTypes'

const initialState = {
  collection: [],
  isFetching: false,
  error: null,
}

export default function favorites(state = initialState, action = {}) {
  switch (action.type) {
    case APPOINTMENT_REQUEST:
      return {
        ... state,
        isFetching: true,
        error: null
      }
    case APPOINTMENT_SUCCESS:
      return {
        ... state,
        isFetching: false,
        collection: action.collection,
        error: null
      }
    case APPOINTMENT_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    default:
      return state
  }
}
