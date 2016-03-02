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
    collection: payload.data
  }
}

function timingFailure(error) {
  return {
    type: TIMING_FAILURE,
    error: error
  }
}

export function fetchTiming() {
  var url = API_ROOT +'/timings';
  return (dispatch) => {
    dispatch(timingRequest());
    return fetch(url)
      .then(response => response.json())
      .then(json => {
        dispatch(timingSuccess(json));
      })
      .catch((err)=> {
        dispatch(timingFailure(err));
      })
  }
}