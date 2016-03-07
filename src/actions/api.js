import {API_ROOT} from './../utils/config';

import {
  API_REQUEST,
  API_SUCCESS,
  API_FAILURE
} from '../constants/ActionTypes';

export function apiRequest() {
  return {
    type: API_REQUEST
  }
}

export function apiSuccess(payload) {
  return {
    type: API_SUCCESS,
    entities:payload.entities
  }
}

export function apiFailure(error) {
  return {
    type: API_FAILURE,
    error: error
  }
}
