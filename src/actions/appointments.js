import {API_ROOT} from './../utils/config';
import {
  APPOINTMENT_REQUEST,
  APPOINTMENT_SUCCESS,
  APPOINTMENT_FAILURE,
} from '../constants/ActionTypes';

function appointmentRequest() {
  return {
    type: APPOINTMENT_REQUEST
  }
}

function appointmentSuccess(payload) {
  return {
    type: APPOINTMENT_SUCCESS,
    entity: payload.data
  }
}

function appointmentFailure(error) {
  return {
    type: APPOINTMENT_FAILURE,
    error: error
  }
}

export function createAppointment(date,userID,appointmentID,cb = ()=> {
  success: false
}) {

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
          return cb({success: true});
        } else {
          dispatch(appointmentFailure(json.message));
          return cb = () => {cb.success = false}
        }
      })
      .catch((err)=> {
        dispatch(appointmentFailure(err));
        return cb({success: false});

      })
  }
}
