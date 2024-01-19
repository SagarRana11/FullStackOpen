import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { vote, initializeAnecdotes } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch();
  const id = anecdote.id;

  const voteHandler = () => {
    dispatch(vote(anecdote));
    dispatch(setNotification(`You voted for '${anecdote.content}'`, 5));
  };

  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={voteHandler}>vote</button>
      </div>
    </div>
  );
};

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => {
    const { filter, anecdotes } = state;
    if (filter === null) {
      return anecdotes;
    }
    const regex = new RegExp(filter, 'i');
    return anecdotes.filter((anecdote) => anecdote.content.match(regex));
  });

  const byVotes = (b1, b2) => b2.votes - b1.votes;

  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, [dispatch]);

  return anecdotes.sort(byVotes).map((anecdote) => <Anecdote key={anecdote.id} anecdote={anecdote} />);
};

export default AnecdoteList;

