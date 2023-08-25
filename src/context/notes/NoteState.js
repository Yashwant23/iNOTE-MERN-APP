
import React, { useState } from 'react'
import NoteContext from './noteContext'



const NoteState = (props) => {
    const host = "http://localhost:5000"

    const [notes, setNotes] = useState([{}])
    const getNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchallnotes`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                }
            })
        const json = await response.json()
        console.log(json)
        setNotes(json)
    }


    // Add Note
    const addNote = async (title, description, tag) => {
        // console.log({ title, description, tag })


        const response = await fetch(`${host}/api/notes/addnote`,
            {
                method: 'POST',
                body: JSON.stringify({ title, description, tag }),
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },

            })
        const json = await response.json()
        // console.log(json)
        const note = {
            "_id": "64db4564c78322666601658d54c83fb",
            "title": title,
            "description": description,
            "tag": tag,
            "timestamp": "2023-08-15T09:33:00.852Z",
            "userId": "64d8bb73239dcb82185001ce",
            "__v": 0
        }
        setNotes(notes.concat(note));
    }

    //Delete Note 
    const deleteNote = async (id) => {
        const newNote = notes.filter((note) => {
            return note._id !== id
        })
        setNotes(newNote)
        await fetch(`${host}/api/notes/deletenote/${id}`,
            {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'auth-token': localStorage.getItem('token')
                }

            })
    }


    const editNote = async (id, title, description, tag) => {

        console.log(title, description, tag)
        const response = await fetch(`${host}/api/notes/updatenote/${id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify({ title, description, tag })
            })
        const json = await response.json()
        // console.log(json)
        let newNotes = []
        for (var i = 0; i < notes.length; i++) {
            const e = notes[i];
            if (e._id === id) {
                e.title = title
                e.description = description
                e.tag = tag

            }
            newNotes.push(e)
        }
        setNotes(newNotes)
    }



    return (

        <NoteContext.Provider value={{ notes, getNotes, addNote, deleteNote, editNote }}>
            {props.children}
        </NoteContext.Provider>

    )

}

export default NoteState
