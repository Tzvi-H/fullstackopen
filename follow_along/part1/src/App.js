import { useState } from 'react'

const Display = ({ counter }) => <div>{counter}</div>;
const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>;

const App = () => {
  const [ counter, setCounter ] = useState(0);

  const increase = () => setCounter(counter + 1);
  const decrease = () => setCounter(counter - 1);
  const reset = () => setCounter(0);

  return (
    <div>
      <Display counter={counter} />
      <Button onClick={increase} text="increase"/>
      <Button onClick={reset} text="reset"/>
      <Button onClick={decrease} text="decrease"/>
    </div>      
  )
}

export default App