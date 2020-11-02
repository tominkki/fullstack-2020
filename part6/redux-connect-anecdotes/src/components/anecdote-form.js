import React from 'react';
import { connect } from 'react-redux';
import { newAnecdote } from '../reducers/anecdoteReducer';
import { show } from '../reducers/notification-reducer';

const AnecdoteForm = ({ newAnecdote, show }) => {
  const addAnecdote = async (e) => {
    e.preventDefault();
    newAnecdote(e.target.anecdote.value);
    show(`You created ${e.target.anecdote.value}`, 5);
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

const mapDispatchToProps = {
  newAnecdote,
  show
};

export default connect(
  null,
  mapDispatchToProps
)(AnecdoteForm);
