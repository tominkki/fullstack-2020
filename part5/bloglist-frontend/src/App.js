import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/loginform';
import CreateBlog from './components/create-blog';
import Notification from './components/notification';
import blogService from './services/blogs';
import loginService from './services/login-service';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [msg, setMsg] = useState(null);
  const [error, setError] = useState();

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
      notification('wrong username or password', true);
    }
  }; 

  const logout = () => {
    window.localStorage.removeItem('loggedUser');
    blogService.setToken('');
    setUser(null);
    notification('logged out');
  };

  const addBlog = async (newBlog) => {
    try{
      const res = await blogService.create(newBlog);
      notification(`${res.title} by ${res.author} created.`);
      setBlogs([...blogs, res]);
    }catch(err){
      notification(err.message, true);
    }
  };
  
  const updateBlog = async (updated, id) => {
    try {
      const res = await blogService.update(updated, id);
      setBlogs(await blogService.getAll());
    }catch(err) {
      notification(err.message, true);
    }
  }

  const notification = (message, isError = false) => {
    isError ? setError(true) : setError(false);
    setMsg(message);
    setTimeout(() => {
      setMsg(null);
    }, 3000);
  }; 

  return (
    <div>
      <h2>Blogs</h2>
      {msg && <Notification msg={msg} error={error}/>}
      {!user ? 
        <LoginForm login = {login}/>
        :
        <div>
          <b>Logged in as {user.username}</b>
          <button onClick = {logout}>logout</button>
          <CreateBlog addBlog={addBlog}/>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} updateBlog={updateBlog}/>
          )}
        </div>}
    </div>
  );
};

export default App;