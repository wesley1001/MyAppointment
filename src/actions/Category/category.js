import {API_ROOT} from './../../utils/config';
import { Schemas } from './../../constants/Schema';
import { getUserToken } from './../../utils/storage';
import {apiRequest,apiSuccess,apiFailure} from './../api';
import { normalize } from 'normalizr';

export function fetchCategory(categoryID) {
  return (dispatch) => {
    dispatch(apiRequest());
    getUserToken().then((token) => {
        const url = API_ROOT + `/categories/${categoryID}/?api_token=${token}`;
        return fetch(url)
          .then(response => response.json())
          .then(json => {
            const normalized = normalize(json.data,Schemas.CATEGORY);
            dispatch(apiSuccess(normalized))
          })
      })
      .catch((err)=> {
        dispatch(apiFailure(err))
      });
  }
}