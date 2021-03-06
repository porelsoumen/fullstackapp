import React, { useState } from 'react';
import './App.css'

const Statistics = ({good, neutral, bad}) => {
    if (good === 0 && neutral === 0 && bad === 0) {
      return (
        <div>
        <p>No feedback given</p>
        </div>
      )
    }
    const all = good + bad + neutral;
    const avg = (good * 1 + bad * -1)/ all;
    const pos = good / all;
    const symbol = '%';

    return (
      <div>
      <table><tbody>
      <Statistic text="good" value={good} />
      <Statistic text="neutral" value={neutral} />
      <Statistic text="bad" value={bad} />
      <Statistic text="all" value={all} />
      <Statistic text="average" value={avg} />
      <Statistic text="positive" value={pos} symbol={symbol}/>
      </tbody>
      </table>
      </div>
    )
}

const Statistic = (props) => {
  return (
    <>
    <tr><td>{props.text}</td><td> {props.value}</td><td> {props.symbol ? props.symbol : ''}</td></tr>
    </>
  )
}

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

  return (
    <div>
      <h2>give feedback</h2>
      <Button handleClick={() => setGood(good + 1)} text='good' />
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button handleClick={() => setBad(bad + 1)} text='bad' />
      <br/>
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  );
}

export default App;
