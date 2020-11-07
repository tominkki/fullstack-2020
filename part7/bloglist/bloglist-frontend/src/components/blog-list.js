import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useVisibility } from '../hooks/hooks';
import './styles/blog.css';

const Blog = ({ blog }) => {

  //const dispatch = useDispatch();
  const visibility = useVisibility(false);

  const addLike = () => {
    const updated = {
      ...blog,
      likes: blog.likes + 1,
    };
    //updateBlog(updated, blog.id);
  };

  const remove = () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      //removeBlog(blog);
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
              {/*blog.user.id === user.id && <button onClick={remove}>remove</button>*/}
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
