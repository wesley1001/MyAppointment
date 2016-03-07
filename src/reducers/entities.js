import {
  TIMING_REQUEST,
  TIMING_SUCCESS,
  TIMING_FAILURE
} from '../constants/ActionTypes';

import _ from 'lodash';

const initialState ={ users: {}, categories:{}, companies: {},services:{}, employees:{}, appointments:{},timings:{} };

export default function entities(state = initialState, action) {
  if (action.entities) {
    return _.merge({}, state, action.entities);
    //return Object.assign({},state,action.entities);
  }

  return state
}