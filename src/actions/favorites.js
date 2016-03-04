import { API_ROOT } from './../utils/config';
import { getUserToken } from './../utils/storage';

import {
  FAVORITES_REQUEST,
  FAVORITES_SUCCESS,
  FAVORITES_FAILURE,
  UNFAVORITE_COMPANY,
  FAVORITE_COMPANY
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
    return getUserToken().then((token) => {
      const url = API_ROOT + `/favorites/?api_token=${token}`;
      return fetch(url)
        .then(response => response.json())
        .then(json => {
          dispatch(favoritesSuccess(json));
        })
    }).catch((err)=> {
      dispatch(favoritesFailure(err))
    })
  }
}

// get Auth user's favorites
export function favoriteCompany(company) {
  return (dispatch,getState) => {

    dispatch(favoritesRequest());

    // update the reducer without waiting for the server, for instant rendering
    // if the api request failed, remove the item from array
    //const collection = {data:getState().user.favorites.collection.concat(Object.assign({},company,{isFavorited:true}))};
    dispatch({type:'FAVORITE_COMPANY',entity:company});

    return getUserToken().then((token) => {
      const url = API_ROOT + `/companies/${company.id}/favorite/?api_token=${token}`;
      return fetch(url).then(response => response.json())
        .then(json => {
          if(!json.success) {
            dispatch(favoritesFailure(err));
            unFavoriteCompany(company);
          }
        })
        .catch((err)=> {
          dispatch(favoritesFailure(err));
          dispatch(unFavoriteCompany(company));
        })
        ;
    });
  }
}

// get Auth user's favorites
export function unFavoriteCompany(company) {
  return (dispatch,getState) => {
    const collection = {data:getState().user.favorites.collection.map((c)=>c).filter((c) => c.id != company.id)};
    dispatch(favoritesSuccess(collection));
    return getUserToken().then((token) => {
      const url = API_ROOT + `/companies/${company.id}/unfavorite/?api_token=${token}`;
      return fetch(url);
    });
  }
}
