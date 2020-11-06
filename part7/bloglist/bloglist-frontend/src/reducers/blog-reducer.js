import blogService from '../services/blogs';

const blogReducer = (state = [], action) => {

  switch(action.type) {
    case 'INIT': {
      return action.data;
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

export {
  blogReducer,
  initBlogs
};