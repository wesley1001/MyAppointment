import {
  SERVICE_REQUEST,
  SERVICE_SUCCESS,
  SERVICE_FAILURE
} from '../../constants/ActionTypes'

const initialState = {
  entity: {},
  isFetching: false,
  error: null,
}

export default function service(state = initialState, action = {}) {
  switch (action.type) {
    case SERVICE_REQUEST:
      return {
        ... state,
        isFetching: true,
        error: null
      }
    case SERVICE_SUCCESS:
      return {
        ... state,
        isFetching: false,
        entity: action.entity,
        error: null
      }
    case SERVICE_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    default:
      return state
  }
}
