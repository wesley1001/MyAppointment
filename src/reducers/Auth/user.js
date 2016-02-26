import {Record} from 'immutable';

import {
  SET_USER,
  APPOINTMENTS_REQUEST,
  APPOINTMENTS_SUCCESS,
  APPOINTMENTS_FAILURE,
  FAVORITES_REQUEST,
  FAVORITES_SUCCESS,
  FAVORITES_FAILURE,
  LOGIN_SUCCESS
} from '../../constants/ActionTypes';

const InitialState= Record({
  isAuthenticated :false,
  isFetching:false,
  entity: new (Record({})),
  favorites:new (Record({
    isFetching:false,
    collection:[],
    error:null
  })),
  appointments:new (Record({
    isFetching:false,
    collection:[],
    error:null
  }))
});

const initialState = new InitialState;

export default function user(state = initialState, action = {}) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return state
        .set('entity',action.entity)
        .set('isAuthenticated',true);
    case APPOINTMENTS_REQUEST:
      return state
        .setIn(['appointments', 'isFetching'], true)
        .setIn(['appointments', 'error'], null);
    case APPOINTMENTS_SUCCESS:
      return state
        .setIn(['appointments', 'isFetching'], false)
        .setIn(['appointments', 'error'], null)
        .setIn(['appointments', 'collection'], action.collection);
    case APPOINTMENTS_FAILURE:
      return state
        .setIn(['appointments', 'isFetching'], false)
        .setIn(['appointments', 'error'], action.error);
    case FAVORITES_REQUEST:
      return state
        .setIn(['favorites', 'isFetching'], true)
        .setIn(['favorites', 'error'], null);
    case FAVORITES_SUCCESS:
      return state
        .setIn(['favorites', 'isFetching'], false)
        .setIn(['favorites', 'error'], null)
        .setIn(['favorites', 'collection'], action.collection);
    case FAVORITES_FAILURE:
      return state
        .setIn(['favorites', 'isFetching'], false)
        .setIn(['favorites', 'error'], action.error);
    default:
      return state;
  }
}