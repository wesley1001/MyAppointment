import {API_ROOT} from './../../utils/config'
import { setUserToken,getUserToken,API_TOKEN,forgetItem } from './../../utils/storage';
import { Schemas } from './../../constants/Schema';
import { normalize } from 'normalizr';

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_USER,
  ON_LOGIN_FORM_FIELD_CHANGE
} from '../../constants/ActionTypes';

function loginRequest() {
  return {
    type: LOGIN_REQUEST
  };
}

function loginSuccess(payload) {
  console.log('pau',payload);
  return {
    type: LOGIN_SUCCESS,
    userID:payload.userID,
    entities:payload.normalized.entities
  };
}

function loginFailure(message) {
  return {
    type: LOGIN_FAILURE,
    error: message
  };
}

export function login(credentials) {
  const url = API_ROOT + '/auth/login';
  return dispatch => {
    dispatch(loginRequest());
    return fetch(url, {
      method: 'POST',
      body: JSON.stringify(credentials)
    })
      .then(response => response.json())
      .then(json => {
        if (json.success) {
          const normalized = normalize(json.data,Schemas.USER);
          dispatch(loginSuccess({normalized:normalized,userID:json.data.id}));
          setUserToken(json.data.api_token);
          return true;
        } else {
          dispatch(loginFailure(json.message));
          return false;
        }
      })
      .catch((err)=> dispatch(loginFailure(err)));
  }
}

export function loginUserByToken() {
  return (dispatch) => {
    dispatch(loginRequest());
    return getUserToken()
      .then((token) => {
        const url = API_ROOT + `/auth/login/token`;
        return fetch(url, {
          method: 'POST',
          body: JSON.stringify({
            api_token:token
          })
        })
          .then(response => response.json())
          .then(json => {
            if (json.success) {
              const normalized = normalize(json.data,Schemas.USER);
              dispatch(loginSuccess({normalized:normalized,userID:json.data.id}));
              return true;
            } else {
              dispatch(loginFailure(json.message));
              return false;
            }
          })
      })
      .catch((err)=> {
        dispatch(loginFailure(err));
        return false;
      });
  }
}

export function onLoginFormFieldChange(field,value) {
  return {
    type: ON_LOGIN_FORM_FIELD_CHANGE,
    payload: {field: field, value: value}
  };
}

export function logoutUser() {
  forgetItem(API_TOKEN);
  return (dispatch) => {
    dispatch({type:LOGOUT_USER})
  }
}