const config = require('./utils/config');
const express = require('express');
require('express-async-errors');
const cors = require('cors');
const mongoose = require('mongoose');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const app = express();

mongoose.connect(config.DB_URL, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  useFindAndModify: false, 
  useCreateIndex: true 
})
  .then(() => {
    logger.info('Connected to db.');
  })
  .catch(err => {
    logger.error('Could not connect to db: ', err.message);
  });

app.use(cors());
app.use(express.json());
app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use(middleware.reqLogger);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);


module.exports = app;