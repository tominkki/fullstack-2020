const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { JWT_PASS } = require('../utils/config');

const context = async ({ req }) => {
  const auth = req ? req.headers.authorization : null;

  if(auth && auth.toLowerCase().startsWith('bearer ')) {
    const decodedToken = jwt.verify(
      auth.substring(7), JWT_PASS
    );
    const currentUser = await User.findById(decodedToken.id);
    return { currentUser };
  }
};

module.exports = context;
