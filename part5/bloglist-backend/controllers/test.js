const router = require('express').Router();
const Blog = require('../models/blog');

router.post('/init', async (req, res) => {
  const initial = [
    {_id: '5f7b047da9d8de91856b773d',title: 'maistuis varmaan sullekki', author:'Niilo22', url: 'google.com', likes: 222, user: '5f81b4cc701a2e00aa4eb6e3', __v: 0},
    {_id: '5f7b1e84f86d12bb3f19290e', likes: 0, title: 'Pizzakulma on nopee', author: 'webslave', url: 'pizzakulma.com', user: '5f81b4cc701a2e00aa4eb6e3', __v: 0}
  ];

  await Blog.deleteMany({});
  await Blog.insertMany(initial);
  
  res.status(204).end();
});

module.exports = router;
