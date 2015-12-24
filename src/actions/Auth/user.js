import {SET_USER} from './../../constants/ActionTypes';

export const setUser = (user) => {
  return {
    type: SET_USER,
    user: user
  }
}
