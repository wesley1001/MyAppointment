import { API_ROOT } from './../utils/config';
import { getUserToken } from './../utils/storage';

import {
  FAVORITES_REQUEST,
  FAVORITES_SUCCESS,
  FAVORITES_FAILURE,
} from '../constants/ActionTypes'

function favoritesRequest() {
  return {
    type: FAVORITES_REQUEST
  }
}

function favoritesSuccess(payload) {
  return {
    type: FAVORITES_SUCCESS,
    collection: payload.data
  }
}

function favoritesFailure(error) {
  return {
    type: FAVORITES_FAILURE,
    error: error,
  }
}

// get Auth user's favorites
export function fetchFavorites() {
  return (dispatch) => {
    dispatch(favoritesRequest());
    getUserToken().then((token) => {
      const url = API_ROOT + `/favorites/?api_token=${token}`;
      return fetch(url)
        .then(response => response.json())
        .then(json => {
          dispatch(favoritesSuccess(json));
        })
        .catch((err)=> {
          dispatch(favoritesFailure(err))
        })
    });
  }
}
