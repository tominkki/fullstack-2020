const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

const getToken = async (user) => {
  const res = await api.post('/api/login')
    .send(user);

  return res.body.token;
};

module.exports = getToken;