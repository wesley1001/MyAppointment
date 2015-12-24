import {API_ROOT} from './../utils/config'
import {
  MEDIAS_REQUEST,
  MEDIAS_SUCCESS,
  MEDIAS_FAILURE
} from '../constants/ActionTypes'

function mediasRequest() {
  return {
    type: MEDIAS_REQUEST,
  }
}

function mediasSuccess(payload) {
  return {
    type: MEDIAS_SUCCESS,
    collection: payload.data
  }
}

function mediasFailure(error) {
  return {
    type: MEDIAS_FAILURE,
    error: error,
  }
}

export function fetchMedias() {
  const url = API_ROOT + '/medias';
  return (dispatch) => {
    dispatch(mediasRequest());
    return fetch(url)
      .then(response => response.json())
      .then(json => {
        dispatch(mediasSuccess(json))
      })
      .catch((err)=> {
        dispatch(mediasFailure(err))
      })
  }
}
