import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const host = process.env.REACT_APP_API_URL;

    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(false);

    const getAllNotes = () => {
        setLoading(true);
        //Api call to fetch all notes
        let url = host + "/api/notes/fetchallnotes";
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                setLoading(false);
                setNotes(data)
            })
            .catch((err) => { console.error(err) })
    }

    //Add note
    const addNote = (title, description, tag) => {
        setLoading(true);
        //Api call
        let json = null;
        let url = host + "/api/notes/addnote";
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        })
            .then((response) => { return response.json() })
            .then((data) => {
                json = data;
                setLoading(false);
                getAllNotes();
            })
            .catch((err) => {
                setLoading(false);
                alert("Got some error!")
                console.error(err)
            })
    }

    //delete note
    const deleteNote = (id) => {
        setLoading(true);
        //Api call to delete a note
        let json = null;
        let url = host + "/api/notes/deletenote/" + id;
        let txt = prompt("Write 'delete' to delete the note!");
        if (txt == "delete" || txt == "Delete") {
            fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                }
            })
                .then((response) => { return response.json() })
                .then((data) => {
                    json = data;
                    setLoading(false);
                    getAllNotes();
                })
                .catch((err) => { console.error(err) })
        } else {
            setLoading(false);
        }

        // const newNotes = notes.filter((note) => { return note._id !== id });
        // setNotes(newNotes);
    }

    //Update note
    const editNote = (id, title, description, tag) => {
        setLoading(true);
        //Api call
        let json = null;
        let url = host + "/api/notes/updatenote/" + id;
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        })
            .then((response) => { return response.json() })
            .then((data) => {
                json = data;
                setLoading(false);
                getAllNotes();
            })
            .catch((err) => {
                setLoading(false);
                alert("Got some error!");
                console.error(err)
            })
    }

    //Get note by Id
    const getNoteById = (id) => {
        // console.log(notes.find(note => note._id === id));
        var result = notes.find(note => {
            return note._id === id
        })
        // console.log(result);
        return result;
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getAllNotes, getNoteById, loading }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;