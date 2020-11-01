import { generateId } from '../utils/utils';

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: generateId(),
    votes: 0
  };
};

const initialState = anecdotesAtStart.map(asObject);

const anecdoteReducer = (state = initialState, action) => {
  console.log('state now: ', state);
  console.log('action', action);

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

  default: {
    return state;
  }
  }
};

const addVote = (id) => ({
  type: 'VOTE',
  data: { id }
});

const newAnecdote = (txt) => ({
  type: 'NEW',
  data: {
    content: txt,
    id: generateId(),
    votes: 0
  }
});


export {
  anecdoteReducer,
  addVote,
  newAnecdote
};
