import { useState, useEffect } from 'react';

import Note from './components/Note';
import Footer from './components/Footer';
import Notification from './components/Notification';
import noteService from './services/notes';

const App = (props) => {
  const [ notes, setNotes ] = useState([]);
  const [ newNote, setNewNote ] = useState('');
  const [ showAll, setShowAll ] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null)

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
        setErrorMessage(`Note '${note.content}' was already removed from server`)
        setTimeout(() => setErrorMessage(null), 5000);
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
      <Notification message={errorMessage} />
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
      <Footer />
    </div>
  )
}

export default App