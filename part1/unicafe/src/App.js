import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const Statistics = ({ good, bad, neutral }) => {
  const total = good + bad + neutral;
  const average = ((good * 1) + (bad * -1)) / total;
  const positive = (good / total) * 100;

  return (
    <div>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {total}</p>
      <p>average {average || 0}</p>
      <p>positive {positive || 0}%</p>
    </div>  
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button text='good' handleClick={() => setGood(good + 1)}/>
      <Button text='neutral' handleClick={() => setNeutral(neutral + 1)}/>
      <Button text='bad' handleClick={() => setBad(bad + 1)}/>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App