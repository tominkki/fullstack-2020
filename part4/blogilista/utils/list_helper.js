const collection = require('lodash/collection');

const dummy = (blogs) => {return 1;};

const totalLikes = blogs => {
  const reducer = (sum, blog) => (
    sum + blog.likes
  );

  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0);
};

const favoriteBlog = blogs => (blogs.length === 0 ? {} : blogs.sort((a, b) =>
  a.likes > b.likes ? -1
    : a.likes === b.likes ? 0
      : 1
)[0]
);

const mostBlogs = blogs => {
  const result = collection.groupBy(blogs, 'author');
  const author = Object.keys(result)[0];

  return({ 
    author: author,
    blogs: result[author].length
  });
};

const mostLikes = blogs => {
  const result = collection.groupBy(blogs, 'author');
  const keys = Object.keys(result);

  const authors = keys.map(key => (
    {
      author: key,
      likes: totalLikes(result[key])
    } 
  ));

  return favoriteBlog(authors);
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};