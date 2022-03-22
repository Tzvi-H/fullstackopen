import Person from './Person';

const Persons = ({ personsToShow }) => (
  <table>
    <tbody>
      {personsToShow.map(person => (
        <Person  key={person.name} person={person} />
      ))}
    </tbody>
  </table>
)

export default Persons;