import React, { useEffect, useState } from 'react'
import './App.css'

type Note = {
  id: number;
  title: string;
  content: string;
}

const App = () => {

  const [notes, setNotes] = useState<
    Note[]>([])

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const [selectedNote, setSelectedNote] =
    useState<Note | null>(null)

    useEffect(() => {
      const fetchNotes = async () => {
        try {
          const response = 
            await fetch("http://localhost:5000/api/notes")

          const notes: Note[] = await response.json()

          setNotes(notes)
        } catch (e) {
          console.log(e)
        }
      }

      fetchNotes()
    }, [])

    const handleNoteClick = (note: Note) => {
      setSelectedNote(note)
      setTitle(note.title)
      setContent(note.content)
    }

  const handleAddNote = async (
    event: React.FormEvent
  ) => {
    event.preventDefault()
    try {

      const response =
        await fetch("http:localhost:5000/api/notes",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              title,
              content
            })
          }
        )

        const newNote = await response.json()

      setNotes([newNote, ...notes])
      setTitle('')
      setContent('')
    } catch (e) {
      console.log(e)
    }
  }

  const handleUpdateNote = (
    event: React.FormEvent
  ) => {
    event.preventDefault()

    if (!selectedNote){
      return
    }

    const updatedNote: Note = {
      id: selectedNote.id,
      title: title,
      content: content
    }

    const updatedNoteList = notes.map((note) => 
      note.id === selectedNote.id
      ? updatedNote
      : note
    )

    setNotes(updatedNoteList)
    setTitle('')
    setContent('')
    setSelectedNote(null)
  }

  const handleCancel = () => {
    setTitle('')
    setContent('')
  setSelectedNote(null)
  }

  const deleteNote = (
    event: React.MouseEvent,
    noteId: number
  ) => {
    event.stopPropagation()

    const updatedNotes = notes.filter(
      (note) => note.id !== noteId
    )

    setNotes(updatedNotes)
  }

  return (
    <div className="app-container">
      <form
        className='note-form'
        onSubmit={(event) =>
          selectedNote
            ? handleUpdateNote(event)
            : handleAddNote(event)
        }
      >
        <input
          value={title}
          onChange={(event) =>
            setTitle(event.target.value)
          }
          placeholder='Title'
          required
        ></input>
        <textarea
          value={content}
          onChange={(event) =>
            setContent(event.target.value)
          }
          placeholder='Content'
          rows={10}
          required
        ></textarea>

          {selectedNote ? (
            <div className='edit-buttons'>
              <button type='submit'>Save</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          ) : (
            <button type='submit'>Add Note</button>
          )}
      </form>
      <div className='notes-grid'>
        {notes.map((note) => (
        <div
          className='note-item'
          onClick={() => handleNoteClick(note)}
        >
          <div className='notes-header'>
            <button
              onClick={(event)=>
                deleteNote(event, note.id)
              }>
              X
            </button>
          </div>
          <h2>{note.title}</h2>
          <p>{note.content}</p>
        </div>
        ))}
      </div>
    </div>
  )
}

export default App
