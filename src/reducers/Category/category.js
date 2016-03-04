import {Record,List} from 'immutable';

import {
  CATEGORY_REQUEST,
  CATEGORY_SUCCESS,
  CATEGORY_FAILURE,
  FAVORITE_COMPANY,
  UNFAVORITE_COMPANY
} from '../../constants/ActionTypes';

const InitialState = Record({
  isFetching: false,
  entity:new (Record({
    companies:[]
  })),
  error: null
});

const initialState = new InitialState;

export default function category(state = initialState, action = {}) {
  switch (action.type) {
    case CATEGORY_REQUEST:
      return state
        .set('isFetching',true)
        .set('error',null);
    case CATEGORY_SUCCESS:
      return state
        .set('isFetching',false)
        .set('entity',action.entity)
        .set('error',null);
    case CATEGORY_FAILURE:
      return state
        .set('isFetching',false)
        .set('error',action.error);
    case FAVORITE_COMPANY:
      return state;
    case UNFAVORITE_COMPANY:
      return state;
    default:
      return state
  }
}
