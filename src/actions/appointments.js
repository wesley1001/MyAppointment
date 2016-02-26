import { API_ROOT } from './../utils/config';
import { getUserToken } from './../utils/storage';

import {
  APPOINTMENTS_REQUEST,
  APPOINTMENTS_SUCCESS,
  APPOINTMENTS_FAILURE,
  CREATE_APPOINTMENT_REQUEST,
  CREATE_APPOINTMENT_SUCCESS,
  CREATE_APPOINTMENT_FAILURE,
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

function createAppointmentRequest() {
  return {
    type: CREATE_APPOINTMENT_REQUEST
  }
}

function createAppointmentSuccess() {
  return {
    type: CREATE_APPOINTMENT_SUCCESS
  }
}

function createAppointmentFailure(error) {
  return {
    type: CREATE_APPOINTMENT_FAILURE,
    error: error
  }
}


export function createAppointment(date,time,employee) {

  return (dispatch,state) => {

    dispatch(createAppointmentRequest());

    return getUserToken()
      .then((token) => {
        let params = {
          date:date.toISOString().slice(0, 10),
          timing_id:time.id,
          employee_id:employee.id,
          company_id:state().company.id,
          service_id:state().company.service.id,
          api_token:token
        };

        //var url = API_ROOT +`/appointments/create/?api_token=${token}`;
        var url = API_ROOT +`/appointments/create/`;
        return fetch(url, {
          method: 'POST',
          body: JSON.stringify(params)
        })
          .then(response => response.json())
          .then(json => {
            if (json.success) {
              dispatch(createAppointmentSuccess());
            } else {
              const error = new Error(json.message);
              dispatch(createAppointmentFailure(error.message));
              throw error;
            }
          })
      }).catch((err)=> dispatch(createAppointmentFailure(err)));

  }
}

export function fetchAppointments() {
  return (dispatch) => {
    dispatch(appointmentRequest());
    getUserToken().then((token) => {
      const url = API_ROOT + `/appointments/?api_token=${token}`;
      return fetch(url)
        .then(response => response.json())
        .then(json =>  dispatch(appointmentSuccess(json)))
        .catch((err)=>dispatch(appointmentFailure(err)))
    });
  }
}

export function invalidateCreatedAppointment() {
  return (dispatch) => dispatch({type:'CREATE_APPOINTMENT_INVALIDATE'});
}