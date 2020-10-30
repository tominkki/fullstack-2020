import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sortedByVotes} from './utils/utils';
import { addVote } from './reducers/anecdoteReducer';
import AnecdoteForm from './components/anecdote-form';

const App = () => {
  const anecdotes = useSelector(state => state);
  const dispatch = useDispatch();

  const vote = (id) => { 
    dispatch(addVote(id)); 
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {sortedByVotes(anecdotes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <AnecdoteForm/>
    </div>
  );
};

export default App;
