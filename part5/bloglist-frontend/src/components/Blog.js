import React, {useState} from 'react';
import './styles/blog.css';

const Blog = ({ blog, user, updateBlog, removeBlog }) => {
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
  
  const remove = () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      removeBlog(blog);
    }
  }

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
      {blog.user.name}<br/>
      {blog.user.id === user.id && <button onClick={remove}>remove</button>}
    </>}
  </div>
);
};

export default Blog;
