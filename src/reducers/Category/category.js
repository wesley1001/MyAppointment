import {Record} from 'immutable';

import {
  CATEGORY_REQUEST,
  CATEGORY_SUCCESS,
  CATEGORY_FAILURE,
  UNFAVORITE_COMPANY
} from '../../constants/ActionTypes';

const InitialState = Record({
  entity:{
    companies:[]
  },
  isFetching: false,
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
    case UNFAVORITE_COMPANY:
      //return state
      //  .setIn(['entity','companies'],null);

      //return state.setIn(['entity','companies'],[]);
    //return state.entity.companies.update(state.entity.companies.findIndex(function(item){
    //  return item.get('id' === action.id);
    //}), function(item){
    //  return item.set('isFavorited',false);
    //});

    //list = list.update(
    //  list.findIndex(function(item) {
    //    return item.get("name") === "third";
    //  }), function(item) {
    //    return item.set("count", 4);
    //  }
    //);

    default:
      return state
  }
}
