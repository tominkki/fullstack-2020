import axios from 'axios';
import { generateId } from '../utils/utils';

const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async() => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const addAnecdote = async(content) => {
  const newObj = { content, id: generateId(), votes:0 };
  const res = await axios.post(baseUrl, newObj);
  return res.data;
};

const addVote = async(anecdote) => {
  const updated = { ...anecdote, votes: anecdote.votes + 1 };
  const res = await axios.put(`${baseUrl}/${anecdote.id}`, updated);
  return res.data;
};

export default { getAll, addAnecdote, addVote };
