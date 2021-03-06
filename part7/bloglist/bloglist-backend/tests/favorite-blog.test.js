const favoriteBlog = require('../utils/list_helper').favoriteBlog;

describe('most likes', () => {
  const blogs = [
    {
      title:'maistuis varmaan sullekki',
      author:'Niilo22',
      url:'google.com',
      likes:222,
      id:'5f79b923fc371a11b9f28ddf'
    },
    {
      title:'oli ko hyvää',
      author:'Pizzeria ja pub Teheran',
      url:'google.com',
      likes:69,
      id:'5f79cea2fc371a11b9f28de0'
    },
    {
      title: 'Jamix leipoo.',
      author: 'webmaster',
      url: 'safk.at',
      likes: 1,
      id: '21093871249807'
    }
  ];

  test('empty list', () => {
    const result = favoriteBlog([]);

    expect(result).toEqual(
      {

      }
    );
  });

  test('list of blogs', () => {
    const result = favoriteBlog(blogs);
    expect(result).toEqual(
      {
        title:'maistuis varmaan sullekki',
        author:'Niilo22',
        url:'google.com',
        likes:222,
        id:'5f79b923fc371a11b9f28ddf'
      }
    );
  });
});
