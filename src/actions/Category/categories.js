import {API_ROOT} from './../../utils/config';
import { Schemas } from './../../constants/Schema';
import { normalize } from 'normalizr';

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

function categoriesSuccess(normalized) {
  return {
    type: CATEGORIES_SUCCESS,
    entities:normalized.entities
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
  return function (dispatch,getState) {
    dispatch(categoriesRequest());
    return fetch(url)
      .then(response => response.json())
      .then(response => {
        const normalized = normalize(response.data,Schemas.CATEGORY_ARRAY);
        dispatch(categoriesSuccess(normalized));
      })
      .catch(error => dispatch(categoriesFailure(error)))
  };
}