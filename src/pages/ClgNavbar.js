import React from 'react';
import { useNavigate } from 'react-router-dom';

const OrganizerNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  const handleAddEvent = () => {
    navigate('/Home/add-event');
  };

  const handleAllEvents = () => {
    navigate('/Home/all-events');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">Your Logo</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto"> 
            <li className="nav-item">
              <button className="btn btn-link nav-link" onClick={handleAddEvent}>Add Event</button>
            </li>
            <li className="nav-item">
              <button className="btn btn-link nav-link" onClick={handleAllEvents}>All Events</button>
            </li>
            <li className="nav-item">
              <button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default OrganizerNavbar;
