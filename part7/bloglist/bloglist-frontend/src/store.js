import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { notificationReducer } from './reducers/notification-reducer';
import { blogReducer } from './reducers/blog-reducer';
import { userReducer } from './reducers/user-reducer';
import { usersReducer } from './reducers/users-reducer';

const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogReducer,
  user: userReducer,
  users: usersReducer
});

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);

export default store;
