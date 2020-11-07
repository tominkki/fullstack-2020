import blogService from '../services/blogs';

const blogReducer = (state = [], action) => {

  switch(action.type) {
  case 'INIT': {
    return action.data;
  }

  case 'ADD': {
    return [...state, action.data];
  }

  case 'UPDATE': {
    return state.map(blog =>
      blog.id !== action.data.id ? blog : action.data
    );
  }

  case 'REMOVE': {
    return state.filter(blog => 
      blog.id !== action.id
    );
  }

  default: {
    return state;
  }
  }
};

const initBlogs = () => (
  async dispatch => {
    const data = await blogService.getAll();
    dispatch({
      type: 'INIT',
      data
    });
  }
);

const addBlog = content => (
  async dispatch => {
    const data = await blogService.create(content);
    dispatch({
      type: 'ADD',
      data
    });
  }
);

const like = content => (
  async dispatch => {
    const data = await blogService.update({
      ...content,
      user: content.user.id,
      likes: content.likes + 1
    });
    dispatch({
      type: 'UPDATE',
      data
    });
  }
);

const remove = content => (
  async dispatch => {
    await blogService.remove(content.id);
    dispatch({
      type: 'REMOVE',
      id: content.id
    });
  }
);

export {
  blogReducer,
  initBlogs,
  addBlog,
  like,
  remove
};
