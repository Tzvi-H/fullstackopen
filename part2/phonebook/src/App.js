import { useState, useEffect } from 'react';
import personService from './services/persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import NotificationError from './components/NotificationError';
import NotificationSuccess from './components/NotificationSuccess';

let timeout;

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

  const updatePerson = person => {
    if (!window.confirm(`${person.name} is already added to the phonebook, replace the old number with a new one?`)) return;
      
    const newPersonObject = {...person, number: newNumber};

    personService
      .updatePerson(newPersonObject.id, newPersonObject)
      .then(returnedPerson => {
        setPersons(persons.map(p => p.id !== returnedPerson.id ? p : returnedPerson))
        setNewPerson('');
        setNewNumber('');
        clearTimeout(timeout);
        setSuccessMessage(`Update number for ${returnedPerson.name}`);
        timeout = setTimeout(() => setSuccessMessage(null), 3000);
      })
      .catch(error => {
        clearTimeout(timeout)
        setErrorMessage(error.response.data.error);
        timeout = setTimeout(() => setErrorMessage(null), 3000);
      })
  }

  const addPerson = event => {
    event.preventDefault();

    const existingPerson = persons.find(person => person.name === newPerson);
    if (existingPerson) {
      updatePerson(existingPerson);
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
        clearTimeout(timeout);
        setSuccessMessage(`Added ${returnedPerson.name}`);
        timeout = setTimeout(() => setSuccessMessage(null), 3000);
      })
      .catch(error => {
        clearTimeout(timeout)
        setErrorMessage(error.response.data.error);
        timeout = setTimeout(() => setErrorMessage(null), 3000);
      })
  }

  const deletePerson = (id, name) => {
    if  (!window.confirm(`Delete ${name} ?`)) return;

    personService
      .deletePerson(id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== id));
        clearTimeout(timeout)
        setSuccessMessage(`Deleted ${name}`);
        timeout = setTimeout(() => setSuccessMessage(null), 3000);
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