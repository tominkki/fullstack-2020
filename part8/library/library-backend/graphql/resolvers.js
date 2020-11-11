const {
  bookCount,
  authorCount,
  allBooks,
  allAuthors
} = require('./queries');
const { addBook, editAuthor } = require('./mutations');

const resolvers = {
  Query: {
    bookCount,
    authorCount,
    allBooks,
    allAuthors
  },

  Author: {

  },

  Mutation: {
    addBook
  }
};

module.exports = resolvers;
