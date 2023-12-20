import React from 'react'
import { Link, useNavigate } from "react-router-dom";
export default function AdminNavbar() {
  const navigate = useNavigate();


  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    navigate('/login');
  };

  const handleLogin = () => {

    navigate('/login');
  };
  const handleOrganize = () => {

    navigate('/organize');
  };

  const handleRequests = () => {

    navigate('/requests');
  };

  const handleHome = () => {

    navigate('/adminhome');
  };

  return (



    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">Your Logo</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">

              <li className="nav-item">
                <button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button>
              </li>
              <li className="nav-item">
                <button className="btn btn-link nav-link" onClick={handleHome}>Home</button>
              </li>
              <li className="nav-item">
                <button className="btn btn-link nav-link" onClick={handleRequests}>Requests</button>
              </li>
              <li className="nav-item">
                <button className="btn btn-link nav-link" onClick={handleOrganize}>Organize</button>
              </li>

            </ul>
          </div>
        </div>
      </nav>
    </div>

  )
}
