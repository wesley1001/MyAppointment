import { API_ROOT } from './../utils/config';
import { getUserToken } from './../utils/storage';

import {
  APPOINTMENTS_REQUEST,
  APPOINTMENTS_SUCCESS,
  APPOINTMENTS_FAILURE,
  MAKE_APPOINTMENT_REQUEST,
  MAKE_APPOINTMENT_SUCCESS,
  MAKE_APPOINTMENT_FAILURE,
} from '../constants/ActionTypes';

function appointmentRequest() {
  return {
    type: APPOINTMENTS_REQUEST
  }
}

function appointmentSuccess(payload) {
  return {
    type: APPOINTMENTS_SUCCESS,
    collection: payload.data
  }
}

function appointmentFailure(error) {
  return {
    type: APPOINTMENTS_FAILURE,
    error: error
  }
}

export function createAppointment(date,userID,appointmentID) {

  var url = API_ROOT +'/appointment/make';

  let params = {
    date: date.toISOString().slice(0, 10),
    user_id: userID,
    timing_id: appointmentID
  };

  return (dispatch) => {
    dispatch(appointmentRequest());
    return fetch(url, {
      method: 'POST',
      body: JSON.stringify(params)
    })
      .then(response => response.json())
      .then(json => {
        if(json.success) {
          dispatch(appointmentSuccess(json));
        } else {
          dispatch(appointmentFailure(json.message));
        }
      })
      .catch((err)=> {
        dispatch(appointmentFailure(err));
      })
  }
}

export function fetchAppointments() {
  return (dispatch) => {
    dispatch(appointmentRequest());
    getUserToken().then((token) => {
      const url = API_ROOT + `/appointments/?api_token=${token}`;
      return fetch(url)
        .then(response => response.json())
        .then(json => {
          dispatch(appointmentSuccess(json));
        })
        .catch((err)=> {
          dispatch(appointmentFailure(err))
        })
    });
  }
}
