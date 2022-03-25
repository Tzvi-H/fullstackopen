import { useState, useEffect } from 'react';
import personService from './services/persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import NotificationError from './components/NotificationError';
import NotificationSuccess from './components/NotificationSuccess';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

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

    const existingPerson = persons.find(person => person.name === newPerson);
    if (existingPerson) {
      if (!window.confirm(`${newPerson} is already added to the phonebook, replace the old number with a new one?`)) return;
      
      const newPersonObject = {...existingPerson, number: newNumber};
  
      personService
        .updatePerson(existingPerson.id, newPersonObject)
        .then(returnedPerson => {
          setPersons(persons.map(p => p.id !== returnedPerson.id ? p : returnedPerson))
          setNewPerson('');
          setNewNumber('');
          setSuccessMessage(`Update number for ${returnedPerson.name}`);
          setTimeout(() => setSuccessMessage(null), 3000);
        })
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
        setSuccessMessage(`Added ${returnedPerson.name}`);
        setTimeout(() => setSuccessMessage(null), 3000);
      })
  }

  const deletePerson = (id, name) => {
    if  (!window.confirm(`Delete ${name} ?`)) return;

    personService
      .deletePerson(id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== id));
        setSuccessMessage(`Deleted ${name}`);
        setTimeout(() => setSuccessMessage(null), 3000);
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <NotificationSuccess message={successMessage}/>
      <NotificationError message={errorMessage}/>

      <Filter handleFilterChange={handleFilterChange}/>

      <h3>Add a new</h3>
      <PersonForm newPerson={newPerson} newNumber={newNumber} addPerson={addPerson} handlePersonChange={handlePersonChange} handleNumberChange={handleNumberChange}/>

      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson}/>
    </div>
  )
}

export default App