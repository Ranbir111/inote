import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';

const NoteItem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote, showAlert } = props;
    const { title, description } = note;
    return (
        <div className="card mx-3 my-3 col-md-3">
            <div className="card-body d-flex justify-content-between">
                <div>
                    <h5 className="card-title" style={{ textDecoration: "none" }}>{title.slice(0, 25)}</h5>
                    <p className="card-text" style={{ textDecoration: "none", filter: "blur(4px)" }}>{description.slice(0, 150) + "..."}</p>
                </div>
                <div className='my-2 d-flex flex-column justify-content-between'>
                    <i className="fa-solid mb-3 fa-file-pen text-warning" onClick={() => { updateNote(note) }} />
                    <i className="fa-solid mt-3 fa-trash text-danger" onClick={() => {
                        deleteNote(note._id);
                        showAlert("Note Deleted Successfully", "success");
                    }} />
                </div>
            </div>
        </div>
    )
}

export default NoteItem
