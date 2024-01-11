import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Layout from './Layout';
import '../styles/eventdetails.css';

const EventDetails = () => {
    const { eventId } = useParams();
    const [eventDetails, setEventDetails] = useState({});

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
                setEventDetails(data);
            } catch (error) {
                console.error('Error fetching event details:', error.message);
            }
        };

        fetchEventDetails();
    }, [eventId]);

    if (!eventDetails.event_name) {
        return <p>Loading event details...</p>;
    }

    function formatDate(inputDate) {
        const date = new Date(inputDate);
        const day = date.getDate();
        const month = date.getMonth() + 1; // Months are zero-based
        const year = date.getFullYear();

        // Pad single-digit day or month with a leading zero
        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;

        return `${formattedDay}-${formattedMonth}-${year}`;
    }

    return (
        <Layout>
            <div className="event-details-container">
                <div className="event-details">
                    <h2>{eventDetails.event_name}</h2>
                    <img
                        src={eventDetails.img_url}
                        alt={eventDetails.event_name}
                        className="event-image"
                    />
                    <h3>No. of Players</h3>
                    <p>{eventDetails.players}</p>
                    <h3>Venue</h3>
                    <p>{eventDetails.venue}</p>
                    <h3>Event Description</h3>
                    <p>{eventDetails.event_desc}</p>
                    <h3>Event Date</h3>
                    <p>{formatDate(eventDetails.event_date)}</p>
                    <h3>Final Date of Registration</h3>
                    <p>{formatDate(eventDetails.reg_date)}</p>

                    <div className="action-buttons">
                        <Link to="addParticipant" state={{ players: eventDetails.players }} className="participate-button">
                            Participate
                        </Link>
                        <Link
                            to="participatedclg"
                            state={{ event: eventDetails }}
                            className="participated-college-button"
                        >
                            Participated College
                        </Link>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default EventDetails;
