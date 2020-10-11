const totalLikes = require('../utils/list_helper').totalLikes;

describe('total likes', () => {
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

  const oneBlog = [
    {
      title: 'Jamix leipoo.',
      author: 'webmaster',
      url: 'safk.at',
      likes: 1,
      id: '21093871249807'
    }
  ];

  test('of empty list is zero', () => {
    const result = totalLikes([]);
    expect(result).toBe(0);
  });

  test('when list has only one blog equals the likes of that', () => {
    const result = totalLikes(oneBlog);
    const likes = oneBlog[0].likes;
    expect(result).toBe(likes);
  });

  test('of a bigger list is calculated right', () => {
    const result = totalLikes(blogs);
    expect(result).toBe(292);
  });
});

