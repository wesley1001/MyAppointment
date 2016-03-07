import { API_ROOT } from './../utils/config';
import { getUserToken } from './../utils/storage';

import {
  APPOINTMENTS_REQUEST,
  APPOINTMENTS_SUCCESS,
  APPOINTMENTS_FAILURE,
  CREATE_APPOINTMENT_REQUEST,
  CREATE_APPOINTMENT_SUCCESS,
  CREATE_APPOINTMENT_FAILURE,
  INVALIDATE_APPOINTMENT,
  DELETE_APPOINTMENT
} from '../constants/ActionTypes';

function appointmentRequest() {
  return {
    type: APPOINTMENTS_REQUEST
  }
}

function appointmentSuccess(payload) {
  console.log(payload.data);
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
          company_id:state().company.entity.id,
          service_id:state().companyReducer.service.id
        };
        let url = API_ROOT +`/appointments/make?api_token=${token}`;
        return fetch(url, {
          method: 'POST',
          body: JSON.stringify(params)
        })
          .then(response => {
            response.json()
          })
          .then(json => {
            if (json.success) {
              dispatch(createAppointmentSuccess());
            } else {
              const error = new Error(json.message);
              //dispatch(createAppointmentFailure(error.message));
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

function deleteAppointment(id){
  return {
    type: DELETE_APPOINTMENT,
    id: id
  }
}

export function cancelAppointment(id) {
  return (dispatch) => {
    dispatch(deleteAppointment(id));
    getUserToken().then((token) => {
      let params = {
        id:id
      };
      const url = API_ROOT + `/appointments/cancel?api_token=${token}`;
      return fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
      })
        .then(response => response.json())
        .then(json => console.log(json))
        .catch((err)=>console.log(err))
    });
  }
}
export function invalidateCreatedAppointment() {
  return (dispatch) => {
    dispatch({type: INVALIDATE_APPOINTMENT});
  }
}