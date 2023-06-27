import React, { useContext,useState } from 'react'
import noteContext from "../context/notes/noteContext";

export default function AddNote(props) {

    const context = useContext(noteContext);
    const {addNote} = context;
   
    const [note, setNote] = useState({title:"",description:"",tag:""})

  const handleClick=(e)=>{
    //It helps to not reload the page
    e.preventDefault();
     addNote(note.title,note.description,note.tag)
     setNote({title:"",description:"",tag:""})
     props.showAlert("Added Successfully","success");
  }

  const onChange = (e) =>{
    // ...note means that the value it has should be there and new value after it is can be added or overwrite
       setNote({...note,[e.target.name]:e.target.value})
  }

  return (
    <div>
       <div className="container my-3">
        <h1>Add a note</h1>
        <form>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control" value={note.title}
              id="title"
              name="title"
              aria-describedby="emailHelp"
              placeholder="Enter Title"
              onChange={onChange} minLength={5} required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control" value={note.description}
              id="description"
              name="description"
              placeholder="Enter Description"
              onChange={onChange} minLength={5} required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="tag">Tag</label>
            <input
              type="text"
              className="form-control" value={note.tag}
              id="tag"
              name="tag"
              placeholder="Enter Tag"
              onChange={onChange} minLength={5} required
            />
          </div>
          <button disabled={note.title.length < 5 || note.title.length < 5} type="submit" className="btn btn-primary" onClick={handleClick}>
            Add Note
          </button>
        </form>
      </div>
    </div>
  )
}
