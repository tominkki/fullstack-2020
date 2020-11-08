import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../reducers/user-reducer';

const Navigation = () => {

  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  if(!user) {
    return null;
  }

  return(
    <div>
        <Link to='/'>blogs</Link>
        <Link to='/users'>users</Link>
        {user.name} logged in
        <button onClick={() => dispatch(logout())}>logout</button>
    </div>
  );
};

export default Navigation;
