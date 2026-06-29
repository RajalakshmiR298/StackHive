import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  MapPin,
  Code2,
  Heart,
  Gamepad2,
  Pencil,
  Sparkles,
} from "lucide-react";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <h2 className="text-2xl font-semibold">
          Please login to continue.
        </h2>
      </div>
    );
  };
  return (
  <div className="min-h-screen bg-slate-950 text-white">

    {/* Hero Banner */}

    <section className="relative overflow-hidden border-b border-slate-800 bg-gradient-to-r from-blue-950 via-slate-900 to-slate-950">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#2563eb20,transparent_45%)]" />

      <div className="relative mx-auto max-w-7xl px-6 py-16">

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .6 }}
          className="flex flex-col items-center gap-8 lg:flex-row"
        >

          <img
            src={
              user.profileImage ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                user.name
              )}&background=2563EB&color=fff&size=256`
            }
            alt={user.name}
            className="h-40 w-40 rounded-full border-4 border-blue-500 object-cover shadow-2xl"
          />

          <div className="flex-1">

            <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/20 px-4 py-2 text-blue-400">

              <Sparkles size={18} />

              CampusConnect Member

            </div>

            <h1 className="mt-5 text-5xl font-bold">

              {user.name}

            </h1>

            <div className="mt-6 flex flex-col gap-3 text-slate-300">

              <div className="flex items-center gap-3">

                <Mail size={18} />

                {user.email}

              </div>

              <div className="flex items-center gap-3">

                <MapPin size={18} />

                {user.location || "Location not added"}

              </div>

            </div>

          </div>

          <button
            onClick={() => navigate("/profile/edit")}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 font-semibold transition hover:scale-105"
          >

            <Pencil size={18} />

            Edit Profile

          </button>

        </motion.div>

      </div>

    </section>

    <section className="mx-auto max-w-7xl px-6 py-12">

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Skills */}

<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  className="rounded-3xl border border-slate-800 bg-slate-900 p-6"
>

  <div className="mb-5 flex items-center gap-3">

    <div className="rounded-xl bg-blue-600 p-3">

      <Code2 size={22} />

    </div>

    <h2 className="text-2xl font-bold">
      Skills
    </h2>

  </div>

  <div className="flex flex-wrap gap-3">

    {(user.skills || []).length ? (

      user.skills.map((skill) => (

        <span
          key={skill}
          className="rounded-full bg-blue-600/20 border border-blue-500/30 px-4 py-2 text-sm text-blue-300"
        >
          {skill}
        </span>

      ))

    ) : (

      <p className="text-slate-400">
        No skills added.
      </p>

    )}

  </div>

</motion.div>

{/* Interests */}

<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ delay: .1 }}
  className="rounded-3xl border border-slate-800 bg-slate-900 p-6"
>

  <div className="mb-5 flex items-center gap-3">

    <div className="rounded-xl bg-pink-600 p-3">

      <Heart size={22} />

    </div>

    <h2 className="text-2xl font-bold">
      Interests
    </h2>

  </div>

  <div className="flex flex-wrap gap-3">

    {(user.interests || []).length ? (

      user.interests.map((interest) => (

        <span
          key={interest}
          className="rounded-full bg-pink-600/20 border border-pink-500/30 px-4 py-2 text-sm text-pink-300"
        >
          {interest}
        </span>

      ))

    ) : (

      <p className="text-slate-400">
        No interests added.
      </p>

    )}

  </div>

</motion.div>

{/* Hobbies */}

<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ delay: .2 }}
  className="rounded-3xl border border-slate-800 bg-slate-900 p-6"
>

  <div className="mb-5 flex items-center gap-3">

    <div className="rounded-xl bg-green-600 p-3">

      <Gamepad2 size={22} />

    </div>

    <h2 className="text-2xl font-bold">
      Hobbies
    </h2>

  </div>

  <div className="flex flex-wrap gap-3">

    {(user.hobbies || []).length ? (

      user.hobbies.map((hobby) => (

        <span
          key={hobby}
          className="rounded-full bg-green-600/20 border border-green-500/30 px-4 py-2 text-sm text-green-300"
        >
          {hobby}
        </span>

      ))

    ) : (

      <p className="text-slate-400">
        No hobbies added.
      </p>

    )}

  </div>

</motion.div>

</div>
{/* Statistics */}

<div className="mt-12 grid gap-6 md:grid-cols-3">

  <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 text-center">

    <h2 className="text-5xl font-bold text-blue-400">

      {user.skills?.length || 0}

    </h2>

    <p className="mt-3 text-slate-400">

      Skills

    </p>

  </div>

  <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 text-center">

    <h2 className="text-5xl font-bold text-pink-400">

      {user.interests?.length || 0}

    </h2>

    <p className="mt-3 text-slate-400">

      Interests

    </p>

  </div>

  <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 text-center">

    <h2 className="text-5xl font-bold text-green-400">

      {user.hobbies?.length || 0}

    </h2>

    <p className="mt-3 text-slate-400">

      Hobbies

    </p>

  </div>

</div>

{/* Quote */}

<div className="mt-12 rounded-3xl border border-blue-500/20 bg-gradient-to-r from-blue-900/30 to-slate-900 p-10 text-center">

  <h2 className="text-3xl font-bold">

    Connect • Learn • Grow

  </h2>

  <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-300">

    Build meaningful friendships, discover exciting campus events,
    collaborate with talented students, and expand your network through
    CampusConnect.

  </p>

</div>

</section>

</div>
);
};

export default Profile;