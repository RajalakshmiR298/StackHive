import { useState, useEffect } from "react";

const Events = () => {
  const [events, setEvents] = useState([]);

  // Load events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/events");
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.log("Error fetching events:", err);
      }
    };

    fetchEvents();
  }, []);

  // Add to favorites
  const addToFavorites = async (event) => {
    try {
      await fetch("http://localhost:5000/api/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer YOUR_TOKEN_HERE`,
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

            <span className="badge">{event.category || "General"}</span>

            <p>
              <strong>Date:</strong> {event.date}
            </p>

            <p>
              <strong>Venue:</strong> {event.venue || event.location}
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
};

export default Events;