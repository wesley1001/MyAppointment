import {API_ROOT} from './../../utils/config';
import {
  COMPANY_REQUEST,
  COMPANY_SUCCESS,
  COMPANY_FAILURE,
} from '../../constants/ActionTypes';
import { normalize } from 'normalizr';
import { Schemas } from './../../constants/Schema';

function companyRequest() {
  return {
    type: COMPANY_REQUEST
  }
}

function companySuccess(payload) {
  return {
    type: COMPANY_SUCCESS,
    entities: payload.entities
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
        const normalized = normalize(json.data,Schemas.COMPANY);
        dispatch(companySuccess(normalized))
      })
      .catch((err)=> {
        dispatch(companyFailure(err))
      })
  }
}