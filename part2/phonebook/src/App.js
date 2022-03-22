import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ]) 
  const [newPerson, setNewPerson] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handlePersonChange = event => {
    setNewPerson(event.target.value);
  }

  const handleNumberChange = event => {
    setNewNumber(event.target.value);
  }

  const addPerson = event => {
    event.preventDefault();

    if (persons.some(person => person.name === newPerson)) {
      alert(`${newPerson} is already added to the phonebook`)
      return;
    }

    const newPersonObject = {
      name: newPerson,
      number: newNumber,
    };
    setPersons(persons.concat(newPersonObject))
    setNewPerson('');
    setNewNumber('');
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>name: <input value={newPerson} onChange={handlePersonChange}/></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person => (
          <p key={person.name}>{person.name} {person.number}</p>
        ))}
      </div>
    </div>
  )
}

export default App