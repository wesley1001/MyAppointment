import {Record} from 'immutable';

import {
  SET_USER,
  APPOINTMENTS_REQUEST,
  APPOINTMENTS_SUCCESS,
  APPOINTMENTS_FAILURE,
  CREATE_APPOINTMENT_REQUEST,
  CREATE_APPOINTMENT_SUCCESS,
  CREATE_APPOINTMENT_FAILURE,
  CREATE_APPOINTMENT_INVALIDATE,
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
  })),
  appointment:new (Record({
    isCreating:false,
    created:false,
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
    case CREATE_APPOINTMENT_REQUEST:
      return state
        .setIn(['appointment', 'isCreating'], true)
        .setIn(['appointment', 'created'], false)
        .setIn(['appointment', 'error'], null);
    case CREATE_APPOINTMENT_SUCCESS:
      return state
        .setIn(['appointment', 'isCreating'], false)
        .setIn(['appointment', 'created'], true)
        .setIn(['appointment', 'error'], null);
    case CREATE_APPOINTMENT_FAILURE:
      return state
        .setIn(['appointment', 'isCreating'], false)
        .setIn(['appointment', 'created'], false)
        .setIn(['appointment', 'error'], action.error);
    case CREATE_APPOINTMENT_INVALIDATE:
      return state
        .setIn(['appointment', 'isCreating'], false)
        .setIn(['appointment', 'created'], false)
        .setIn(['appointment', 'error'], false);
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