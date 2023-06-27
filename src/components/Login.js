import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
export default function Login(props) {

    const [credentials, setCredentials] = useState({email:"",password:""})
    const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ5MmQyNjQxNjJhMzEzNzcyM2JjYWQyIn0sImlhdCI6MTY4NzM0MzkyMn0.9EOAn2B2uk4H21fUs9WCtBYIYBUrIRyJ1P5UoEh1Vo4",
      },
    body:JSON.stringify({email: credentials.email,password: credentials.password})
    });
    const json = await response.json();
    console.log(json);
    if(json.success){
        //save the auth token and redirect
        localStorage.setItem("token",json.authtoken);
        props.showAlert("Logged in Successfully","success");
        navigate('/');
    }
    else{
      props.showAlert("Invalid Details","danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className = "mt-3">
    <h2>Login to continue to iNotebook</h2>
      <form  onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email" 
            value={credentials.email}
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
            value={credentials.password}
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
