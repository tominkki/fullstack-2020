const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const config = require('./utils/config');
const typeDefs = require('./graphql/type-defs');
const resolvers = require('./graphql/resolvers');
const context = require('./graphql/context');

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
  context
});

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`);
  console.log(`Subscriptions ready at ${subscriptionsUrl}`);
});
