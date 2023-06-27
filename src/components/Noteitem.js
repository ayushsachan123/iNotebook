import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

export default function Noteitem(props) {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;
  const handleClick = () =>{
    deleteNote(note._id)
    props.showAlert("Deleted Successfully","success");
  }
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex align-item-center">
            <h5 className="card-title">{note.title}</h5>
            <i
              className="fa-solid fa-trash mx-2"
              onClick={handleClick }
            ></i>
            {/* Write arraow function on onClick bcz we are passing an argument  */}
            <i
              className="fa-solid fa-pen-to-square mx-2"
              onClick={() => updateNote(note)}
            ></i>
          </div>
          <p className="card-text"> {note.description}</p>
        </div>
      </div>
    </div>
  );
}
