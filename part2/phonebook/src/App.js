import { useState, useEffect } from 'react';
import personService from './services/persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('');

  useEffect(() => {
    personService
      .getAll()
      .then(data => setPersons(data));
  }, []);

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

    personService
      .create(newPersonObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewPerson('');
        setNewNumber('');
      })
  }

  const deletePerson = id => {
    personService
      .deletePerson(id)
      .then(() => setPersons(persons.filter(p => p.id !== id)));
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter handleFilterChange={handleFilterChange}/>

      <h3>Add a new</h3>
      <PersonForm newPerson={newPerson} newNumber={newNumber} addPerson={addPerson} handlePersonChange={handlePersonChange} handleNumberChange={handleNumberChange}/>

      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson}/>
    </div>
  )
}

export default App