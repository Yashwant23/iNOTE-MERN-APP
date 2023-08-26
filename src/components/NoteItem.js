import React, { useContext } from 'react'
import noteContext from './../context/notes/noteContext';

const NoteItem = (props) => {
    const { note, update } = props
    // console.log(note)
    const { deleteNote, editNote } = useContext(noteContext)
    return (

        <div className="card mx-3 my-2 border border-success shadow " style={{ width: '18rem' }}>
            <div className="card-body">
                <div className='d-flex'>
                    <h5 className="card-title span">{note.title} </h5>
                </div>
                <p className="card-text">{note.description}</p>
                <i className="fa-regular fa-pen-to-square mx-3 fa-xl zoom " onClick={() => { update(note) }}></i>
                <i className="fa-regular fa-trash-can mx-3 fa-xl zoom" onClick={() => { deleteNote(note._id) }}></i>
            </div>
        </div>


    )
}

export default NoteItem
