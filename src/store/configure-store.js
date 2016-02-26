import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../reducers/index';
const logger = createLogger();

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  logger
)(createStore);

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware,logger)
  );

  //return createStoreWithMiddleware(rootReducer,initialState);
}

//const configureStore = createStore(
//  rootReducer,
//  applyMiddleware(thunkMiddleware,logger)
//);
//
//export default configureStore;