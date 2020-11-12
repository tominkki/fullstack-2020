import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../graphql/mutations';

const Login = ({ show, setToken }) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [login, result] = useMutation(LOGIN, {
    onError: (e) => {
      console.log(e.graphQLErrors[0].message);
    }
  });

  useEffect(() => {
    if(result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem('library-token', token);
    }
  }, [result.data, setToken]);

  if (!show) return null;


  const submit = async (e) => {
    e.preventDefault();
    login({ variables:{ username, password } });
    setUsername('');
    setPassword('');
  };

  return (
    <div>
      <form onSubmit={submit}>
        <input
          type='text'
          placeholder='Username'
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
        <br/>
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <br/>
        <button type='submit'>
              login
        </button>
      </form>
    </div>
  );
};

export default Login;
