import { useState, useEffect } from 'react';
import Layout from './Layout';

function Schedule() {
    const [events, setEvents] = useState([]);
    const [participatingColleges, setParticipatingColleges] = useState('');
    const [loading, setLoading] = useState(true);
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('http://localhost:5000/clg/getAllEvents', {
                    method: 'POST',
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch events');
                }
                const data = await response.json();
                setEvents(data);
            } catch (error) {
                console.error('Error fetching events:', error.message);
            }
        };

        fetchEvents();
    }, []);

    const fetchParticipatingColleges = async (eventId) => {
        try {
            const response = await fetch(`http://localhost:5000/clg/getParticipatedclg/${eventId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch participating colleges');
            }
            const res = await response.json();
            const colleges = res.participatingColleges.map(college => college.clg_name).join(', ');
            setParticipatingColleges(colleges);
            setLoading(false);

        } catch (error) {
            console.error('Error fetching participating colleges:', error.message);
        }
    };

    const handleEventClick = (event) => {
        setSelectedEvent(event);
        fetchParticipatingColleges(event._id);
    };

    return (
        <Layout>
            <div>
                <div>
                    {events.map((event) => (
                        <button
                            key={event._id}
                            onClick={() => handleEventClick(event)}
                            style={{
                                backgroundColor: selectedEvent && selectedEvent._id === event._id ? 'green' : 'blue',
                                color: '#fff',
                                margin: '5px',
                                padding: '5px 10px',
                                cursor: 'pointer',
                            }}
                        >
                            {event.event_name}
                        </button>
                    ))}
                </div>
            </div>

            {selectedEvent && (
                <div>
                    <h2>{selectedEvent.event_name}</h2>
                    {loading ? (
                        <p>Loading participating colleges...</p>
                    ) : (
                        <p>Participating Colleges: {participatingColleges}</p>
                    )}
                </div>
            )}
        </Layout>
    );
}

export default Schedule;
