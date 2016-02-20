import {
  SET_USER
} from '../../constants/ActionTypes';

const initialState= {
  isAuthenticated :false,
  data: {}
};

export default function user(state = initialState, action = {}) {
  switch (action.type) {
    case SET_USER:
      return Object.assign({}, state, action.user)
    default:
      return state;
  }
}