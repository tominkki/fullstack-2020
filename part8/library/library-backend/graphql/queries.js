const Book = require('../models/book');
const Author = require('../models/author');
const ObjectId = require('mongoose').Types.ObjectId;

const bookCount = async (parent) => {
  if(parent) {
    return await Book.collection.countDocuments(
      { author: new ObjectId(parent.id) }
    );
  }
  return await Book.collection.countDocuments();
};

const authorCount = async () => await Author.collection.countDocuments();

const allBooks = async (parent, args) => {
  let filters = {};

  if(args.author) {
    const author = await Author.findOne({ name: args.author });
    filters.author = author._id;
  }
  if(args.genre) {
    filters.genres = args.genre;
  }
  return await Book.find(filters)
    .populate('author', { name: 1 });
};

const allAuthors = async () => await Author.find({});

const me = (parent, args, { currentUser }) => currentUser;

module.exports = {
  bookCount,
  authorCount,
  allBooks,
  allAuthors,
  me
};
