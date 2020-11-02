import anecdoteService from '../services/anecdotes';

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
  case 'VOTE': {
    const id = action.data.id;
    const anecdoteToUpdate = state.find(obj => obj.id === id);
    const updated = {
      ...anecdoteToUpdate,
      votes: anecdoteToUpdate.votes + 1
    };

    return state.map(obj =>
      obj.id !== id ? obj : updated
    );
  }

  case 'NEW': {
    return [...state, action.data];
  }

  case 'INIT': {
    return action.data;
  }

  default: {
    return state;
  }
  }
};

const addVote = id => ({
  type: 'VOTE',
  data: { id }
});

const newAnecdote = content => (
  async dispatch => {
    const data = await anecdoteService.addAnecdote(content);
    dispatch({
      type: 'NEW',
      data
    });
  }
);

const initAnecdotes = () => (
  async dispatch => {
    const data = await anecdoteService.getAll();
    dispatch({
      type: 'INIT',
      data
    });
  }
);

export {
  anecdoteReducer,
  addVote,
  newAnecdote,
  initAnecdotes
};
