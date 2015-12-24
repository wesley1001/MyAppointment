import {API_ROOT} from './../utils/config'
import {
  CATEGORIES_REQUEST,
  CATEGORIES_SUCCESS,
  CATEGORIES_FAILURE
} from '../constants/ActionTypes'

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
  return (dispatch) => {
    dispatch(categoriesRequest());
    return fetch(url)
      .then(response => response.json())
      .then(json => {
        dispatch(categoriesSuccess(json))
      })
      .catch((err)=> {
        dispatch(categoriesFailure(err))
      })
  }
}
