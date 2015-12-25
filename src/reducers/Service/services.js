import {
  SERVICES_REQUEST,
  SERVICES_SUCCESS,
  SERVICES_FAILURE,
} from '../../constants/ActionTypes'

const initialState = {
  collection: [],
  isFetching: false,
  error: null
}

export default function services(state = initialState, action = {}) {
  switch (action.type) {
    case SERVICES_REQUEST:
      return {
        ... state,
        isFetching: true,
        error: null
      }
    case SERVICES_SUCCESS:
      return {
        ... state,
        isFetching: false,
        collection: action.collection,
        error: null
      }
    case SERVICES_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    default:
      return state
  }
}
