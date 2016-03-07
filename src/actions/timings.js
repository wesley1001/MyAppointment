import {API_ROOT} from './../utils/config';
import { Schemas } from './../constants/Schema';
import { normalize } from 'normalizr';
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
    entities:payload.entities
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
        const normalized = normalize(json.data,Schemas.TIMING_ARRAY);
        dispatch(timingSuccess(normalized))
      })
      .catch((err)=> {
        dispatch(timingFailure(err));
      })
  }
}