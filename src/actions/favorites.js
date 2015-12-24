import {API_ROOT} from './../utils/config'
import {
  FAVORITES_REQUEST,
  FAVORITES_SUCCESS,
  FAVORITES_FAILURE,
} from '../constants/ActionTypes'

function favoritesRequest() {
  return {
    type: FAVORITES_REQUEST,
  }
}

function favoritesSuccess(payload) {
  return {
    type: FAVORITES_SUCCESS,
    collection: payload.data.favorites
  }
}

function favoritesFailure(error) {
  return {
    type: FAVORITES_FAILURE,
    error: error,
  }
}

export function fetchFavorites(userID) {
  const url = API_ROOT + '/user/' + userID + '/favorites';
  return (dispatch) => {
    dispatch(favoritesRequest());
    return fetch(url)
      .then(response => response.json())
      .then(json => {
        dispatch(favoritesSuccess(json));
      })
      .catch((err)=> {
        dispatch(favoritesFailure(err))
      })
  }
}
