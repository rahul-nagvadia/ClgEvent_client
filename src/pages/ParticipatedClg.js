import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Layout from './Layout';
import '../styles/participatedclg.css';

function ParticipatedClg() {
    const [events, setEvents] = useState([]);
    const obj = useParams();
    const eventId = obj.eventId;
    const navigate = useNavigate();
    const location = useLocation();
    const eventDetails = location.state && location.state.event;

    console.log(eventDetails);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch(`http://localhost:5000/clg/getParticipatedclg/${eventId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch events');
                }
                const data = await response.json();

                setEvents(data.participatingColleges);
            } catch (error) {
                console.error('Error fetching events:', error.message);
            }
        };

        fetchEvents();
    }, [eventId]);

    const handleClick = () => {
        navigate('showplayers');
    };

    return (
        <Layout>
            <div className="centered-container"> {/* Apply centering styles */}
                <h2>Participating Colleges</h2>
                <table>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>College Name</th>
                            <th>City</th>
                            <th>Players</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map((event, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{event.clg_name}</td>
                                <td>{event.city}</td>
                                <td>
                                    <button onClick={handleClick}>
                                        View Players
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
}

export default ParticipatedClg;
