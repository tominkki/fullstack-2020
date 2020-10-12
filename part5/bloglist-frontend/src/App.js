import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/loginform';
import blogService from './services/blogs'
import loginService from './services/login-service';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      const blogs = await blogService.getAll();
      setBlogs(blogs); 
    })();
  }, []);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser');
    if(loggedUser) {
      setUser(JSON.parse(loggedUser));
    }
  },[])

  const login = async(event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({username, password});
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      setUser(user);
      setUsername('');
      setPassword('');
    }catch (err) {
      console.error(err);
    }
  } 

  const logout = () => {
    window.localStorage.removeItem('loggedUser');
    setUser(null);
  }

  return (
    <div>
      <h2>Blogs</h2>
        {!user ? 
        <LoginForm 
          login = {login}
          username = {username}
          setUsername = {setUsername}
          password = {password} setPassword = {setPassword}
        />
        :
        <>
        <b>Logged in as {user.username}</b>
        <button onClick = {logout}>logout</button>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
        </>}
    </div>
  )
}

export default App