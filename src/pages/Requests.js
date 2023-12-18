import React from 'react'
import { useState, useEffect } from 'react';
import AdminNavbar from './AdminNavbar';

export default function Requests() {
    const [requests, setRequests] = useState([]);

  useEffect(() => {
    
    fetch('http://localhost:5000/admin/getrequests',{
      method : 'POST',
    })
      .then(response => response.json())
      .then(data => setRequests(data))
      .catch(error => console.error('Error fetching requests:', error));
  }, []);

  const handleAccept = (requestId) => {
    
    fetch(`http://localhost:5000/admin/acceptRequest/${requestId}`,{
      method : 'POST',
    })
      .then(response => response.json())
      .then(data => {
        console.log('Request accepted:', data);
        window.location.reload()
      })
      .catch(error => console.error('Error accepting request:', error));
  };

  const handleDecline = (requestId) => {
    
    fetch(`http://localhost:5000/admin/declineRequest/${requestId}`)
      .then(response => response.json())
      .then(data => {
        console.log('Request declined:', data);
        window.location.reload()
      })
      .catch(error => console.error('Error declining request:', error));
  };
  return (
    <div>
        <AdminNavbar></AdminNavbar>
        <ul>
        {requests.map(request => (
          <li key={request._id}>
            <div>
              <strong>Username:</strong> {request.username}<br />
              <strong>College Name:</strong> {request.clg_name}<br />
              <strong>City:</strong> {request.city}<br />
              <strong>Email:</strong> {request.email}<br />
              <strong>Mobile Number:</strong> {request.mobile_no}<br />
            </div>
            <button onClick={() => handleAccept(request._id)}>Accept</button>
            <button onClick={() => handleDecline(request._id)}>Decline</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
