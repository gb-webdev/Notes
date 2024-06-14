import React, { useState } from 'react'
import './App.css'

type Note = {
  id: number;
  title: string;
  content: string;
}

const App = () => {

  const [notes, setNotes] = useState<
    Note[]
  >([
    {
      id: 1,
      title: 'note title 1',
      content: 'content text 1'
    },
    {
      id: 2,
      title: 'note title 2',
      content: 'content text 2'
    },
    {
      id: 3,
      title: 'note title 3',
      content: 'content text 3'
    },
    {
      id: 4,
      title: 'note title 4',
      content: 'content text 4'
    }

  ])

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handleSubmit = (
    event: React.FormEvent
  ) => {
    event.preventDefault()
    console.log('title: ', title)
    console.log('content: ', content)

    const newNote: Note = {
      id: notes.length + 1,
      title: title,
      content: content
    }

    setNotes([newNote, ...notes])
    setTitle('')
    setContent('')
  }

  return (
    <div className="app-container">
      <form
        className='note-form'
        onSubmit={(event) => handleSubmit(event)}
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
        <button type='submit'>Add Note</button>
      </form>
      <div className='note-grid'>
        {notes.map((note) => (
        <div className='note-item'>
          <div className='notes-header'>
            <button>X</button>
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
