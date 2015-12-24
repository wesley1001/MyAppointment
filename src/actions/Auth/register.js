import {API_ROOT} from './../../utils/config'

import {
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  ON_REGISTER_FORM_FIELD_CHANGE
} from '../../constants/ActionTypes';

function registerRequest() {
  return {
    type: REGISTER_REQUEST
  };
}

function registerSuccess() {
  return {
    type: REGISTER_SUCCESS
  };
}

function registerFailure(errors) {
  return {
    type: REGISTER_FAILURE,
    error: errors
  };
}

export function signup(inputs, cb = ()=> {
  success: false
}) {
  return dispatch => {

    // change passwordConfirmation to password_confirmation
    inputs.password_confirmation = inputs.passwordConfirmation;

    dispatch(registerRequest());
    return fetch(API_ROOT + '/auth/register', {
      method: 'POST',
      body: JSON.stringify(inputs)
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
        if (json.success == false) {
          dispatch(registerFailure(json.error));
        } else {
          dispatch(registerSuccess());
          return cb({success: true});
        }
      })
      .catch((err)=> {
        console.log(err);
        dispatch(registerFailure(err))
      });
  };
}

export function onRegisterFormFieldChange(field, value) {
  return {
    type: ON_REGISTER_FORM_FIELD_CHANGE,
    payload: {field: field, value: value}
  };
}