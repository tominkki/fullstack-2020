const notificationReducer = (state = {}, action) => {
  switch(action.type) {
  case 'SHOW': {
    if(state.duration) {
      clearTimeout(state.duration);
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

const show  = (txt, duration) => (
  async dispatch => {
    dispatch({
      type: 'SHOW',
      data: {
        txt,
        duration: setTimeout(() => {
          dispatch(hide());
        }, duration*1000)
      }
    });
  }
);

const hide = () => ({ type: 'HIDE' });

export { notificationReducer, show, hide };
