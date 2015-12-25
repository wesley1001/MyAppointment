import {API_ROOT} from './../../utils/config'
import {
  SERVICES_REQUEST,
  SERVICES_SUCCESS,
  SERVICES_FAILURE
} from '../../constants/ActionTypes'

function servicesRequest() {
  return {
    type: SERVICES_REQUEST,
  }
}

function servicesSuccess(payload) {
  return {
    type: SERVICES_SUCCESS,
    collection: payload.data
  }
}

function servicesFailure(error) {
  return {
    type: SERVICES_FAILURE,
    error: error,
  }
}

export function fetchServices() {
  const url = API_ROOT + '/services';
  return (dispatch) => {
    dispatch(servicesRequest());
    return fetch(url)
      .then(response => response.json())
      .then(json => {
        dispatch(servicesSuccess(json))
      })
      .catch((err)=> {
        dispatch(servicesFailure(err))
      })
  }
}
