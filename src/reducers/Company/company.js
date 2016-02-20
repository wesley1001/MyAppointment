import {
  COMPANY_REQUEST,
  COMPANY_SUCCESS,
  COMPANY_FAILURE,
  SET_COMPANY_SERVICE
} from '../../constants/ActionTypes'

const initialState = {
  entity: {},
  isFetching: false,
  error: null,
  service:{}
}

export default function company(state = initialState, action = {}) {
  switch (action.type) {
    case COMPANY_REQUEST:
      return {
        ... state,
        isFetching: true,
        error: null
      };
    case COMPANY_SUCCESS:
      return {
        ... state,
        isFetching: false,
        entity: action.entity,
        error: null
      };
    case COMPANY_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    case SET_COMPANY_SERVICE:
      return {
        ... state,
        service: action.entity,
        error: null
      };
    default:
      return state;
  }
}
