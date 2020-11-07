import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initBlogs } from './reducers/blog-reducer';
import { setLoggedUser, logout } from './reducers/user-reducer';

import LoginForm from './components/loginform';
import CreateBlog from './components/create-blog';
import Notification from './components/notification';
import BlogList from './components/blog-list';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  useEffect(() => {
    dispatch(initBlogs());
  }, [dispatch]);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser');
    if(loggedUser) {
      dispatch(setLoggedUser(JSON.parse(loggedUser)));
    }
  },[dispatch]);

  return (
    <div>
      <h2>Blogs</h2>
      <Notification/>
      {!user && <LoginForm/>}
      {user && 
        <div>
          <b>Logged in as </b>
          <button onClick={() => dispatch(logout())}>logout</button>
          <CreateBlog/>
          <BlogList/>
        </div>
      }
    </div>
  );
};

export default App;
