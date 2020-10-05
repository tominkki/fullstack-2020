const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const logger = require('./utils/logger');
const config = require('./utils/config');
const middleware = require('./utils/middleware');
const blogsRouter = require('./controllers/blogs');
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
app.use(middleware.reqLogger);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);


module.exports = app;