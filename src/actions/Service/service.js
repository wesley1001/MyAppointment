import {API_ROOT} from './../../utils/config';
import {
  SERVICE_REQUEST,
  SERVICE_SUCCESS,
  SERVICE_FAILURE,
} from '../../constants/ActionTypes';

function serviceRequest() {
  return {
    type: SERVICE_REQUEST
  }
}

function serviceSuccess(payload) {
  return {
    type: SERVICE_SUCCESS,
    entity: payload.data
  }
}

function serviceFailure(error) {
  return {
    type: SERVICE_FAILURE,
    error: error
  }
}

export function fetchService(serviceID) {
  const url = API_ROOT + '/services/' + serviceID;
  return (dispatch) => {
    dispatch(serviceRequest());
    return fetch(url)
      .then(response => response.json())
      .then(json => {
        dispatch(serviceSuccess(json))
      })
      .catch((err)=> {
        dispatch(serviceFailure(err))
      })
  }
}


export function fetchTiming(date,companyID,serviceID) {
  let parsedDate = date.toISOString().slice(0, 10);

  var url = API_ROOT +'/timings/?company=' + companyID + '&service=' + serviceID + '&date=' + parsedDate;

  console.log(url);
  return (dispatch) => {
    dispatch(serviceRequest());
    return fetch(url)
      .then(response => response.json())
      .then(json => {
        dispatch(serviceSuccess(json))
      })
      .catch((err)=> {
        dispatch(serviceFailure(err))
      })
  }
}
