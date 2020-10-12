const mostBlogs = require('../utils/list_helper').mostBlogs;


describe('most blogs', () => {
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
    },
    {
      title:'aamupala',
      author:'Niilo22',
      url:'google.com',
      likes:347,
      id:'5f79b923fc371a11b9f28ddf'
    }
  ];

  test('list of blogs', () => {
    const result = mostBlogs(blogs);
    expect(result).toEqual(
      {
        author: 'Niilo22',
        blogs: 2
      }
    );
  });
});
