import React from 'react';
import { connect } from 'react-redux';
import { addVote } from '../reducers/anecdoteReducer';
import { show } from '../reducers/notification-reducer';
import { sortedByVotes } from '../utils/utils';

const AnecdoteList = ({ anecdotes, addVote, show }) => {

  const vote = (anecdote) => {
    addVote(anecdote);
    show(`You voted ${anecdote.content}`, 5);
  };

  return(
    <>
      {sortedByVotes(anecdotes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = state => {
  return {
    anecdotes: state.filter
      ? state.anecdotes.filter(anecdote =>
        anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
      )
      : state.anecdotes
  };
};

const mapDispatchToProps = {
  addVote,
  show
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList);
