import {
  CATEGORIES_REQUEST,
  CATEGORIES_SUCCESS,
  CATEGORIES_FAILURE,
} from '../../constants/ActionTypes'

const initialState = {
  collection: [],
  isFetching: false,
  error: null
}

export default function categories(state = initialState, action = {}) {
  switch (action.type) {
    case CATEGORIES_REQUEST:
      return {
        ... state,
        isFetching: true,
        error: null
      }
    case CATEGORIES_SUCCESS:
      return {
        ... state,
        isFetching: false,
        collection: action.collection,
        error: null
      }
    case CATEGORIES_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    default:
      return state
  }
}
