import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'

const AddNotes = () => {
    const { addNote } = useContext(noteContext)
    const [note, setNote] = useState({ title: " ", description: " ", tag: " " })
    const onChange = (e) => {
        // console.log({ [e.target.name]: [e.target.value] })
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const handleClick = (e) => {
        e.preventDefault()
        addNote(note.title, note.description, note.tag)
        setNote({ title: "", description: "", tag: "" })
    }
    return (
        <div>
            <form action="" method="post">
                <h2 className="text-center" >Add Note</h2>
                <div className="my-3">
                    <label htmlFor="title" className="form-label mx-1">Note Title</label>
                    <input type="text" className="form-control shadow-sm" id="title" name="title" placeholder="My-Note-Title" onChange={onChange} value={note.title} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label mx-1">Description</label>
                    <textarea className="form-control shadow-sm" id="description" rows={3} value={note.description} name="description" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label mx-1">Tag</label>
                    <input type="text" className="form-control shadow-sm" id="tag" rows={3} value={note.tag} name="tag" onChange={onChange} />
                </div>
                <button disabled={note.title.length < 5 || note.description.length < 5} type="Submit" className="btn btn-primary my-2" onClick={handleClick}>Add Notes</button>
            </form>
        </div>
    )
}

export default AddNotes
