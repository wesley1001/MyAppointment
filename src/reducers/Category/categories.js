import {Record} from 'immutable';

import {
  CATEGORIES_REQUEST,
  CATEGORIES_SUCCESS,
  CATEGORIES_FAILURE,
} from '../../constants/ActionTypes'

const InitialState = Record({
  collection: [],
  isFetching: false,
  error: null
});

const initialState = new InitialState;

export default function categories(state = initialState, action = {}) {
  switch (action.type) {
    case CATEGORIES_REQUEST:
      return state
        .set('isFetching',true)
        .set('error',null);

    case CATEGORIES_SUCCESS:
      return state
        .set('isFetching',false)
        .set('collection',action.collection)
        .set('error',null);
    case CATEGORIES_FAILURE:
      return state
        .set('isFetching',false)
        .set('error',action.error);
    default:
      return state
  }
}
