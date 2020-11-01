import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { anecdoteReducer } from './anecdoteReducer';
import { filterReducer } from './filter-reducer';
import { notificationReducer } from './notification-reducer';

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer,
  filter: filterReducer
});

const store = createStore(
  reducer,
  composeWithDevTools()
);

export default store;
