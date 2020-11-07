import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import { initBlogs } from './reducers/blog-reducer';
import { initUsers } from './reducers/users-reducer';
import { setLoggedUser, logout } from './reducers/user-reducer';

import LoginForm from './components/loginform';
import CreateBlog from './components/create-blog';
import Notification from './components/notification';
import BlogList from './components/blog-list';
import UsersList from './components/user-list';

const App = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(initBlogs());
    dispatch(initUsers());

    const loggedUser = window.localStorage.getItem('loggedUser');
    if(loggedUser) {
      dispatch(setLoggedUser(JSON.parse(loggedUser)));
    }
  }, [dispatch]);

  const user = useSelector(state => state.user);
  
  return (
    <div>
      <h2>Blogs</h2>
      <Notification/>
      {!user && <LoginForm/>}
      {user && 
        <div>
          <b>Logged in as {user.username}</b>
          <button onClick={() => dispatch(logout())}>logout</button>
          <Route exact path='/'>
            <CreateBlog/>
            <BlogList/>
          </Route>
          <Route exact path='/users'>
            <UsersList/>
          </Route>
        </div>
      }
    </div>
  );
};

export default App;
