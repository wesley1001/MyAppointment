import {API_ROOT} from './../../utils/config';
import {
  CATEGORIES_REQUEST,
  CATEGORIES_SUCCESS,
  CATEGORIES_FAILURE
} from '../../constants/ActionTypes'

function categoriesRequest() {
  return {
    type: CATEGORIES_REQUEST,
  }
}

function categoriesSuccess(payload) {
  return {
    type: CATEGORIES_SUCCESS,
    collection: payload.data
  }
}

function categoriesFailure(error) {
  return {
    type: CATEGORIES_FAILURE,
    error: error,
  }
}

export function fetchCategories() {
  const url = API_ROOT + '/categories';
  return function (dispatch) {
    dispatch(categoriesRequest());
    return fetch(url)
      .then(response => response.json())
      .then(response => dispatch(categoriesSuccess(response)))
      .catch(error => dispatch(categoriesFailure(error)))
  };
}