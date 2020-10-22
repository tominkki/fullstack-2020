import React, { useState } from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({login}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submitCreds = (event) => {
    event.preventDefault();
    login({username, password});
    setUsername('');
    setPassword('');
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
                <input value = {username} 
                  onChange = {({target}) => setUsername(target.value)}/>
              </td>
            </tr>
            <tr>
              <td>password: </td>
              <td>
                <input type = "password" value = {password} 
                  onChange = {({target}) => setPassword(target.value)}/>
              </td>
            </tr>
          </tbody>
        </table>
        <div><button type="submit">login</button></div>
      </form>
    </>
  );
};

LoginForm.propTypes = {login: PropTypes.func.isRequired};

export default LoginForm;