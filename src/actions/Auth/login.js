import {API_ROOT} from './../../utils/config'
import { saveUserToken,getUserToken } from './../../utils/storage';

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  ON_LOGIN_FORM_FIELD_CHANGE
} from '../../constants/ActionTypes';

function loginRequest() {
  return {
    type: LOGIN_REQUEST
  };
}

function loginSuccess(payload) {
  return {
    type: LOGIN_SUCCESS,
    entity:payload.data
  };
}

function loginFailure(message) {
  return {
    type: LOGIN_FAILURE,
    error: message
  };
}

export function login(credentials, cb = ()=> {
  success: false
}) {
  let url = API_ROOT + '/auth/login';
  return dispatch => {
    dispatch(loginRequest());
    return fetch(url, {
      method: 'POST',
      body: JSON.stringify(credentials)
    })
      .then(response => response.json())
      .then(json => {
        if (json.success == false) {
          dispatch(loginFailure(json.message));
          return cb({success: false});
        } else {
          dispatch(loginSuccess(json));
          saveUserToken(json.data.api_token);
          //return cb({success: true,user:json});
        }
      })
      .catch((err)=> {
        console.log(err);
        dispatch(loginFailure(err));
        return cb({success: false});
      });
  };
}


export function onLoginFormFieldChange(field,value) {
  return {
    type: ON_LOGIN_FORM_FIELD_CHANGE,
    payload: {field: field, value: value}
  };
}