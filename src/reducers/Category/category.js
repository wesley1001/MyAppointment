import {
  CATEGORY_REQUEST,
  CATEGORY_SUCCESS,
  CATEGORY_FAILURE
} from '../../constants/ActionTypes'

const initialState = {
  entity: {},
  isFetching: false,
  error: null,
}

export default function category(state = initialState, action = {}) {
  switch (action.type) {
    case CATEGORY_REQUEST:
      return {
        ... state,
        isFetching: true,
        error: null
      }
    case CATEGORY_SUCCESS:
      return {
        ... state,
        isFetching: false,
        entity: action.entity,
        error: null
      }
    case CATEGORY_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    default:
      return state
  }
}
