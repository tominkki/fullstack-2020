const supertest = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const getToken = require('../utils/login');
const Blog = require('../models/blog');

const api = supertest(app);

const user = {
  username: 'niilo22',
  password: 'mrew'
};

const newBlog = {
  title: 'Jamix leipoo.',
  author: 'webmaster',
  url: 'safk.at',
  likes: 1
};

const initial = [
  {_id: '5f7b047da9d8de91856b773d',title: 'maistuis varmaan sullekki', author:'Niilo22', url: 'google.com', likes: 222, __v: 0},
  {_id: '5f7b1e84f86d12bb3f19290e', likes: 0, title: 'Pizzakulma on nopee', author: 'webslave', url: 'pizzakulma.com', __v: 0}
];

beforeAll( async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(initial);
});

describe('Api tests', () => {

  test('blogs are returned as json', async() => {
    await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('api returns right amount of blogs', async() => {
    const res = await api.get('/api/blogs');
    expect(res.body).toHaveLength(initial.length);
  });

  test('returned objects have "id" field', async() => {
    const res = await api.get('/api/blogs');
    expect(res.body[0].id).toBeDefined();
  });

  test('blogs can be posted to db with token', async() => {
    const token = await getToken(user);

    await api.post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const res = await api.get('/api/blogs');
    const authors = res.body.map(blogs => blogs.author);

    expect(res.body).toHaveLength(initial.length+1);
    expect(authors).toContain(newBlog.author);
  });

  test('likes default value is zero', async() => {
    const token = await getToken(user);

    await api.post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send({
        title: 'kuistille',
        author: 'kuisti ry',
        url: 'kuisti.org'
      })
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const res = await api.get('/api/blogs');
    const likes = res.body.map(blogs => blogs.likes);

    expect(likes[likes.length - 1]).toBe(0);
  });

  test('responds 400 if missing title and url', async() => {
    const token = await getToken(user);

    await api.post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send({
        author: 'meikämandariini',
      })
      .expect(400);
  });

  test('updating blog', async() => {
    const token = await getToken(user);

    await api.put(`/api/blogs/${initial[0]._id}`)
      .set('Authorization', `bearer ${token}`)
      .send({
        title: 'Pizzakulma on hienompi',
        author: 'webslave',
        url: 'pizzakulma.com'
      })
      .expect(200);

    const updated = await api.get(`/api/blogs/${initial[0]._id}`);
    expect(updated.body.title).toBe('Pizzakulma on hienompi');
  });

  test('deleting blogs by id', async() => {
    const token = await getToken(user);

    const res = await api.get('/api/blogs');
    const blogToDelete = res.body.filter(blog => blog.author === 'kuisti ry');

    await api.delete(`/api/blogs/${blogToDelete[0].id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204);
  }); 
  
  test('responds 401 if unauthorized person tries to add blog', async () => {
    await api.post('/api/blogs')
      .send(newBlog)
      .expect(401);
  });
});

afterAll(async () => {
  await mongoose.disconnect();
});