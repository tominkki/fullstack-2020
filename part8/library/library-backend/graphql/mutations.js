const Book = require('../models/book');

const addBook = async (parent, args) => {
  const book = new Book({ ...args });
  return await book.save();
};

const editAuthor = (parent, args) => {

};

module.exports = { addBook, editAuthor };
