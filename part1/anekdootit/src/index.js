import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({onClick, text}) =>(
  <button onClick = {onClick}>
    {text}
  </button>
)

const nextAnecdote = ({selected}) =>{
  let newState = Math.floor(Math.random() * (6) + 0);

  while(newState === selected){
    newState = Math.floor(Math.random() * (6) + 0);
  }

  return newState;
}

const addVote = ({anecdotes, selected, votes}) =>{
  anecdotes[selected].votes = anecdotes[selected].votes + 1;

  const newVotes = votes + 1;
  return newVotes;
}

const Votes = ({anecdotes, selected}) =>(
<p>Has {anecdotes[selected].votes} votes.</p>
)

const MostVoted = ({anecdotes}) =>{
  let index = 0;
  let maxVotes = 0;
  
  for(let i = 0; i < anecdotes.length; i++){
    if(anecdotes[i].votes > maxVotes){
      index = i;
      maxVotes = anecdotes[i].votes;
    }
  }

  if(maxVotes === 0){
    return(
      <>
      <p>No votes left yet.</p>
      </>
    )
  }

  return(
    <>
    <p>{anecdotes[index].text}</p>
    <Votes anecdotes = {anecdotes} selected = {index} />
    </>
  )
}

const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(0);

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected].text}</p>
      <Votes anecdotes = {anecdotes} selected = {selected} />
      <Button onClick = {() => setVotes(addVote({anecdotes, selected, votes}))} text = 'vote' />
      <Button onClick = {() => setSelected(nextAnecdote({selected}))} text = 'next anecdote' />
      <h1>Anecdote with most votes</h1>
      <MostVoted anecdotes = {anecdotes} />
    </div>
  )
}

const anecdotes = [
  {text: 'If it hurts, do it more often',
votes: 0},
  {text: 'Adding manpower to a late software project makes it later!',
votes: 0},
  {text: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
votes: 0},
  {text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
votes: 0},
  {text:'Premature optimization is the root of all evil.',
votes: 0},
  {text:'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
votes: 0}
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)