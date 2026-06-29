import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Search,
  MapPinned,
  Sparkles,
} from "lucide-react";

import {
  getAllEvents,
  searchEvents,
  filterByCategory,
  getNearbyEvents,
} from "../services/eventService";

import { AuthContext } from "../context/AuthContext";

import EventCard from "../components/EventCard";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";

const EventsPage = () => {
  const { user } = useContext(AuthContext);

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isNearbyFilter, setIsNearbyFilter] = useState(false);

  useEffect(() => {
    const loadInitial = async () => {
      setLoading(true);
      setError(false);

      try {
        const data = await getAllEvents();
        setEvents(data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadInitial();
  }, []);

  useEffect(() => {
    if (selectedCategory !== "All" || isNearbyFilter) return;

    const timer = setTimeout(async () => {
      setLoading(true);

      try {
        if (searchQuery.trim() === "") {
          const data = await getAllEvents();
          setEvents(data);
        } else {
          const data = await searchEvents(searchQuery);
          setEvents(data);
        }
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleCategoryChange = async (category) => {
    setSelectedCategory(category);
    setSearchQuery("");
    setIsNearbyFilter(false);

    setLoading(true);

    try {
      if (category === "All") {
        const data = await getAllEvents();
        setEvents(data);
      } else {
        const data = await filterByCategory(category);
        setEvents(data);
      }
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setSelectedCategory("All");
    setIsNearbyFilter(false);
  };

  const handleNearbyClick = async () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setIsNearbyFilter(true);

    setLoading(true);

    try {
      const userId =
        user?._id ||
        user?.id ||
        "6a415ffae52b1d8e68b57839";

      const data = await getNearbyEvents(userId);

      setEvents(data);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const getEmptyStateMessage = () => {
    if (searchQuery) return "No matching events found.";
    if (selectedCategory !== "All")
      return "No events in this category.";
    if (isNearbyFilter)
      return "No nearby events found.";

    return "No events available.";
};
    return (
  <div className="min-h-screen bg-slate-950 text-white">

    {/* Hero */}

    <section className="border-b border-slate-800 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950">

      <div className="mx-auto max-w-7xl px-6 py-20">

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >

          <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 border border-blue-500/30 px-4 py-2 text-blue-400 mb-6">

            <Sparkles size={18} />

            Campus Events

          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">

            Discover Amazing

            <span className="block bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 bg-clip-text text-transparent">

              Campus Events

            </span>

          </h1>

          <p className="mt-6 max-w-2xl text-slate-400 text-lg leading-8">

            Explore workshops, hackathons, seminars,
            cultural festivals and networking events happening around
            your campus.

          </p>

        </motion.div>

      </div>

    </section>

    {/* Search Controls */}

    <section className="mx-auto max-w-7xl px-6 py-10">

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl"
      >

        <div className="grid gap-5 lg:grid-cols-3">

          <div>

            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300">

              <Search size={18} />

              Search Events

            </label>

            <SearchBar
              value={searchQuery}
              onChange={handleSearchChange}
            />

          </div>

          <div>

            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300">

              <CalendarDays size={18} />

              Category

            </label>

            <CategoryFilter
              selectedCategory={selectedCategory}
              onChange={handleCategoryChange}
            />

          </div>

          <div className="flex items-end">

            <button
              onClick={handleNearbyClick}
              className={`w-full rounded-xl px-6 py-3 font-semibold transition duration-300 ${
                isNearbyFilter
                  ? "bg-blue-600 text-white"
                  : "bg-slate-800 hover:bg-blue-600 text-white"
              }`}
            >

              <div className="flex justify-center items-center gap-2">

                <MapPinned size={20} />

                Nearby Events

              </div>

            </button>

          </div>

        </div>

      </motion.div>

    </section>

    {/* Events */}

    <section className="mx-auto max-w-7xl px-6 pb-20">

      {loading ? (

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {[1,2,3,4,5,6].map((item)=>(
            <div
              key={item}
              className="h-80 rounded-3xl bg-slate-900 animate-pulse border border-slate-800"
            />
          ))}

        </div>

      ) : error ? (

        <div className="rounded-3xl border border-red-500/30 bg-red-500/10 p-10 text-center">

          <h2 className="text-2xl font-bold text-red-400">

            Something went wrong

          </h2>

          <p className="mt-3 text-slate-300">

            Please refresh the page and try again.

          </p>

        </div>

      ) : events.length === 0 ? (

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-16 text-center">

          <h2 className="text-3xl font-bold">

            No Events Found

          </h2>

          <p className="mt-4 text-slate-400">

            {getEmptyStateMessage()}

          </p>

        </div>

      ) : (

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid gap-8 md:grid-cols-2 xl:grid-cols-3"
        >

          {events.map((event) => (

            <EventCard
              key={event._id}
              event={event}
            />

          ))}

        </motion.div>

      )}

    </section>

  </div>
);
};
export default EventsPage;
  