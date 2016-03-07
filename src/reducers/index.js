import {combineReducers} from 'redux';

import entities from './entities';
import user from './Auth/user';
import login from './Auth/login';
import register from './Auth/register';
import categories from './Category/categories';
import category from './Category/category';
import company from './Company/company';
import companies from './Company/companies';
import services from './Service/services';
import service from './Service/service';
import timings from './timings';

const rootReducer = combineReducers({
  entities,
  user,
  login,
  register,
  categories,
  category,
  company,
  companies,
  services,
  service,
  timings
});

export default rootReducer;
