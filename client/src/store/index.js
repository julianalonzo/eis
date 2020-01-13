import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import itemReducer from './reducers/itemReducer';
import templateReducer from './reducers/templateReducer';
import folderReducer from './reducers/folderReducer';
import userReducer from './reducers/userReducer';
import authReducer from './reducers/authReducer';

const composeEnhancers =
  process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

const rootReducer = combineReducers({
  item: itemReducer,
  template: templateReducer,
  folder: folderReducer,
  user: userReducer,
  auth: authReducer
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
