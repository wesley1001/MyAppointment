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

const rootReducer = combineReducers({
  user,
  login,
  register,
  categories,
  category,
  companies,
  company,
  services,
  service
});

export default rootReducer;
