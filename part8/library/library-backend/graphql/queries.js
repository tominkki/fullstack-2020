const Book = require('../models/book');
const Author = require('../models/author');

const bookCount = async () => await Book.collection.countDocuments();

const authorCount = async () => await Author.collection.countDocuments();

const allBooks = async (parent, args) => {
  //filters here
  return await Book.find({});
};

const allAuthors = async () => await Author.find({});

/*
allBooks: (parent, args) => {
  if(args.author && args.genre) {
    return books.filter(b => b.author === args.author && b.genres.includes(args.genre));
  }
  else if(args.author || args.genre) {
    return books.filter(b => b.author === args.author || b.genres.includes(args.genre));
  }
  else return books;
}*/

module.exports = {
  bookCount,
  authorCount,
  allBooks,
  allAuthors
};
