import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/loginform';
import CreateBlog from './components/create-blog';
import Notification from './components/notification';
import blogService from './services/blogs';
import loginService from './services/login-service';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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

  const login = async(event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({username, password});
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    }catch (err) {
      notification('wrong username or password', true);
    }
  } 

  const logout = () => {
    window.localStorage.removeItem('loggedUser');
    blogService.setToken('');
    setUser(null);
    notification('logged out')
  }

  const addBlog = async (newBlog) => {
    try{
      const res = await blogService.create(newBlog);
      notification(`${res.title} by ${res.author} created.`);
      setBlogs([...blogs, res]);
    }catch(err){
      notification(err.message, true);
    };
  };

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
        <LoginForm 
          login = {login}
          username = {username}
          setUsername = {setUsername}
          password = {password} setPassword = {setPassword}
        />
        :
        <div>
          <b>Logged in as {user.username}</b>
          <button onClick = {logout}>logout</button>
          <CreateBlog addBlog={addBlog}/>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>}
    </div>
  );
}

export default App