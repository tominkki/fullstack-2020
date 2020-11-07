import blogService from '../services/blogs';

const blogReducer = (state = [], action) => {

  switch(action.type) {
  case 'INIT': {
    return action.data;
  }

  case 'ADD': {
    return [...state, action.data];
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

export {
  blogReducer,
  initBlogs,
  addBlog
};
