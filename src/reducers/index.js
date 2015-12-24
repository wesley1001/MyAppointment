import {combineReducers} from 'redux';

import user from './Auth/user';
import login from './Auth/login';
import register from './Auth/register';
import categories from './categories';
import category from './category';
import comments from './comments';
import favorites from './favorites';

const rootReducer = combineReducers({
  user,
  login,
  register,
  categories,
  category,
  comments,
  favorites
});

export default rootReducer;
