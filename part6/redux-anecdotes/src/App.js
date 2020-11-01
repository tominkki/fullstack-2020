import React from 'react';
import AnecdoteForm from './components/anecdote-form';
import AnecdoteList from './components/anecdote-list';
import Notification from './components/Notification';

const App = () => (
  <div>
    <h2>Anecdotes</h2>
    <Notification/>
    <AnecdoteForm/>
    <AnecdoteList/>
  </div>
);

export default App;
