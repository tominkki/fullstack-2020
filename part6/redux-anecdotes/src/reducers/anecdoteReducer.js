import { generateId } from '../utils/utils';

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

const newAnecdote = data => ({
  type: 'NEW',
  data
});

const initAnecdotes = data => ({
  type: 'INIT',
  data
});

export {
  anecdoteReducer,
  addVote,
  newAnecdote,
  initAnecdotes
};
