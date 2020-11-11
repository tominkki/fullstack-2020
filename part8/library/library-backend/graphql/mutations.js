const Book = require('../models/book');
const Author = require('../models/author');

const addBook = async (parent, args) => {
  const book = new Book({ ...args });
  return await book.save();
};

const editAuthor = async (parent, args) => {
  const author = await Author.findOne({ name: args.name });
  author.born =  args.setBornTo;
  return await author.save();
};

module.exports = { addBook, editAuthor };
