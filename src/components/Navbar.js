import React,{useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

const Navbar = () => {
let location = useLocation();
// useEffect(() => {
  // console.log(location.pathname);
// }, [location]);
let navigate = useNavigate();

const handleLogout = () =>{
  localStorage.removeItem('token');
  navigate("/login")
}

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        iNotebook
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className={`nav-item ${location.pathname === "/"? "active" : ""}`}>
            <Link className="nav-link" to="/">
              Home <span className="sr-only">(current)</span>
            </Link>
          </li>
          <li className={`nav-item ${location.pathname === "/about"? "active" : ""}`}>
            <Link className="nav-link" to="/about">
              About
            </Link>
          </li>
        </ul>
        {!localStorage.getItem('token') ? <form className="d-flex form-inline my-2 my-lg-0">
      <Link className="btn btn-primary btn-lg active mx-1" to ="/login" role="button" aria-pressed="true">Login</Link>
      <Link className="btn btn-primary btn-lg active mx-1" to ="/signup" role="button" aria-pressed="true">Signup</Link>
      </form>: <button onClick={handleLogout} className= "btn btn-primary mx-1">Logout</button>}
      </div>
    </nav>
  );
};

export default Navbar;
