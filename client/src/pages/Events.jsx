import { useState, useEffect } from 'react';

const Events = () => {
  // Placeholder mock events list
  const [events] = useState([
    {
      id: 1,
      title: 'Annual Campus Hackathon',
      category: 'Technical',
      date: '2026-10-15',
      venue: 'Main Seminar Hall',
    },
    {
      id: 2,
      title: 'Acoustic Music Night',
      category: 'Non-Technical',
      date: '2026-10-20',
      venue: 'Campus Amphitheater',
    },
  ]);

  return (
    <div className="page-container events-page">
      <h2>Discover Events</h2>
      <div className="events-grid">
        {events.map((event) => (
          <div key={event.id} className="event-card">
            <h3>{event.title}</h3>
            <span className="badge">{event.category}</span>
            <p><strong>Date:</strong> {event.date}</p>
            <p><strong>Venue:</strong> {event.venue}</p>
            <button className="btn-secondary">View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

  // Add to favorites (backend ready, auth later)
  const addToFavorites = async (event) => {
    try {
      await fetch("http://localhost:5001/api/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer YOUR_TOKEN_HERE`, // replace later
        },
        body: JSON.stringify({
          eventId: event._id || event.id,
          title: event.title,
          image: event.image || "",
        }),
      });

      alert("Added to favorites ❤️");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="page-container events-page">
      <h2>Discover Events</h2>

      <div className="events-grid">
        {events.map((event) => (
          <div key={event._id || event.id} className="event-card">
            <h3>{event.title}</h3>

            <span className="badge">{event.category}</span>

            <p>
              <strong>Date:</strong> {event.date}
            </p>

            <p>
              <strong>Venue:</strong> {event.venue}
            </p>

            <div style={{ display: "flex", gap: "10px" }}>
              <button className="btn-secondary">
                View Details
              </button>

              <button
                onClick={() => addToFavorites(event)}
                className="btn-primary"
              >
                ❤️ Favorite
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );


export default Events;
