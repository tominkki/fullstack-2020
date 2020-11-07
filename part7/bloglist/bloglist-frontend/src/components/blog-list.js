import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { like, remove } from '../reducers/blog-reducer';
import { useVisibility } from '../hooks/hooks';
import './styles/blog.css';

const Blog = ({ blog }) => {

  const dispatch = useDispatch();
  const visibility = useVisibility(false);

  const addLike = () => {
    dispatch(like(blog));
  };

  const deleteBlog = () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      dispatch(remove(blog));
    }
  };

  return(
    <div className="blog">
      <>
        {blog.title} by {blog.author}
        <button {...visibility.btn}>{visibility.value ? 'hide' : 'show'}</button>
        <br/>
      </>
      {visibility.value &&
            <>
              url: {blog.url}<br/>
              likes: <span className='likes'>{blog.likes}</span>
              <button onClick={addLike}>like</button><br/>
              {blog.user.name}<br/>
              <button onClick={deleteBlog}>remove</button>
            </>}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired
};

const BlogList = () => {

  const blogs = useSelector(state => state.blogs);
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);

  return(
    <div>
      {sortedBlogs.map(blog =>
        <Blog key={blog.id} blog={blog}/>
      )}
    </div>
  );
};

export default BlogList;
