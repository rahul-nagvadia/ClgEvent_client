import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from './Layout';

const AddParticipate = () => {
  const { eventId } = useParams();
  const [players, setPlayers] = useState(0);
  const [participants, setParticipants] = useState(Array.from({ length: players }, () => ({ name: '', email: '' })));

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/clg/getEventDetails/${eventId}`, {
          method: 'POST',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch event details');
        }

        const data = await response.json();
        setPlayers(data.players);
      } catch (error) {
        console.error('Error fetching event details:', error.message);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  useEffect(() => {
    // Update participants array when the number of players changes
    setParticipants(Array.from({ length: players }, () => ({ name: '', email: '' })));
    // console.log("hj")
  }, [players]);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    setParticipants((prevParticipants) => {
      const updatedParticipants = [...prevParticipants];
      updatedParticipants[index] = {
        ...updatedParticipants[index],
        [name]: value,
      };
      return updatedParticipants;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic to handle the submission of the participant data
    console.log('Participants Data:', participants);
    // Reset the form after submission
    setParticipants(Array.from({ length: players }, () => ({ name: '', email: '' })));
  };

  return (
    <Layout>
    <div className="container mt-4">
      <h2>Add Participants</h2>
      <form onSubmit={handleSubmit}>
        {participants.map((participant, index) => (
          <div key={index} className="row mb-3">
            <div className="col-md-6">
              <label htmlFor={`name${index}`} className="form-label">
                Name{index + 1}
              </label>
              <input
                type="text"
                className="form-control"
                id={`name${index}`}
                name={`name${index}`}
                value={participant.name}
                onChange={(e) => handleChange(e, index)}
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor={`email${index}`} className="form-label">
                Email{index + 1}
              </label>
              <input
                type="email"
                className="form-control"
                id={`email${index}`}
                name={`email${index}`}
                value={participant.email}
                onChange={(e) => handleChange(e, index)}
                required
              />
            </div>
          </div>
        ))}
        <button type="submit" className="btn btn-primary">
          Add Participants
        </button>
      </form>
    </div>
    </Layout>
  );
};

export default AddParticipate;
