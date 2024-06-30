import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';

function AddNote(props) {
    const { showAlert } = props;
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "General" });

    const handleClick = () => {
        addNote(note.title, note.description, note.tag);
        // clearing text in input field
        showAlert("New note added successfully","success");
        setNote({ title: "", description: "", tag: "General" });
    }
    const handleChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>
            <h1>Add a Note</h1>
            <div className='my-3'>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Title</span>
                    <input type="text" className="form-control" minLength={3} id='title' name='title' aria-label="Username" aria-describedby="basic-addon1" onChange={handleChange} value={note.title} required />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">Description</span>
                    <textarea className="form-control" minLength={5} value={note.description} id='description' name='description' aria-label="With textarea" onChange={handleChange} required></textarea>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Tag</span>
                    <input type="text" className="form-control" id='tag' maxLength={10} name='tag' aria-label="Username" aria-describedby="basic-addon1" onChange={handleChange} value={note.tag} />
                </div>
                <button disabled={note.title.length < 3 || note.description.length < 5} onClick={handleClick} type="submit" className="btn btn-primary">Add Note</button>
            </div>
        </>
    )
}

export default AddNote
