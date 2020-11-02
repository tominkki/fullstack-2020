import React from 'react';
import { useDispatch } from 'react-redux';
import { newAnecdote } from '../reducers/anecdoteReducer';
import { show, hide } from '../reducers/notification-reducer';
import anecdoteService from '../services/anecdotes';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (e) => {
    e.preventDefault();
    e.persist();
    const res = await anecdoteService.addAnecdote(e.target.anecdote.value);
    dispatch(newAnecdote(res));
    dispatch(show(`You created ${res.content}`));
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
