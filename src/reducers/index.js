import {combineReducers} from 'redux';

import entities from './entities';
import userReducer from './Auth/user';
import login from './Auth/login';
import register from './Auth/register';
import categoriesReducer from './Category/categories';
import categoryReducer from './Category/category';
import companyReducer from './Company/company';
import companiesReducer from './Company/companies';
import timingReducer from './timings';
//import api from './api';

const rootReducer = combineReducers({
  entities,
  userReducer,
  login,
  register,
  categoriesReducer,
  categoryReducer,
  companyReducer,
  companiesReducer,
  timingReducer,
  //api
});

export default rootReducer;
