import React, { useState } from 'react';
import {
  Switch, Route
} from 'react-router-dom';

import Menu from './components/menu';
import AnecdoteList from './components/anecdote-list';
import About from './components/about';
import Footer from './components/footer';
import CreateNew from './components/create-new';

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ]);

  const [notification, setNotification] = useState('');

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0);
    setAnecdotes(anecdotes.concat(anecdote));
  };

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    };

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a));
  };

  return (
    <>
      <div>
        <h1>Software anecdotes</h1>
        <Menu />
      </div>
      <Switch>
        <Route exact path='/'>
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
        <Route exact path='/about'>
          <About />
        </Route>
        <Route exact path='/create'>
          <CreateNew addNew={addNew} />
        </Route>
      </Switch>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default App;
