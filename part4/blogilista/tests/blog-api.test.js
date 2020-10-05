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

  test('likes default value is zero', async() => {
    await api.post('/api/blogs')
      .send(
        {
          title: "Pizzakulma on nopee",
          author: "webslave",
          url: "pizzakulma.com"
        }
      )
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const res = await api.get('/api/blogs');
    const likes = res.body.map(blogs => blogs.likes);

    expect(likes[likes.length - 1]).toBe(0);
  });

  test('responds 400 if missing title and url', async() => {
    await api.post('/api/blogs')
      .send(
        {
          author: "meikämandariini",
        }
      )
      .expect(400)
  });

  test('deleting blogs by id', async() => {
    const res = await api.get('/api/blogs');
    const ids = res.body.map(blog => blog.id);

    await api.delete(`/api/blogs/${ids[ids.length - 1]}`)
      .expect(204);
    await api.delete(`/api/blogs/${ids[ids.length - 2]}`)
      .expect(204);
  });    

  afterAll(() => {
    mongoose.connection.close();
  });
});
