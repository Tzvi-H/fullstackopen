const Person = ({ person, handleDelete }) => (
  <tr>
    <td>{person.name}</td>
    <td>{person.number}</td>
    <td><button onClick={handleDelete}>delete</button></td>
  </tr>
)

export default Person;