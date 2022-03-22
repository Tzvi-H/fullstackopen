import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newPerson, setNewPerson] = useState('')

  const handlePersonChange = event => {
    setNewPerson(event.target.value);
  }

  const addPerson = event => {
    event.preventDefault();
    const newPersonObject = {
      name: newPerson
    };
    setPersons(persons.concat(newPersonObject))
    setNewPerson('');
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newPerson} onChange={handlePersonChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person => (
          <p key={person.name}>{person.name}</p>
        ))}
      </div>
    </div>
  )
}

export default App