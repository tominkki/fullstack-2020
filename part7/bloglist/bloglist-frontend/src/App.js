import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, useRouteMatch } from 'react-router-dom';
import { initBlogs } from './reducers/blog-reducer';
import { initUsers } from './reducers/users-reducer';
import { setLoggedUser } from './reducers/user-reducer';

import LoginForm from './components/loginform';
import CreateBlog from './components/create-blog';
import Notification from './components/notification';
import BlogList from './components/blog-list';
import UsersList from './components/user-list';
import User from './components/user';
import Blog from './components/blog';
import Navigation from './components/navigation';

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
  const users = useSelector(state => state.users);
  const blogs = useSelector(state => state.blogs);

  const userMatch = useRouteMatch('/users/:id');
  const matchingUser = userMatch ?
    users.find(u => u.id === userMatch.params.id)
    : null;

  const blogMatch = useRouteMatch('/blogs/:id');
  const matchingBlog = blogMatch ?
    blogs.find(b => b.id === blogMatch.params.id)
    : null;

  return (
    <div>
      <h2>Blogs</h2>
      <Navigation/>
      <Notification/>
      {user ?
        <div>
          <Route exact path='/'>
            <CreateBlog/>
            <BlogList/>
          </Route>
          <Route exact path='/users'>
            <UsersList/>
          </Route>
          <Route exact path='/users/:id'>
            <User user={matchingUser}/>
          </Route>
          <Route exact path='/blogs/:id'>
            <Blog blog={matchingBlog}/>
          </Route>
        </div>
        :
        <LoginForm/>
      }
    </div>
  );
};

export default App;
