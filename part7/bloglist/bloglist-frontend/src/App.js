import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { show } from './reducers/notification-reducer';
import { initBlogs } from './reducers/blog-reducer';
import LoginForm from './components/loginform';
import CreateBlog from './components/create-blog';
import Notification from './components/notification';
import blogService from './services/blogs';
import loginService from './services/login-service';
import BlogList from './components/blog-list';

const App = () => {
  const dispatch = useDispatch();

  const [user, setUser] = useState(null);

  useEffect(() => {
    dispatch(initBlogs());
  }, [dispatch]);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser');
    if(loggedUser) {
      setUser(JSON.parse(loggedUser));
      blogService.setToken(JSON.parse(loggedUser).token);
    }
  },[]);

  const login = async(credentials) => {
    try {
      const user = await loginService.login(credentials);
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
    }catch (err) {
      dispatch(show('wrong username or password', true));
    }
  };

  const logout = () => {
    window.localStorage.removeItem('loggedUser');
    blogService.setToken('');
    setUser(null);
    dispatch(show('logged out'));
  };

  return (
    <div>
      <h2>Blogs</h2>
      <Notification/>
      {!user ?
        <LoginForm login = {login}/>
        :
        <div>
          <b>Logged in as {user.username}</b>
          <button onClick = {logout}>logout</button>
          <CreateBlog/>
          <BlogList/>
        </div>}
    </div>
  );
};

export default App;
