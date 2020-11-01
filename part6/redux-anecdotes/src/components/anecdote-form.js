import React from 'react';
import { useDispatch } from 'react-redux';
import { newAnecdote } from '../reducers/anecdoteReducer';
import { show, hide } from '../reducers/notification-reducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = (e) => {
    e.preventDefault();
    dispatch(newAnecdote(e.target.anecdote.value));
    dispatch(show(`You created ${e.target.anecdote.value}`));
    setTimeout(() => {
      dispatch(hide());
    }, 5000);
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
