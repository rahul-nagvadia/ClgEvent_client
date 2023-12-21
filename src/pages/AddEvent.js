import React, { useState, useRef } from 'react';
import Layout from './Layout';
import '../styles/addevent.css';

const AddEventForm = () => {

    const [eventData, setEventData] = useState({
        event_name: '',
        players: 0,
        venue: '',
        event_desc: '',
        event_date: '',
        reg_date: '',
        img_url: '',
    });

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setEventData({ ...eventData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/clg/addEvent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(eventData),
            });

            if (!response.ok) {
                throw new Error('Failed to add event');
            }

            window.alert('Event added successfully!');
            // formRef.current.reset();
            setEventData({
                event_name: '',
                players: 0,
                venue: '',
                event_desc: '',
                event_date: '',
                reg_date: '',
                img_url: '',
            })

        } catch (error) {
            console.error('Error adding event:', error.message);
        }
    };

    return (
        <Layout>
            <div className="add-event-container">
                <h2 className="add-event-heading">Add Event</h2>
                <form onSubmit={handleSubmit} className="add-event-form">
                    <label>Event Name:</label>
                    <input type="text" name="event_name" value={eventData.event_name} onChange={handleChange} required />

                    <label>Number of Players:</label>
                    <input type="number" name="players" value={eventData.players} onChange={handleChange} required />

                    <label>Venue:</label>
                    <input type="text" name="venue" value={eventData.venue} onChange={handleChange} required />

                    <label>Event Description:</label>
                    <textarea name="event_desc" value={eventData.event_desc} onChange={handleChange} required />

                    <label>Event Date:</label>
                    <input type="date" name="event_date" value={eventData.event_date} onChange={handleChange} required />

                    <label>Registration Date:</label>
                    <input type="date" name="reg_date" value={eventData.reg_date} onChange={handleChange} required />

                    <label>Image URL:</label>
                    <input type="text" name="img_url" value={eventData.img_url} onChange={handleChange} />

                    <button type="submit" className="add-event-btn">Add Event</button>
                </form>
            </div>
        </Layout>
    );
};

export default AddEventForm;
