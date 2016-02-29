import {API_ROOT} from './../../utils/config';
import { getUserToken } from './../../utils/storage';

import {
  CATEGORY_REQUEST,
  CATEGORY_SUCCESS,
  CATEGORY_FAILURE
} from '../../constants/ActionTypes';

function categoryRequest() {
  return {
    type: CATEGORY_REQUEST
  }
}

function categorySuccess(payload) {
  return {
    type: CATEGORY_SUCCESS,
    entity: payload.data
  }
}

function categoryFailure(error) {
  return {
    type: CATEGORY_FAILURE,
    error: error
  }
}

export function fetchCategory(categoryID) {
  return (dispatch) => {
    dispatch(categoryRequest());
    getUserToken().then((token) => {
        const url = API_ROOT + `/categories/${categoryID}/?api_token=${token}`;
        return fetch(url)
          .then(response => response.json())
          .then(json => {
            dispatch(categorySuccess(json))
          })
      })
      .catch((err)=> {
        dispatch(categoryFailure(err))
      });
  }
}