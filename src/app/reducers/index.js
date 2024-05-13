import { combineReducers } from '@reduxjs/toolkit';
import repoReducer from './repoReducer';
import repoDetail from './repoDetailSlice';

// Combine all reducers into a single root reducer
const rootReducer = combineReducers({
  repo: repoReducer,
  repoDetail: repoDetail,
});

export default rootReducer;
