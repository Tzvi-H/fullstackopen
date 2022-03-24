import { useState, useEffect } from 'react';
import axios from 'axios';
import Note from './components/Note';

const App = (props) => {
  const [ notes, setNotes ] = useState([]);
  const [ newNote, setNewNote ] = useState('');
  const [ showAll, setShowAll ] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:3001/notes')
      .then(({ data }) => {
        setNotes(data);
      })
  }, []);

  const notesToShow = showAll 
    ? notes
    : notes.filter(note => note.important);

  const addNote = event => {
    event.preventDefault();

    const newNoteObject = {
      id: notes.length + 1,
      content: newNote,
      date: new Date().toISOString,
      important: Math.random() < 0.5,
    }
    setNotes(notes.concat(newNoteObject));
    setNewNote('');
  }

  const handleNoteChange = event => {
    setNewNote(event.target.value);
  }

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        { notesToShow.map(note => <Note key={note.id} note={note} />) }
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}/>
        <button type="submit">save</button>
      </form> 
    </div>
  )
}

export default App