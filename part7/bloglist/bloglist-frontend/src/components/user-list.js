import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const UsersList = () => {

  const users = useSelector(state => state.users);
  const sortedUsers = users.sort((a, b) => {
    return b.blogs.length - a.blogs.length;
  });

  return(
    <div>
      <h3>Users</h3>
      <table>
        <tbody>
          <tr>
            <td></td>
            <td><b>blogs created</b></td>
          </tr>
          {sortedUsers.map(user => 
          <tr key={user.id}>
            <td>
              <Link to={`users/${user.id}`}>
                {user.name}
              </Link>
            </td>
            <td>{user.blogs.length}</td>
          </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;
