import React, { useContext, useState } from "react"
import noteContext from "../context/notes/noteContext"

const Modal = (props) => {
    const { addNote } = useContext(noteContext)
    const [note, setNote] = useState({ title: " ", description: " ", tag: " " })
    const { ref } = props
    const onChange = (e) => {
        // console.log({ [e.target.name]: [e.target.value] })
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const handleClick = (e) => {
        e.preventDefault()
        addNote(note.title, note.description, note.tag)
    }
    return (
        <div>
            {/* Button trigger modal */}
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" ref={ref} data-bs-target="#exampleModal">
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
                                        <input type="text" className="form-control" id="title" name="title" placeholder="My-Note-Title" onChange={onChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="description" className="form-label mx-1">Description</label>
                                        <textarea className="form-control" id="description" rows={3} defaultValue={""} name="description" onChange={onChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="tag" className="form-label mx-1">Tag</label>
                                        <input type="text" className="form-control" id="tag" rows={3} defaultValue={""} name="tag" onChange={onChange} />
                                    </div>
                                    <button type="Submit" className="btn btn-primary my-2" onClick={handleClick}>Add Notes</button>
                                </form>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Modal
