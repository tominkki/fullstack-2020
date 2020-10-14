import React from 'react';
import './styles/notification.css';

const Notification = ({msg, error}) => {
  
  if(error){
    return(
      <div className='error'>
        <b>{msg}</b>
      </div>
    );
  }

  return(
    <div className='success'>
      <b>{msg}</b>
    </div>
  );
};

export default Notification;