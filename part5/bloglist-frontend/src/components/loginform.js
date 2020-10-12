import React from 'react';

const LoginForm = ({
  login,
  username,
  setUsername,
  password, setPassword
}) => (
  <>
    <h3>log in to application</h3>
    <form onSubmit = {login}>
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

export default LoginForm;