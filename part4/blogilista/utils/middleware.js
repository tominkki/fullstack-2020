const logger = require('./logger');

const reqLogger = (req, res, next) => {
  logger.info(`Method: ${req.method}`);
  logger.info(`Path: ${req.path}`);
  logger.info(`Body: ${JSON.stringify(req.body)}`);
  next()
};

const tokenExtractor = (req, res, next) => {
  const auth = req.get('authorization');
  if(auth && auth.toLowerCase().startsWith('bearer ')) {
    req.token = auth.split(' ')[1];
  }
  next();
};

const unknownEndpoint = (req, res, next) => {
  res.status(404).send({error: 'unknown endpoint'});
  next();
};

const errorHandler = (err, req, res, next) => {
  logger.error(err.message);

  switch(err.name) {
    case 'CastError':
      return res.status(400).send({error: 'malformatted id'});
      
    case 'ValidationError':
      return res.status(400).json({error: err.message});

    case 'JsonWebTokenError':
      return res.status(401).json({error: 'invalid token'});

    default:
      return next(err);
  }
};

module.exports = {
  reqLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor
};