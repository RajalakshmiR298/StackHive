import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      setLoading(true);
      const res = await api.get("/favorites");
      setFavorites(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const openEvent = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  const removeFromFavorites = async (favId, eventId) => {
    try {
      const response = await api.delete(`/favorites/${eventId}`);
      if (response.status === 200) {
        setFavorites((prev) => prev.filter((f) => f._id !== favId));
      }
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Failed to remove from favorites");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white px-6 py-10">
        <h2 className="text-3xl font-bold text-center mb-6">Your Favorite Events</h2>
        <p className="text-center text-slate-400 py-10">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-10">

      <h2 className="text-3xl font-bold text-center mb-10">Your Favorite Events ❤️</h2>

      {favorites.length === 0 ? (
        <p className="text-center text-slate-400">No favorites yet</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((fav) => (
            <div
              key={fav._id}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl"
            >
              <h3
                onClick={() => openEvent(fav.eventId)}
                className="text-xl font-bold text-white cursor-pointer hover:text-blue-400 transition mb-3"
              >
                {fav.title}
              </h3>

              <img
                src={fav.image}
                alt={fav.title}
                className="w-full h-[180px] object-cover rounded-lg cursor-pointer"
                onClick={() => openEvent(fav.eventId)}
                onError={(e) => {
                  e.target.src = "https://placehold.co/600x400";
                }}
              />

              <button
                onClick={() => removeFromFavorites(fav._id, fav.eventId)}
                className="w-full mt-4 px-6 py-3 rounded-xl bg-[#ef4444] text-white border-none hover:bg-[#dc2626] transition"
              >
                Remove from Favorites
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;