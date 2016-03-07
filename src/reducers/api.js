import {
  CATEGORIES_REQUEST,
  CATEGORY_REQUEST,
  FAVORITES_REQUEST,
  COMPANY_REQUEST,
  COMPANIES_REQUEST,
  SERVICES_REQUEST,
  SERVICE_REQUEST,
  CREATE_APPOINTMENT_REQUEST,
  TIMING_REQUEST,
  APPOINTMENTS_REQUEST,
  CATEGORIES_SUCCESS,
  CATEGORY_SUCCESS,
  FAVORITES_SUCCESS,
  COMPANY_SUCCESS,
  COMPANIES_SUCCESS,
  SERVICES_SUCCESS,
  SERVICE_SUCCESS,
  CREATE_APPOINTMENT_SUCCESS,
  TIMING_SUCCESS,
  APPOINTMENTS_SUCCESS,
  CATEGORIES_FAILURE,
  CATEGORY_FAILURE,
  FAVORITES_FAILURE,
  COMPANY_FAILURE,
  COMPANIES_FAILURE,
  SERVICES_FAILURE,
  SERVICE_FAILURE,
  CREATE_APPOINTMENT_FAILURE,
  TIMING_FAILURE,
  APPOINTMENTS_FAILURE,
} from '../constants/ActionTypes'

const initialState = {
  isFetching: false,
};

export default function api(state = initialState, action = {}) {
  switch (action.type) {
    case CATEGORIES_REQUEST:
    case CATEGORY_REQUEST:
    case FAVORITES_REQUEST:
    case COMPANY_REQUEST:
    case COMPANIES_REQUEST:
    case SERVICES_REQUEST:
    case SERVICE_REQUEST:
    case CREATE_APPOINTMENT_REQUEST:
    case TIMING_REQUEST:
    case APPOINTMENTS_REQUEST:
      return {
        ... state,
        isFetching: true
      }
    case CATEGORIES_SUCCESS:
    case CATEGORY_SUCCESS:
    case FAVORITES_SUCCESS:
    case COMPANY_SUCCESS:
    case COMPANIES_SUCCESS:
    case SERVICES_SUCCESS:
    case SERVICE_SUCCESS:
    case CREATE_APPOINTMENT_SUCCESS:
    case TIMING_SUCCESS:
    case APPOINTMENTS_SUCCESS:
      return {
        ... state,
        isFetching: false,
        collection: action.collection,
        error: null
      }
    case CATEGORIES_FAILURE:
    case CATEGORY_FAILURE:
    case FAVORITES_FAILURE:
    case COMPANY_FAILURE:
    case COMPANIES_FAILURE:
    case SERVICES_FAILURE:
    case SERVICE_FAILURE:
    case CREATE_APPOINTMENT_FAILURE:
    case TIMING_FAILURE:
    case APPOINTMENTS_FAILURE:
      return {
        ...state,
        isFetching: false
      }
    default:
      return state
  }
}
