import {
  MEDIA_REQUEST,
  MEDIA_SUCCESS,
  MEDIA_FAILURE,
  MEDIA_FAVORITE
} from '../constants/ActionTypes'

const initialState = {
  entity: {},
  isFetching: false,
  hasFavorited: false,
  error: null,
  comments: []
}

export default function mediaReducer(state = initialState, action = {}) {
  switch (action.type) {
    case MEDIA_REQUEST:
      return {
        ... state,
        isFetching: true,
        error: null
      }
    case MEDIA_SUCCESS:
      return {
        ... state,
        isFetching: false,
        entity: action.entity,
        hasFavorited: action.hasFavorited,
        comments: action.comments,
        error: null
      }
    case MEDIA_FAVORITE :
      return Object.assign({}, state, action.hasFavorited);
    case MEDIA_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    default:
      return state
  }
}
