const { UserInputError, AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');
const { JWT_PASS } = require('../utils/config');
const Book = require('../models/book');
const Author = require('../models/author');
const User = require('../models/user');

const addBook = async (parent, args, { currentUser }) => {
  if(!currentUser) {
    throw new AuthenticationError('Not authenticated!');
  }

  const book = new Book({ ...args });
  try{
    return await book.save();
  } catch (e) {
    throw new UserInputError(e.message, {
      invalidArgs: args
    });
  }
};

const editAuthor = async (parent, args, { currentUser }) => {
  if(!currentUser) {
    throw new AuthenticationError('Not authenticated!');
  }

  try{
    const author = await Author.findOne({ name: args.name });
    author.born =  args.setBornTo;
    return await author.save();
  } catch (e) {
    throw new UserInputError(e.message, {
      invalidArgs: args
    });
  }
};

const createUser = async (parent, args) => {
  try {
    const user = new User({
      username: args.username,
      favoriteGenre: args.favoriteGenre
    });
    return await user.save();
  } catch (e) {
    throw new UserInputError(e.message, {
      invalidArgs: args
    });
  }
};

const login = async (parent, args) => {
  const user = await User.findOne({ username: args.username });

  if(!user || args.password !== 'passu') {
    throw new UserInputError('Invalid credentials!');
  }

  return { value: jwt.sign({
    username: user.username,
    id: user._id
  }, JWT_PASS) };
};

module.exports = { addBook, editAuthor, createUser, login };
