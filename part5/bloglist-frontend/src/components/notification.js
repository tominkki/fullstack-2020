import React from 'react';
import PropTypes from 'prop-types';
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

Notification.propTypes = {
  msg: PropTypes.string.isRequired,
  error: PropTypes.bool
}

export default Notification;