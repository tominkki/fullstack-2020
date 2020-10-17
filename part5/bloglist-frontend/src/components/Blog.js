import React, {useState} from 'react';
import './styles/blog.css';

const Blog = ({ blog, updateBlog }) => {
  const [visibility, setVisibility] = useState(false);

  const addLike = () => {
    const updated = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    };
    updateBlog(updated, blog.id);
  };  

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
      <button onClick={addLike}>like</button><br/>
      {blog.user.name}
    </>}
  </div>
);
};

export default Blog;
