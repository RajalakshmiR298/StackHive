
import { motion } from "framer-motion";
import {
  CalendarDays,
  Users,
  Heart,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: <CalendarDays size={34} />,
    title: "Discover Events",
    description:
      "Explore hackathons, workshops, seminars and exciting campus activities tailored to your interests.",
  },
  {
    icon: <Users size={34} />,
    title: "Build Connections",
    description:
      "Meet students with similar skills and interests to expand your professional network.",
  },
  {
    icon: <Heart size={34} />,
    title: "Save Favorites",
    description:
      "Bookmark your favorite events and access them anytime from your personal dashboard.",
  },
];

const stats = [
  { value: "500+", label: "Events" },
  { value: "3000+", label: "Students" },
  { value: "100+", label: "Communities" },
  { value: "95%", label: "Engagement" },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* HERO */}

      <section className="max-w-7xl mx-auto px-6 pt-24 pb-20">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .8 }}
          className="text-center"
        >

          <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-blue-400">
            <Sparkles size={18} />
            Campus Networking Platform
          </span>

          <h1 className="mt-8 text-5xl md:text-7xl font-extrabold leading-tight">

            Connect.

            <br />

            <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Discover.
            </span>

            <br />

            Grow.
          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-lg text-slate-400 leading-8">
            CampusConnect helps students discover campus events,
            build meaningful friendships,
            collaborate on innovative projects,
            and create opportunities that shape their future.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-5">

            <Link
              to="/events"
              className="rounded-xl bg-blue-600 px-8 py-4 font-semibold shadow-lg transition hover:bg-blue-700"
            >
              Explore Events
            </Link>

            <Link
              to="/register"
              className="rounded-xl border border-slate-700 px-8 py-4 font-semibold hover:bg-slate-900 transition"
            >
              Join Community
            </Link>

          </div>

        </motion.div>

      </section>

      {/* STATS */}

      <section className="max-w-6xl mx-auto px-6">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          {stats.map((item) => (

            <motion.div
              whileHover={{ y: -8 }}
              key={item.label}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center shadow-xl"
            >
              <h2 className="text-4xl font-bold text-blue-400">
                {item.value}
              </h2>

              <p className="mt-3 text-slate-400">
                {item.label}
              </p>

            </motion.div>

          ))}

        </div>

      </section>

      {/* FEATURES */}

      <section className="max-w-7xl mx-auto px-6 py-24">

        <div className="text-center">

          <h2 className="text-4xl font-bold">
            Why CampusConnect?
          </h2>

          <p className="mt-4 text-slate-400">
            Everything you need to make your campus experience unforgettable.
          </p>

        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-8">

          {features.map((feature) => (

            <motion.div
              whileHover={{ y: -10 }}
              key={feature.title}
              className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-xl transition"
            >

              <div className="mb-6 text-blue-400">
                {feature.icon}
              </div>

              <h3 className="text-2xl font-bold">
                {feature.title}
              </h3>

              <p className="mt-4 text-slate-400 leading-7">
                {feature.description}
              </p>

            </motion.div>

          ))}

        </div>

      </section>

      {/* CTA */}

      <section className="px-6 pb-24">

        <motion.div
          whileHover={{ scale: 1.01 }}
          className="mx-auto max-w-5xl rounded-3xl bg-gradient-to-r from-blue-700 to-purple-700 p-14 text-center"
        >

          <h2 className="text-4xl font-bold">
            Ready to transform your campus experience?
          </h2>

          <p className="mt-5 text-blue-100 text-lg">
            Join thousands of students discovering opportunities every day.
          </p>

          <Link
            to="/register"
            className="mt-10 inline-flex items-center gap-2 rounded-xl bg-black px-8 py-4 font-semibold text-slate-900 transition hover:scale-105"
          >
            Get Started

            <ArrowRight size={20} />

          </Link>

        </motion.div>

      </section>

    </div>
  );
};

export default Home;
