import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Login() {

    let navigate = useNavigate();
  const [user, setUser] = useState({
    username: "", password: ""
  });

  let name, value;

  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const PostData = async (e) => {
    e.preventDefault();

    const { username, password } = user;

    if (!username || !password) {
      window.alert("Please fill all the fields properly");
      navigate("/login");
    }
    else {

      const res = await fetch("http://localhost:5000/clg/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          username, password
        })
      });

      const data = await res.json();

      if (res.status === 401) {
        window.alert("Incorrect username or password");
        navigate('/login');
      }
      else if (res.status === 200) {
        window.alert("Login Successful!");
        navigate('/Home');
      }
      else if (res.status === 201) {
        window.alert("Admin login Successful!");
        navigate('/adminhome');
      }
    }
  }


  return (
    <>
    
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ "backgroundImage": "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')", backgroundPosition: "center", backgroundSize: 'cover' }}>
        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1" style={{ backgroundColor: 'white' }}>

          <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Login</p>

          <form method="post" className="mx-1 mx-md-4">

            <div className="d-flex flex-row align-items-center mb-4">
              <i className="fas fa-key fa-lg me-3 fa-fw"></i>
              <div className="form-outline flex-fill mb-0">
                <input type="text" id="username" className="form-control" name="username" value={user.username} onChange={handleInputs} />
                <label className="form-label" htmlFor="username">Your Username</label>
              </div>
            </div>

            <div className="d-flex flex-row align-items-center mb-4">
              <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
              <div className="form-outline flex-fill mb-0">
                <input type="password" id="password" className="form-control" name="password" value={user.password} onChange={handleInputs} />
                <label className="form-label" htmlFor="password">Password</label>
              </div>
            </div>



            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
              <button type="button" className="btn btn-clr btn-primary btn-lg" onClick={PostData}>Login</button>
            </div>

          </form>

        </div>

      </div>
    
    </>
  )
}
