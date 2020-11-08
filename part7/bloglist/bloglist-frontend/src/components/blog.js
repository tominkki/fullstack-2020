import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { like, remove } from '../reducers/blog-reducer';
import CommentForm from './comment-form';

const Blog = ({ blog }) => {

  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  if(!blog) return null;

  return(
    <div>
      <h3>{blog.title} by {blog.author}</h3>
      <a href={blog.url}>{blog.url}</a>
      <p>
        {blog.likes} likes
        <button onClick={() => dispatch(like(blog))}>like</button>
      </p>
      <p>added by {blog.user.name}</p>
      {user.id === blog.user.id &&
        <button onClick={() => dispatch(remove(blog))}>remove</button>
      }
      <br/>
      <b>comments</b>
      <CommentForm id={blog.id}/>
      {blog.comments.map((comment, i) =>
        <li key={i}>{comment}</li>
      )}
    </div>
  );
};

export default Blog;
