import React from 'react';
import { useParams } from 'react-router-dom';

function ShowPlayers() {
    
    const obj = useParams();
    const eventId = obj.eventId;
    console.log(eventId);

    return (
        <div>
            <p>Event ID: {eventId}</p>
        </div>
    );
}

export default ShowPlayers;
