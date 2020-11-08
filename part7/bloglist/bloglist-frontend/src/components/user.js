import React from 'react';

const User = ({user}) => {
  
  if(!user) return null;
  
  return (
    <div>
      <h3>{user.name}</h3>
      <b>added blogs</b>
      {user.blogs.map(blog => 
        <li key={blog.id}>{blog.title}</li>
      )}
    </div>
  );
}
export default User;
