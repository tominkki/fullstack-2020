const {
  bookCount,
  authorCount,
  allBooks,
  allAuthors,
  me
} = require('./queries');
const { addBook, editAuthor,
  createUser, login } = require('./mutations');

const resolvers = {
  Query: {
    bookCount,
    authorCount,
    allBooks,
    allAuthors,
    me
  },

  Author: {
    bookCount
  },

  Mutation: {
    addBook,
    editAuthor,
    createUser,
    login
  }
};

module.exports = resolvers;
