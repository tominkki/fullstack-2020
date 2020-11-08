import usersService from '../services/users';

const usersReducer = (state = [], action) => {

  switch(action.type) {
  case 'INIT_USERS': {
    return action.data;
  }

  default: {
    return state;
  }
  }
};

const initUsers = () => (
  async dispatch => {
    const data = await usersService.getUsers();
    dispatch({
      type: 'INIT_USERS',
      data
    });
  }
);

export {
  usersReducer,
  initUsers
};
