import {combineReducers} from 'redux';

import entities from './entities';
import user from './Auth/user';
import login from './Auth/login';
import register from './Auth/register';
import company from './Company/company';
import companies from './Company/companies';
import services from './Service/services';
import service from './Service/service';
import timings from './timings';
import api from './api';

const rootReducer = combineReducers({
  entities,
  user,
  login,
  register,
  company,
  companies,
  services,
  service,
  timings,
  api
});

export default rootReducer;
