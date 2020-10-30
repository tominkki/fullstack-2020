import React from 'react';
import AnecdoteForm from './components/anecdote-form';
import AnecdoteList from './components/anecdote-list';

const App = () => (
  <div>
    <h2>Anecdotes</h2>
    <AnecdoteForm/>
    <AnecdoteList/>
  </div>
);

export default App;
