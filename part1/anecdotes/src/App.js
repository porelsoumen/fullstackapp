import React, { useState } from 'react';

const MostVotedAnecdote = (props) => {
  let voted = false
  let i
  for (i=0;i<props.votes.length;i++){
    if (props.votes[i] !== 0) {
      voted = true
      break
    }
  }
  if (voted === false){
    return (<div></div>)
  }
  return (
    <div>
    <h2>Anecdote with most votes</h2>
    <p>{props.anecdotes[props.votes.indexOf(Math.max(...props.votes))]}</p>
    <p>has {Math.max(...props.votes)} votes</p>
    </div>
  )
}

function App() {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVote] = useState(Array.apply(null, new Array(6)).map(Number.prototype.valueOf,0))

  function incrementVote() {
    const votesCopy = [...votes];
    votesCopy[selected] += 1;
    setVote(votesCopy)
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      {anecdotes[selected]}
      <br/>
      has {votes[selected]} votes
      <br/>
      <button onClick={() => incrementVote()}>Vote</button>
      <button onClick={() => setSelected(Math.floor((Math.random()*5)+1))}>next anecdote</button>
      <br/>
      <MostVotedAnecdote votes={votes} anecdotes={anecdotes}/>
    </div>
  )
}

export default App;
