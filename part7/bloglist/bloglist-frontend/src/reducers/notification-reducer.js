const notificationReducer = (state = {}, action) => {

  switch(action.type) {
  case 'SHOW': {
    if(state.timeout) {
      clearTimeout(state.timeout);
    }
    return action.data;
  }
  case 'HIDE': {
    return {};
  }
  default: {
    return state;
  }
  }
};

const hide = () => ({ type: 'HIDE' });

const show = (msg, error = false, timeout = 4) => (
  async dispatch => {
    dispatch({
      type: 'SHOW',
      data: {
        msg,
        error,
        timeout: setTimeout(() => {
          dispatch(hide());
        }, timeout * 1000)
      }
    });
  }
);

export {
  notificationReducer,
  show,
  hide
};
