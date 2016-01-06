import {combineReducers} from 'redux';

import user from './Auth/user';
import login from './Auth/login';
import register from './Auth/register';
import categories from './Category/categories';
import category from './Category/category';
import companies from './Company/companies';
import company from './Company/company';
import services from './Service/services';
import service from './Service/service';
import timings from './timings';
import appointments from './appointments';

const rootReducer = combineReducers({
  user,
  login,
  register,
  categories,
  category,
  companies,
  company,
  services,
  service,
  timings,
  appointments
});

export default rootReducer;
