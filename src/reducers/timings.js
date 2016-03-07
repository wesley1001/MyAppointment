import {
  TIMING_REQUEST,
  TIMING_SUCCESS,
  TIMING_FAILURE
} from '../constants/ActionTypes'

const initialState = {
  //collection: [{"id":1,"time_en":"6:00-am"},{"id":2,"time_en":"6:30-am"},{"id":3,"time_en":"7:00-am"},{"id":4,"time_en":"7:30-am"},{"id":5,"time_en":"8:00-am"},{"id":6,"time_en":"8:30-am"},{"id":7,"time_en":"9:00-am"},{"id":8,"time_en":"9:30-am"},{"id":9,"time_en":"0:00-am"},{"id":10,"time_en":"0:30-am"},{"id":11,"time_en":"1:00-am"},{"id":12,"time_en":"1:30-am"},{"id":13,"time_en":"2:00-pm"},{"id":14,"time_en":"2:30-pm"},{"id":15,"time_en":"1:00-pm"},{"id":16,"time_en":"1:30-pm"},{"id":17,"time_en":"2:00-pm"},{"id":18,"time_en":"2:30-pm"},{"id":19,"time_en":"3:00-pm"},{"id":20,"time_en":"3:30-pm"},{"id":21,"time_en":"4:00-pm"},{"id":22,"time_en":"4:30-pm"},{"id":23,"time_en":"5:00-pm"},{"id":24,"time_en":"5:30-pm"},{"id":25,"time_en":"6:00-pm"},{"id":26,"time_en":"6:30-pm"},{"id":27,"time_en":"7:00-pm"},{"id":28,"time_en":"7:30-pm"},{"id":29,"time_en":"8:00-pm"},{"id":30,"time_en":"8:30-pm"},{"id":31,"time_en":"9:00-pm"},{"id":32,"time_en":"9:30-pm"},{"id":33,"time_en":"10:00-pm"},{"id":34,"time_en":"10:30-pm"}],
  isFetching: false,
  error: null

};

export default function timingReducer(state = initialState, action = {}) {
  switch (action.type) {
    case TIMING_REQUEST:
      return {
        ... state,
        isFetching: true,
        error: null
      }
    case TIMING_SUCCESS:
      return {
        ... state,
        isFetching: false,
        error: null
      }
    case TIMING_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    default:
      return state
  }
}
