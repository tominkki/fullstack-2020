import React from 'react';
import { useDispatch } from 'react-redux';
import { newAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = (e) => {
    e.preventDefault();
    dispatch(newAnecdote(e.target.anecdote.value));
    e.target.anecdote.value = '';
  };

  return(
    <>
    <h3>create new</h3>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdote'/></div>
        <button type='submit'>create</button>
      </form>
      </>
  );
};

export default AnecdoteForm;
