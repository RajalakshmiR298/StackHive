import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import {
  CalendarDays,
  MapPin,
  Heart,
  ArrowRight,
} from "lucide-react";

import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

const EventCard = ({ event }) => {
  const { user } = useContext(AuthContext);

  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    if (!user) return;

    const checkFavorite = async () => {
      try {
        const res = await api.get("/favorites");

        const exists = res.data.some(
          (item) => String(item.eventId) === String(event._id)
        );

        setIsFavorited(exists);
      } catch (err) {
        console.error(err);
      }
    };

    checkFavorite();
  }, [user, event._id]);

  const handleFavorite = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      alert("Please login first");
      return;
    }

    try {
      if (isFavorited) {
        await api.delete(`/favorites/${event._id}`);
        setIsFavorited(false);
      } else {
        await api.post("/favorites", {
          eventId: event._id,
          title: event.title,
          image: event.image,
        });

        setIsFavorited(true);
      }
    } catch (err) {
      console.error(err);

      alert(
        err?.response?.data?.message ||
          "Unable to update favourites."
      );
    }
  };
  return (
  <motion.div
    whileHover={{ y: -8 }}
    transition={{ duration: 0.25 }}
    className="group overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-xl hover:border-blue-500/50 hover:shadow-blue-500/10"
  >
    <Link to={`/events/${event._id}`}>

      {/* Image */}

      <div className="relative overflow-hidden">

        <img
          src={event.image || "https://placehold.co/600x400"}
          alt={event.title}
          onError={(e) => {
            e.target.src = "https://placehold.co/600x400";
          }}
          className="h-60 w-full object-cover transition duration-500 group-hover:scale-110"
        />

        {/* Gradient */}

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Category Badge */}

        <div className="absolute left-4 top-4 rounded-full bg-blue-600 px-4 py-1 text-sm font-semibold text-white shadow-lg">

          {event.category || "Event"}

        </div>

        {/* Favourite */}

        <button
          onClick={handleFavorite}
          className={`absolute right-4 top-4 rounded-full p-3 transition shadow-xl ${
            isFavorited
              ? "bg-red-500 text-white"
              : "bg-white/20 backdrop-blur hover:bg-red-500 hover:text-white"
          }`}
        >
          <Heart
            size={20}
            fill={isFavorited ? "white" : "none"}
          />
        </button>

      </div>

      {/* Content */}

      <div className="space-y-5 p-6">

        <h2 className="line-clamp-2 text-2xl font-bold text-white transition group-hover:text-blue-400">

          {event.title}

        </h2>

        <div className="flex items-center gap-3 text-slate-400">

          <CalendarDays size={18} />

          <span>
            {event.date}
          </span>

        </div>

        <div className="flex items-center gap-3 text-slate-400">

          <MapPin size={18} />

          <span>
            {event.location}
          </span>

        </div>

        {event.description && (

          <p className="line-clamp-3 leading-7 text-slate-400">

            {event.description}

          </p>

        )}

        <div className="pt-3">

          <button
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 py-3 font-semibold text-white transition duration-300 hover:scale-[1.02]"
          >

            View Details

            <ArrowRight size={18} />

          </button>

        </div>

      </div>

    </Link>
  </motion.div>
);
};

export default EventCard;