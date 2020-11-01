import React from 'react';
import AnecdoteForm from './components/anecdote-form';
import AnecdoteList from './components/anecdote-list';
import Filter from './components/filter';
import Notification from './components/Notification';

const App = () => (
  <div>
    <h2>Anecdotes</h2>
    <Notification/>
    <Filter/>
    <AnecdoteList/>
    <AnecdoteForm/>
  </div>
);

export default App;
