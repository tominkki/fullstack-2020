import React, {useState} from 'react';
import './styles/blog.css';

const Blog = ({ blog }) => {
  const [visibility, setVisibility] = useState(false);
  

  return (
  <div className="blog">
    <>
      {blog.title} by {blog.author}
      <button onClick={() => setVisibility(!visibility)}>{visibility ? 'hide' : 'show'}</button>
      <br/>
    </>
    {visibility && 
    <>
      url: {blog.url}<br/>
      likes: {blog.likes}
      <button>like</button><br/>
      {blog.user.name}
    </>}
  </div>
);
};

export default Blog;
