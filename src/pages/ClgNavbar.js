import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';

import { Link, useNavigate, useParams } from 'react-router-dom';
import '../styles/ClgNavbar.css';



const OrganizerNavbar = ({ orgClgId }) => {
  const navigate = useNavigate();
  const eventId = useParams();
  const [isOrgClg, setOrgClg] = useState(false)

  const [isLogin, setIsLogin] = useState(false)
  const [id, setId] = useState()
  const [uname, setUname] = useState()

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");

    if (authToken) {
      setIsLogin(true)
      try {
        const decodedToken = jwtDecode(authToken);
        setId(decodedToken.user.id);
        setUname(decodedToken.user.username);
        // console.log(id)
        if (id == orgClgId) {
          setOrgClg(true);
        }

      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  });

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  const handleLogin = () => {
    navigate('/login');
  };
  const handleAddEvent = () => {
    navigate('/Home/add-event');
  };

  const handleAllEvents = () => {
    navigate('/Home/all-events');
  };
  const handleUpdateProfile = () => {
    navigate('/Home/userProfile');
  };


  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark text-light">
      <div className='container mx-1'>
        <Link to='/Home' className='navbar-brand'>Your Logo</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            {isLogin && isOrgClg && (
              <li className="nav-item">
                <button className="btn btn-link nav-link" onClick={handleAddEvent}>Add Event</button>
              </li>
            )}
            <li className="nav-item">
              <button className="btn btn-link nav-link" onClick={handleAllEvents}>All Events</button>
            </li>
            {!isLogin ? (
              <li className="nav-item">
                <button className="btn btn-link nav-link" onClick={handleLogin}>Login</button>
              </li>
            ) :
              (
                <>
                  
                  {/* <li>
                    <div className="dropdown mx-3">
                      <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                      {uname}
                      </button>
                      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{display : 'none',  position : "fixed"}}>
                        <Link className="dropdown-item"  style={{display : 'block'}} onClick={handleLogout}>Logout</Link>
                        <Link className="dropdown-item" style={{display : 'block'}} onClick={handleUpdateProfile}>Update Profile</Link>
                      </div>
                    </div>
                  </li> */}
                  <li className="nav-item">
                    <button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button>
                  </li>
                  <li className="nav-item">
                    <button className="btn btn-link nav-link" onClick={handleUpdateProfile}>Update Profile</button>
                  </li>
                </>
              )
            }
          </ul>
          
        </div>
      </div>
    </nav>
  );
};

export default OrganizerNavbar;
