const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/users');

loginRouter.post('/', async (req,res) => {
  const user = await User.findOne({username: req.body.username});

  const correctPW = user != null ?
    await bcrypt.compare(req.body.password, user.pwHash)
    : false;

  if(!(user && correctPW)) {
    return res.status(401).json({
      error: 'Invalid username or password.'
    });
  }

  const token = jwt.sign({
    username: user.username,
    id: user.id
  }, process.env.SECRET);

  res.status(200).send({token, username: user.username, name: user.name});
});

module.exports = loginRouter;
