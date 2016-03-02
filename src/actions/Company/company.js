import {API_ROOT} from './../../utils/config';
import {
  COMPANY_REQUEST,
  COMPANY_SUCCESS,
  COMPANY_FAILURE,
  SET_COMPANY_SERVICE
} from '../../constants/ActionTypes';

function companyRequest() {
  return {
    type: COMPANY_REQUEST
  }
}

function companySuccess(payload) {
  return {
    type: COMPANY_SUCCESS,
    entity: payload.data
  }
}

function companyFailure(error) {
  return {
    type: COMPANY_FAILURE,
    error: error
  }
}

export function fetchCompany(companyID) {
  const url = `${API_ROOT}/companies/${companyID}/show`;
  return (dispatch) => {
    dispatch(companyRequest());
    return fetch(url)
      .then(response => response.json())
      .then(json => {
        dispatch(companySuccess(json))
      })
      .catch((err)=> {
        dispatch(companyFailure(err))
      })
  }
}

export function setCompanyService(service) {
  return (dispatch) => dispatch({
    type:SET_COMPANY_SERVICE,
    entity:service
  });
}