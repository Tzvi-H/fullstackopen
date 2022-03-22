import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newPerson, setNewPerson] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('');

  const personsToShow = filter === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()));

  const handlePersonChange = event => {
    setNewPerson(event.target.value);
  }

  const handleNumberChange = event => {
    setNewNumber(event.target.value);
  }

  const handleFilterChange = event => {
    setFilter(event.target.value);
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
      <div>
        <p>
          filter shown with <input onChange={handleFilterChange}/>
        </p>
      </div>
      <form onSubmit={addPerson}>
        <div>name: <input value={newPerson} onChange={handlePersonChange}/></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      <table>
        <tbody>
        {personsToShow.map(person => (
          <tr key={person.name}>
            <td>{person.name}</td> 
            <td>{person.number}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}

export default App