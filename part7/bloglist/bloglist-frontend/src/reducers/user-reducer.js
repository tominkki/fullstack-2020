import loginService from '../services/login-service';
import blogService from '../services/blogs';
import { show } from './notification-reducer';

const userReducer = (state = null, action) => {

  switch(action.type) {

    case 'LOGIN': {
      return action.data;
    }

    case 'LOGGED': {
      return action.data;
    }

    case 'LOGOUT': {
      return null;
    }

    default: {
      return state;
    }
  }
};

const login = credentials => (
  async dispatch => {
    try {
      const data = await loginService.login(credentials);
      window.localStorage.setItem('loggedUser', JSON.stringify(data));
      blogService.setToken(data.token);
      dispatch({
        type: 'LOGIN',
        data
      });
    } catch(e) {
      dispatch(show('wrong username or password', true));
    }
  }
);

const setLoggedUser = (data) => (
  async dispatch => {
    blogService.setToken(data.token);
    dispatch({
      type: 'LOGGED',
      data
    });
  }
);

const logout = () => (
  async dispatch => {
    window.localStorage.removeItem('loggedUser');
    blogService.setToken('');
    dispatch({
      type: 'LOGOUT'
    });
  }
);

export {
  userReducer,
  login,
  setLoggedUser,
  logout
};
