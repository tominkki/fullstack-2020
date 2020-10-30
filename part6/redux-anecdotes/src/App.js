import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { generateId, sortedByVotes} from './utils/utils';

const App = () => {
  const anecdotes = useSelector(state => state);
  const dispatch = useDispatch();

  const vote = (id) => {
    console.log('vote', id);
    dispatch({
      type: 'VOTE',
      data: {
        id: id
      }
    });
  };

  const addAnecdote = (e) => {
    e.preventDefault();
    dispatch({
      type: 'NEW',
      data: {
        content: e.target.anecdote.value,
        id: generateId(),
        votes: 0
      }
    });
    e.target.anecdote.value = '';
  }

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
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdote'/></div>
        <button type='submit'>create</button>
      </form>
    </div>
  );
};

export default App;
