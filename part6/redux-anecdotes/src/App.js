import React, {useEffect} from 'react';
import AnecdoteForm from './components/anecdote-form';
import AnecdoteList from './components/anecdote-list';
import Filter from './components/filter';
import Notification from './components/Notification';
import { initAnecdotes } from './reducers/anecdoteReducer';
import anecdoteService from './services/anecdotes';
import { useDispatch } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const anecdotes = await anecdoteService.getAll();
      dispatch(initAnecdotes(anecdotes));
    })();
  },[dispatch]);
  
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification/>
      <Filter/>
      <AnecdoteList/>
      <AnecdoteForm/>
    </div>
  );
}

export default App;
