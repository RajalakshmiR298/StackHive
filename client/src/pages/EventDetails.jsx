import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CalendarDays,
  MapPin,
  User,
  ArrowLeft,
  ExternalLink,
  Tag,
} from "lucide-react";

import { getEventById } from "../services/eventService";

const EventDetails = () => {
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);

      try {
        const data = await getEventById(id);
        setEvent(data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);
  if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
      <div className="h-24 w-24 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
    </div>
  );
}

if (error) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">

      <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-10 text-center">

        <h2 className="text-3xl font-bold text-red-400">

          Something went wrong

        </h2>

        <p className="mt-3 text-slate-300">

          Unable to load this event.

        </p>

      </div>

    </div>
  );
}

if (!event) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">

      Event not found.

    </div>
  );
}
return (
  <div className="min-h-screen bg-slate-950 text-white">

    {/* Hero */}

    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative"
    >

      <img
        src={event.image || "https://placehold.co/1200x600"}
        alt={event.title}
        onError={(e) => {
          e.target.src = "https://placehold.co/1200x600";
        }}
        className="h-[420px] w-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-black/60 to-transparent" />

      {/* Back Button */}

      <div className="absolute left-8 top-8">

        <Link
          to="/events"
          className="flex items-center gap-2 rounded-xl bg-black/40 px-5 py-3 backdrop-blur hover:bg-black/60 transition"
        >
          <ArrowLeft size={18} />
          Back
        </Link>

      </div>

      {/* Event Title */}

      <div className="absolute bottom-10 left-1/2 w-full max-w-7xl -translate-x-1/2 px-6">

        <div className="flex flex-wrap items-center gap-4">

          <span className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold">

            <div className="flex items-center gap-2">

              <Tag size={16} />

              {event.category || "Event"}

            </div>

          </span>

        </div>

        <h1 className="mt-6 text-5xl font-bold">

          {event.title}

        </h1>

      </div>

    </motion.section>

    {/* Content */}

    <section className="mx-auto max-w-7xl px-6 py-12">

      <div className="grid gap-10 lg:grid-cols-3">

        {/* Description */}

        <motion.div
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 rounded-3xl border border-slate-800 bg-slate-900 p-8"
        >

          <h2 className="mb-6 text-3xl font-bold">

            About this Event

          </h2>

          <p className="whitespace-pre-line leading-8 text-slate-300">

            {event.description}

          </p>

        </motion.div>

        {/* Sidebar */}

        <motion.div
          initial={{ opacity: 0, x: 25 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >

          {/* Date */}

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">

            <div className="flex items-center gap-3">

              <CalendarDays className="text-blue-400" />

              <div>

                <p className="text-sm text-slate-400">

                  Date

                </p>

                <h3 className="font-semibold">

                  {event.date}

                </h3>

              </div>

            </div>

          </div>

          {/* Location */}

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">

            <div className="flex items-center gap-3">

              <MapPin className="text-red-400" />

              <div>

                <p className="text-sm text-slate-400">

                  Location

                </p>

                <h3 className="font-semibold">

                  {event.location}

                </h3>

              </div>

            </div>

          </div>

          {/* Organizer */}

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">

            <div className="flex items-center gap-3">

              <User className="text-green-400" />

              <div>

                <p className="text-sm text-slate-400">

                  Organizer

                </p>

                <h3 className="font-semibold">

                  {event.organizer}

                </h3>

              </div>

            </div>

          </div>

          {/* Register */}

          {event.registrationLink && (

            <a
              href={event.registrationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 py-4 text-lg font-semibold transition hover:scale-[1.02]"
            >

              Register Now

              <ExternalLink size={20} />

            </a>

          )}

        </motion.div>

      </div>

    </section>

  </div>
);
};
export default EventDetails;