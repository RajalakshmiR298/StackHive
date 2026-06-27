import { useState } from 'react';

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

export default Events;
