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

const show  = (txt) => ({ type: 'SHOW', txt });

const hide = () => ({ type: 'HIDE' });

export { notificationReducer, show, hide };
