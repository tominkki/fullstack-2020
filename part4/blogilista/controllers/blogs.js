const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/users');

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find()
    .populate('user', {username: 1, name: 1});

  if(!blogs) {
    return res.status(404).send('not found');
  }

  res.json(blogs);
});

blogsRouter.get('/:id', async (req,res) => {
  const blog = await Blog.findById(req.params.id);

  if(!blog) {
    return res.status(404).send('not found');
  }
  res.json(blog);
})
  
blogsRouter.post('/', async (req, res, next) => {

  const token = req.token;
  const decodedToken = jwt.verify(token, process.env.SECRET);

  if(!token || !decodedToken.id) {
    return res.status(401).json({error: 'Token missing or invalid.'});
  }

  const user = await User.findById(decodedToken.id);

  const blog = new Blog({...req.body, user: user.id});
  const savedBlog = await blog.save()

  user.blogs = [...user.blogs, savedBlog._id];
  await user.save();

  res.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', async (req, res) => {
  await Blog.findByIdAndRemove(req.params.id);
  res.status(204).end();
});

blogsRouter.put('/:id', async (req, res) => {
  const blog = req.body;
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {new: true});
  res.status(200).json(updatedBlog);
})

module.exports = blogsRouter;