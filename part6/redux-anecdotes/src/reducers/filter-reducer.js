const filterReducer = (state = '', action) => {
  switch (action.type) {
  case 'CHANGE': {
    return action.filter;
  }
  default: {
    return state;
  }
  }
};

const changeFilter = filter => ({
  type: 'CHANGE',
  filter
});

export { filterReducer, changeFilter };
