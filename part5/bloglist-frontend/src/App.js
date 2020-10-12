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

  const login = async(event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({username, password});
      setUser(user);
      setUsername('');
      setPassword('');
    }catch (err) {
      console.error(err);
    }
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
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
        </>}
    </div>
  )
}

export default App