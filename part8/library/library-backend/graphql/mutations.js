const { UserInputError } = require('apollo-server');
const Book = require('../models/book');
const Author = require('../models/author');

const addBook = async (parent, args) => {
  const book = new Book({ ...args });

  try{
    return await book.save();
  } catch (e) {
    throw new UserInputError(e.message, {
      invalidArgs: args
    });
  }
};

const editAuthor = async (parent, args) => {
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

module.exports = { addBook, editAuthor };
