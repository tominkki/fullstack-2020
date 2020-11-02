const notificationReducer = (state = '', action) => {
  switch(action.type) {
  case 'SHOW': {
    return action.txt;
  }
  case 'HIDE': {
    return '';
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
      txt
    });
    setTimeout(() => {
      dispatch(hide());
    }, duration*1000);
  }
);

const hide = () => ({ type: 'HIDE' });

export { notificationReducer, show, hide };
