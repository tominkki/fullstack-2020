import React from 'react';
import { useSelector } from 'react-redux';
import './styles/notification.css';

const Notification = () => {

  const notification = useSelector(state => state.notification);

  if(!notification.timeout){ return null; }

  if(notification.error){
    return(
      <div className='error'>
        <b>{notification.msg}</b>
      </div>
    );
  }

  return(
    <div className='success'>
      <b>{notification.msg}</b>
    </div>
  );
};

export default Notification;
