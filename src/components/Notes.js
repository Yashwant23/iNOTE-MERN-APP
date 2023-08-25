import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from './../context/notes/noteContext';
import NoteItem from './NoteItem';
import { useNavigation } from 'react-router-dom';


const Notes = () => {
    const { notes, getNotes, editNote } = useContext(noteContext)
    useEffect(() => {
        if (localStorage.getItem('token'))
            getNotes()

    }, [])
    const [note, setNote] = useState({ _id: "", title: " ", description: " ", tag: " " })
    const ref = useRef()
    const refClose = useRef()
    const update = (curNote) => {
        ref.current.click()
        setNote(curNote)
    }


    const onChange = (e) => {

        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const handleClick = (e) => {

        editNote(note._id, note.title, note.description, note.tag)
        refClose.current.click()

    }



    return (
        <div className="row">
            <h2 className="my-2 text-center">Your Notes</h2>
            <div>
                {/* Button trigger modal */}
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" ref={ref} data-bs-target="#exampleModal" hidden>
                    Update
                </button>
                <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel"></h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                            </div>
                            <div className="modal-body">
                                <div>
                                    <form action="" method="post">
                                        <h2 className="text-center" >Update Note</h2>
                                        <div className="my-3">
                                            <label htmlFor="title" className="form-label mx-1">Note Title</label>
                                            <input type="text" className="form-control" id="title" name="title" placeholder="My-Note-Title" onChange={onChange} value={note.title} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="description" className="form-label mx-1">Description</label>
                                            <textarea className="form-control" id="description" rows={3} name="description" onChange={onChange} value={note.description} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="tag" className="form-label mx-1">Tag</label>
                                            <input type="text" className="form-control" id="tag" rows={3} name="tag" onChange={onChange} value={note.tag} />
                                        </div>

                                    </form>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button disabled={note.title.length < 5 || note.description.length < 5} type="button" className="btn btn-primary" onClick={handleClick}>Update changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>













            {notes.map((note) => {
                return <NoteItem key={note._id} update={update} note={note} />
            })}
        </div>
    )
}

export default Notes
