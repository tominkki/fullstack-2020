const { UserInputError, AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');
const { JWT_PASS } = require('../utils/config');
const Book = require('../models/book');
const Author = require('../models/author');
const User = require('../models/user');
const pubsub = require('./pubsub');

const addBook = async (parent, args, { currentUser }) => {
  if(!currentUser) {
    throw new AuthenticationError('Not authenticated!');
  }

  let author = await Author.findOne({ name: args.author });

  if(!author) {
    author = new Author({ name: args.author });
    author = await author.save();
  }

  try{
    const book = await new Book({ ...args, author: author._id })
      .populate('author', { name: 1 })
      .save();

    pubsub.publish('BOOK_ADDED', { bookAdded: await book.execPopulate() });

    return await book.execPopulate();
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
