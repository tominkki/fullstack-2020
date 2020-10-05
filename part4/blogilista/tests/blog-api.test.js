const supertest = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

const api = supertest(app);

describe('api tests', () => {

  test('blogs are returned as json', async() => {
    await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('there are 2 blogs in db', async() => {
    const res = await api.get('/api/blogs');
    expect(res.body).toHaveLength(2);
  });

  test('returned objects have "id" field', async() => {
    const res = await api.get('/api/blogs');
    expect(res.body[0].id).toBeDefined();
  });

  afterAll(() => {
    mongoose.connection.close();
  });
});
