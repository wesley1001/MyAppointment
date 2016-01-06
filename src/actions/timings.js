import {API_ROOT} from './../utils/config';
import {
  TIMING_REQUEST,
  TIMING_SUCCESS,
  TIMING_FAILURE,
} from '../constants/ActionTypes';

function timingRequest() {
  return {
    type: TIMING_REQUEST
  }
}

function timingSuccess(payload) {
  return {
    type: TIMING_SUCCESS,
    entity: payload.data
  }
}

function timingFailure(error) {
  return {
    type: TIMING_FAILURE,
    error: error
  }
}


export function fetchTiming(date,companyID,serviceID) {
  let parsedDate = date.toISOString().slice(0, 10);

  var url = API_ROOT +'/timings/?company=' + companyID + '&service=' + serviceID + '&date=' + parsedDate;

  console.log(url);
  return (dispatch) => {
    dispatch(timingRequest());
    return fetch(url)
      .then(response => response.json())
      .then(json => {
        dispatch(timingSuccess(json))
      })
      .catch((err)=> {
        dispatch(timingFailure(err))
      })
  }
}
