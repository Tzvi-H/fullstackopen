import Person from './Person';

const Persons = ({ personsToShow, deletePerson }) => (
  <table>
    <tbody>
      {personsToShow.map(person => (
        <Person  key={person.name} person={person} handleDelete={() => deletePerson(person.id)} />
      ))}
    </tbody>
  </table>
)

export default Persons;