import {
  SET_USER
} from '../../constants/ActionTypes';

export default function user(state = {}, action = {}) {
  switch (action.type) {
    case SET_USER:
      return Object.assign({}, state, action.user)
    default:
      return state;
  }
}