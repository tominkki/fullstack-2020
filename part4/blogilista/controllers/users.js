const usersRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/users');

usersRouter.post('/', async(req, res) => {

  if(req.body.password.length < 3){
    return res.status(400).json({
      error: 'Password length has to be atleast 3 characters.'
    });
  }

  const pwHash = await bcrypt.hash(req.body.password, 10);

  const user = new User({
    username: req.body.username,
    name: req.body.name,
    pwHash
  });

  res.json(await user.save());
}); 

usersRouter.get('/', async (req, res) => {
  const users = await User.find();

  if(!users) {
    return res.status(404).send('not found');
  }

  res.json(users);
})

module.exports = usersRouter;