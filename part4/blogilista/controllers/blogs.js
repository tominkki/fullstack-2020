const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', (req, res) => {
    Blog.find({})
      .then(blogs => {
        res.json(blogs)
    })
    .catch(err => next(err));
});
  
blogsRouter.post('/', (req, res) => {
    const blog = new Blog(req.body);

    blog.save()
      .then(result => {
        res.status(201).json(result);
    })
    .catch(err => next(err));

});

module.exports = blogsRouter;