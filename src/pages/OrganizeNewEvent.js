import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from './AdminNavbar'


export default function OrganizeNewEvent() {
    const [colleges, setColleges] = useState([]);
    const [selectedCollege, setSelectedCollege] = useState(null);
    const [organizingCollege, setOrganizingCollege] = useState(null);
    const navigate = useNavigate();
    const currentYear = new Date().getFullYear();
    const [checkClgDone, setCheckClgDone] = useState(false);
    const [loading, setLoading] = useState(true);

    const handleCollegeSelect = (collegeId) => {
      setSelectedCollege(collegeId);
    };
    useEffect(() => {
      const checkOrganizingCollege = async () => {
        try {
          const response = await fetch(`http://localhost:5000/admin/getOrganizingCollege/${currentYear}`, {
            method: 'POST',
          });
          const data = await response.json();
    
          if (response.ok) {
            if (data.organizingclg) {
              setOrganizingCollege(data.organizingclg);
            } else {
              setOrganizingCollege(null); // Clear organizingCollege if no college is organizing
            }
          } else {
            // Handle non-OK status (e.g., 404)
            console.error('Error checking organizing college:', data.message || 'Unknown error');
            setOrganizingCollege(null);
          }
    
          setCheckClgDone(true);
          setLoading(false);
        } catch (error) {
          console.error('Error checking organizing college:', error);
        }
      };
    
      const fetchColleges = async () => {
        try {
          const response = await fetch('http://localhost:5000/clg/getAllColleges', {
            method: 'POST',
          });
          const data = await response.json();
          setColleges(data);
        } catch (error) {
          console.error('Error fetching colleges:', error);
        }
      };
    
      checkOrganizingCollege();
      fetchColleges(); // Move this line outside of the if (checkClgDone) condition
    
    }, [currentYear]);
  
    const handleOrganize = async () => {
      if (!selectedCollege) {
        window.alert('Please select a college to organize the event.');
        return;
      }
  
      try {
        const response = await fetch(`http://localhost:5000/admin/organizeEvent/${selectedCollege}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            date: new Date().getFullYear(),
          }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          window.alert(`Event organized by ${data.organizingclg.clg.clg_name}`);
          navigate('/adminhome');
        } else {
          window.alert(`Error organizing event: ${data.error || 'Unknown error'}`);
        }
      } catch (error) {
        console.error('Error organizing event:', error);
        window.alert('An unexpected error occurred while organizing the event.');
      }
    };
  
    return (
      <div>
      <AdminNavbar></AdminNavbar>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {organizingCollege ? (
            <div>
              <h1>{`Event organized by ${organizingCollege.clg.clg_name} in year ${currentYear}`} </h1>
              {/* Additional details or actions for an ongoing event */}
            </div>
          ) : (
            <div>
              <h1>{`Choose College to Organize Event for ${currentYear}`}</h1>
              {/* College selection buttons */}
              <ul>
                {colleges.map((college) => (
                  <li key={college._id}>
                    <div>
                      <strong>College Name:</strong> {college.clg_name}<br />
                      <strong>City:</strong> {college.city}<br />
                      <strong>Email:</strong> {college.email}<br />
                      <strong>Mobile Number:</strong> {college.mobile_no}<br />
                    </div>
                    <button onClick={() => handleCollegeSelect(college._id)}>Select</button>
                  </li>
                ))}
              </ul>
              <button onClick={handleOrganize}>Organize Event</button>
            </div>
          )}
        </>
      )}
    </div>
    );
}
