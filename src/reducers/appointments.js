import {
  APPOINTMENT_REQUEST,
  APPOINTMENT_SUCCESS,
  APPOINTMENT_FAILURE
} from '../constants/ActionTypes'

const initialState = {
  entity: {},
  isFetching: false,
  error: null,
}

export default function appointments(state = initialState, action = {}) {
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
        entity: action.entity,
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
