const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const config = require('./utils/config');
const typeDefs = require('./graphql/type-defs');
const resolvers = require('./graphql/resolvers');

(async() => {
  try {
    await mongoose.connect(config.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
    console.log('Connected to db.');
  } catch (e) {
    console.log(`Could not connect to db: ${e.message}`);
  }
})();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
