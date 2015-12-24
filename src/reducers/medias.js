import {
  MEDIAS_REQUEST,
  MEDIAS_SUCCESS,
  MEDIAS_FAILURE,
} from '../constants/ActionTypes'

const initialState = {
  collection: [],
  isFetching: false,
  error: null
}

export default function medias(state = initialState, action = {}) {
  switch (action.type) {
    case MEDIAS_REQUEST:
      return {
        ... state,
        isFetching: true,
        error: null
      }
    case MEDIAS_SUCCESS:
      return {
        ... state,
        isFetching: false,
        collection: action.collection,
        error: null
      }
    case MEDIAS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    default:
      return state
  }
}
