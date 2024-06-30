import React, { useContext, useState, useEffect, useRef } from 'react';
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';

const Notes = (props) => {
    const navigate = useNavigate();
    const { showAlert } = props;
    const context = useContext(noteContext);
    const { notes, getAllNotes, editNote, getNoteById, loading } = context;
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const [note, setNote] = useState({ title: "", description: "", tag: "" });
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getAllNotes();
        } else {
            navigate('/login');
        }
    }, [])

    const updateNote = (currentNote) => {
        ref1.current.click();
        setNote(currentNote);
    }

    const handleClose = () => {
        if(note === getNoteById(note._id)){
            ref1.current.click();
        }else{
            let confirmation = window.confirm("Your note will not be saved!\nAre you sure, You want to close?",);
            if(confirmation === true){
                ref1.current.click();
            }
        }
    }

    const handleClick = () => {
        editNote(note._id, note.title, note.description, note.tag);
        ref1.current.click();
        showAlert("Note Updated Successfully", "success");
    }

    const handleChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>
            <AddNote showAlert={showAlert} />
            <button type="button" className="btn d-none btn-primary" ref={ref1} data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-fullscreen">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">Title</span>
                                <input type="text" minLength={3} required className="form-control" id='title' name='title' aria-label="Username" aria-describedby="basic-addon1" value={note.title} onChange={handleChange} />
                            </div>
                            <div className="input-group">
                                <span className="input-group-text">Description</span>
                                <textarea className="form-control" minLength={5} required value={note.description} rows={18} id='description' name='description' aria-label="With textarea" onChange={handleChange}></textarea>
                            </div>
                            <div className="input-group mt-3">
                                <span className="input-group-text" id="basic-addon1">Tag</span>
                                <input type="text" className="form-control" value={note.tag} id='tag' maxLength={10} name='tag' aria-label="Username" aria-describedby="basic-addon1" onChange={handleChange} />
                            </div>
                            {/* <button onClick={handleClick} type="submit" className="btn btn-primary">Add Note</button> */}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" ref={ref2} onClick={handleClose}>Close</button>
                            <button disabled={note.title.length < 3 || note.description.length < 5} type="button" onClick={handleClick} className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3" style={{ display: "flex", justifyContent: "center" }}>
                <h1 className='text-center'>Your Notes</h1>
                {loading && <Spinner />}
                {notes.length === 0 && !loading && "No notes to display!"}
                {!loading && notes.map((note) => {
                    return <NoteItem key={note._id} showAlert={showAlert} updateNote={updateNote} note={note} />;
                })}
            </div>
        </>
    )
}

export default Notes
