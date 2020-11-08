import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './styles/blog.css';

const BlogList = () => {

  const blogs = useSelector(state => state.blogs);
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);

  return(
    <div>
      {sortedBlogs.map(blog =>
        <div className='blog' key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} by {blog.author}
          </Link>
        </div>
      )}
    </div>
  );
};

export default BlogList;
