const supertest = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

const api = supertest(app);
const initialBlogs = 2;

describe('api tests', () => {

  test('blogs are returned as json', async() => {
    await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('there are 2 blogs in db', async() => {
    const res = await api.get('/api/blogs');
    expect(res.body).toHaveLength(initialBlogs);
  });

  test('returned objects have "id" field', async() => {
    const res = await api.get('/api/blogs');
    expect(res.body[0].id).toBeDefined();
  });

  test('blogs can be posted to db', async() => {
    await api.post('/api/blogs')
      .send(
        {
          title: "Jamix leipoo.",
          author: "webmaster",
          url: "safk.at",
          likes: 1
        }
      )
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const res = await api.get('/api/blogs');
    const authors = res.body.map(blogs => blogs.author);

    expect(res.body).toHaveLength(initialBlogs+1);
    expect(authors).toContain('webmaster');

  });

  afterAll(() => {
    mongoose.connection.close();
  });
});
