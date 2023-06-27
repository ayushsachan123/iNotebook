import React,{useState} from "react";
import { useNavigate } from "react-router-dom";

export default function Signup(props) {

  const [credentials, setCredentials] = useState({name:"",email:"",password:"",cpassword:""})
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ5MmQyNjQxNjJhMzEzNzcyM2JjYWQyIn0sImlhdCI6MTY4NzM0MzkyMn0.9EOAn2B2uk4H21fUs9WCtBYIYBUrIRyJ1P5UoEh1Vo4",
      },
    body:JSON.stringify({ name:credentials.name, email: credentials.email,password: credentials.password})
    });
    const json = await response.json();
    console.log(json);
    if(json.success){
        //save the auth token and redirect
        localStorage.setItem("token",json.authtoken);
        navigate('/');
        props.showAlert("Account Created Successfully","success");
    }
    else{
        props.showAlert("Invalid Credentials","danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-2">
    <h2 className="my-2">Create an account to use iNotebook</h2>
      <form onSubmit={handleSubmit}>
      <div className="form-group my-3">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name" 
            name="name"
            onChange={onChange}
            aria-describedby="emailHelp"
            placeholder="Enter Name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email" 
            name="email"
            onChange={onChange}
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password" 
            name="password"
            onChange={onChange}
            minLength={5} required
            placeholder="Confirm Password"
          />
        </div>
        <div className="form-group">
          <label htmlFor="cpassword">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="cpassword" 
            name="cpassword"
            onChange={onChange} 
            minLength={5} required
            placeholder="Password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
