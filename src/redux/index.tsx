import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { USER_LOGOUT } from './actionTypes';
import commonReducer from './reducer/commonReducer';
import dataReducer from './reducer/dataReducer';

const reducers = combineReducers({
  common: commonReducer,
  data: dataReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === USER_LOGOUT) {
    state = undefined;
  }
  return reducers(state, action);
};

const isDevelopment = process.env.NODE_ENV === 'development';

const middleware = getDefaultMiddleware({
  thunk,
  serializableCheck: isDevelopment ? {
    ignoredActions: [],
    ignoredPaths: [],
    warnAfter: 128, // Adjust the threshold as needed
  } : false,
});

const store = configureStore({
  reducer: rootReducer,
  middleware,
});

export default store;
