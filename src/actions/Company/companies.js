import {API_ROOT} from './../../utils/config'
import {
  COMPANIES_REQUEST,
  COMPANIES_SUCCESS,
  COMPANIES_FAILURE
} from '../../constants/ActionTypes'

function companiesRequest() {
  return {
    type: COMPANIES_REQUEST,
  }
}

function companiesSuccess(payload) {
  return {
    type: COMPANIES_SUCCESS,
    collection: payload.data
  }
}

function companiesFailure(error) {
  return {
    type: COMPANIES_FAILURE,
    error: error,
  }
}

export function fetchCompanies() {
  const url = API_ROOT + '/companies';
  return (dispatch) => {
    dispatch(companiesRequest());
    return fetch(url)
      .then(response => response.json())
      .then(json => {
        dispatch(companiesSuccess(json))
      })
      .catch((err)=> {
        dispatch(companiesFailure(err))
      })
  }
}
