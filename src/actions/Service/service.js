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

export function fetchTiming(date,categoryID,companyID,serviceID) {
  let parsedDate = date.toISOString().slice(0, 10);
  var url = API_URL +'/timings/?category=' + categoryID + '&company=' + companyID + '&service=' + serviceID + '&date=' + parsedDate;
  console.log('url',url);
  fetch(url)
    .then((response)=>response.json())
    .then((responseData)=> {
      //let timings = responseData.data;
      //
      //this.setState({
      //  dataSource: this.state.dataSource
      //    .cloneWithRows(timings),
      //  showProgress: false
      //}, this);

    });
}
