import React, { useState, useEffect } from "react";

export default function EventsHist() {
  const [eventHist, seteventHist] = useState([]);
  useEffect(() => {
    const fetchEventHistDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/clg/getEventHistDetails`,
          {
            method: "POST",
          }
        );

        const data = await response.json();

        if (response.status === 200) {
          // Logging the array
          seteventHist(data); // Set the array directly
        } else if (response.status === 100) {
          seteventHist([]);
        }
      } catch (error) {
        console.error("Error fetching event details:", error.message);
      }
    };

    fetchEventHistDetails();
  }, []);

  return (
    <div>
      {eventHist ? (
        <div>
          {eventHist.map((evnt) => (
            <h1 key={evnt._id}>{evnt.year}</h1>
          ))}
        </div>
      ) : (
        <div>
          <h1>Hello</h1>
        </div>
      )}
    </div>
  );
}
