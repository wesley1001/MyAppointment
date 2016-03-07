import {API_ROOT} from './../../utils/config';
import { Schemas } from './../../constants/Schema';
import { normalize } from 'normalizr';
import {apiRequest,apiSuccess,apiFailure} from './../api';

export function fetchCategories() {
  const url = API_ROOT + '/categories';
  return function (dispatch,getState) {
    dispatch(apiRequest());
    return fetch(url)
      .then(response => response.json())
      .then(response => {
        const normalized = normalize(response.data,Schemas.CATEGORY_ARRAY);
        dispatch(apiSuccess(normalized));
      })
      .catch(error => dispatch(apiFailure(error)))
  };
}