import { useState, useEffect } from 'react';
import Note from './components/Note';
import noteService from './services/notes';

const App = (props) => {
  const [ notes, setNotes ] = useState([]);
  const [ newNote, setNewNote ] = useState('');
  const [ showAll, setShowAll ] = useState(true);

  useEffect(() => {
    noteService
      .getAll()
      .then(data => {
        setNotes(data);
      })
  }, []);

  const notesToShow = showAll 
    ? notes
    : notes.filter(note => note.important);

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id);
    const changedNote = {...note, important: !note.important};

    noteService
      .update(id, changedNote)
      .then(data => {
        setNotes(notes.map(n => n.id !== id ? n : data));
      })
      .catch(error => {
        alert(`the note '${note.content}' was already deleted from server`)  
        setNotes(notes.filter(n => n.id !== id));
      })
  }

  const addNote = event => {
    event.preventDefault();

    const newNoteObject = {
      content: newNote,
      date: new Date(),
      important: Math.random() < 0.5,
    }

    noteService
      .create(newNoteObject)
      .then(data => {
        setNotes(notes.concat(data));
        setNewNote('');
      })
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
        { notesToShow.map(note => <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />) }
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}/>
        <button type="submit">save</button>
      </form> 
    </div>
  )
}

export default App