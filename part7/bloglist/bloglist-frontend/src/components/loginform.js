import React from 'react';
import { useDispatch } from 'react-redux';
import { useField } from '../hooks/hooks';
import { login } from '../reducers/user-reducer';

const LoginForm = () => {

  const dispatch = useDispatch();

  const username = useField('text');
  const password = useField('password');

  const submitCreds = e => {
    console.log('yo')
    e.preventDefault();
    console.log('wat')
    dispatch(login({
      username: username.input.value,
      password: password.input.value
    }));
    [username, password].map(state => state.reset);
  };

  return (
    <>
      <h3>log in to application</h3>
      <form onSubmit = {submitCreds}>
        <table>
          <tbody>
            <tr>
              <td>username: </td>
              <td>
                <input id='username' {...username.input}/>
              </td>
            </tr>
            <tr>
              <td>password: </td>
              <td>
                <input id='pass' {...password.input}/>
              </td>
            </tr>
          </tbody>
        </table>
        <div><button id='login-btn' type="submit">login</button></div>
      </form>
    </>
  );
};

export default LoginForm;
