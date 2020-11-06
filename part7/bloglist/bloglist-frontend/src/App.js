import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { show } from './reducers/notification-reducer';
import Blog from './components/Blog';
import LoginForm from './components/loginform';
import CreateBlog from './components/create-blog';
import Notification from './components/notification';
import blogService from './services/blogs';
import loginService from './services/login-service';

const App = () => {
  const dispatch = useDispatch();

  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    })();
  },[]);

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

  const addBlog = async (newBlog) => {
    try{
      const res = await blogService.create(newBlog);
      dispatch(show(`${res.title} by ${res.author} created.`));
      setBlogs([...blogs, res]);
    }catch(err){
      dispatch(show(err.message, true));
    }
  };

  const updateBlog = async (updated, id) => {
    try {
      await blogService.update(updated, id);
      setBlogs(await blogService.getAll());
    }catch(err) {
      dispatch(show(err.message, true));
    }
  };

  const removeBlog = async(blog) => {
    try {
      await blogService.remove(blog.id);
      setBlogs(blogs.filter(b => b.id !== blog.id));
      dispatch(show(`${blog.title} by ${blog.author} removed.`));
    } catch (err) {
      dispatch(show(err.message, true));
    }
  };



  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);

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
          <CreateBlog addBlog={addBlog}/>
          {sortedBlogs.map(blog =>
            <Blog key={blog.id} blog={blog} user={user}
              updateBlog={updateBlog} removeBlog={removeBlog}/>
          )}
        </div>}
    </div>
  );
};

export default App;
