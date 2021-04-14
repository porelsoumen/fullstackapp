import React, { useState } from 'react';
import logo from './logo.svg';


const Button = ({handleClick, text}) => {
  return (
    <div>
    <button onClick={handleClick}>
    {text}
    </button>
    </div>
  )
}

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  let all = good + neutral + bad;
  let avg = (good * 1 + bad * -1)/ all;
  let pos = good / all;

  return (
    <div>
      <Button handleClick={() => setGood(good + 1)} text='good' />
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button handleClick={() => setBad(bad + 1)} text='bad' />
      <h2>Statistics</h2>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>average {avg}</p>
      <p>positive {pos}</p>
    </div>
  );
}

export default App;
