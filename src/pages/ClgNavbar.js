import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import '../styles/ClgNavbar.css';

const OrganizerNavbar = ({ orgClgId }) => {
  const navigate = useNavigate();
  const eventId = useParams();
  const location = useLocation();
  const [isOrgClg, setOrgClg] = useState(false);

  const [isLogin, setIsLogin] = useState(false);
  const [id, setId] = useState();
  const [uname, setUname] = useState();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");

    if (authToken) {
      setIsLogin(true);
      try {
        const decodedToken = jwtDecode(authToken);
        setId(decodedToken.user.id);
        setUname(decodedToken.user.username);
        if (id == orgClgId) {
          setOrgClg(true);
        }

      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [id, orgClgId]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
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
                <NavLink to='/Home/add-event' className='nav-link' activeClassName='active'>
                  Add Event
                </NavLink>
              </li>
            )}
            <li className="nav-item">
              <NavLink to='/Home/all-events' className='nav-link' activeClassName='active'>
                All Events
              </NavLink>
            </li>
            {!isLogin ? (
              <li className="nav-item">
                <NavLink to='/login' className='nav-link' activeClassName='active'>
                  Login
                </NavLink>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink to='/Home/schedule' className='nav-link' activeClassName='active'>
                    Schedule
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to='/Home/userProfile' className='nav-link' activeClassName='active'>
                    Update Profile
                  </NavLink>
                </li>
                <li className="nav-item">
                  <button className="btn btn-link nav-link" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default OrganizerNavbar;
