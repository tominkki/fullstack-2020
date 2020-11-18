const {
  bookCount,
  authorCount,
  allBooks,
  allAuthors,
  me
} = require('./queries');
const { addBook, editAuthor,
  createUser, login } = require('./mutations');
const pubsub = require('./pubsub');

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
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
};

module.exports = resolvers;
