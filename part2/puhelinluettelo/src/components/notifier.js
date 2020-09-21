import React from 'react';
import './notifier.css';

const Notification = ({msg, error}) => {
    
    if(error) {
        return (
            <div className='error'>
                <p>{msg}</p>
            </div>
        );
    }

    else {
        return (
            <div className='success'>
                <p>{msg}</p>
            </div>
        );
    }
};

export default Notification;