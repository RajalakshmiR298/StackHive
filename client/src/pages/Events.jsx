import { useState, useEffect } from "react";

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/events");
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.log("Error fetching events:", err);
      }
    };

    fetchEvents();
  }, []);

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
    <div className="min-h-screen bg-slate-950 text-white px-6 py-10">

      <h2 className="text-3xl font-bold text-center mb-10">Discover Events</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event._id || event.id}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl font-bold text-white">{event.title}</h3>
              <span className="inline-block rounded-full bg-blue-600 px-4 py-1 text-sm font-semibold text-white">
                {event.category || "General"}
              </span>
            </div>

            <p className="text-slate-300 mb-1"><strong>Date:</strong> {event.date}</p>

            <p className="text-slate-300 mb-4"><strong>Venue:</strong> {event.venue || event.location}</p>

            <div className="flex gap-3">
              <button className="px-6 py-3 rounded-xl border border-slate-600 text-white hover:bg-slate-800 transition">
                View Details
              </button>

              <button
                onClick={() => addToFavorites(event)}
                className="px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition shadow-lg"
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
