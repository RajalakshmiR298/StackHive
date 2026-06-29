import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  UserPlus,
  ArrowRight,
} from "lucide-react";

const Register = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { name, email, password, confirmPassword } = formData;

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await register(name, email, password);

      navigate("/profile/setup");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6 py-12">

      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: .6 }}
        className="w-full max-w-lg rounded-3xl border border-slate-800 bg-slate-900 p-10 shadow-2xl"
      >

        <div className="text-center">

          <h1 className="text-4xl font-bold text-white">
            Create Account 🚀
          </h1>

          <p className="mt-3 text-slate-400">
            Join CampusConnect and start discovering opportunities.
          </p>

        </div>

        {error && (

          <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-center text-red-400">

            {error}

          </div>

        )}

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >

          {/* Name */}

          <div>

            <label className="mb-2 block text-sm text-slate-300">
              Full Name
            </label>

            <div className="relative">

              <User
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                name="name"
                value={name}
                onChange={onChange}
                placeholder="Enter your full name"
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-12 pr-4 text-white outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
              />

            </div>

          </div>

          {/* Email */}

          <div>

            <label className="mb-2 block text-sm text-slate-300">
              Email
            </label>

            <div className="relative">

              <Mail
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                placeholder="Enter your email"
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-12 pr-4 text-white outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
              />

            </div>

          </div>

          {/* Password */}

          <div>

            <label className="mb-2 block text-sm text-slate-300">
              Password
            </label>

            <div className="relative">

              <Lock
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                placeholder="Choose a password"
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-12 pr-4 text-white outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
              />

            </div>

          </div>

          {/* Confirm Password */}

          <div>

            <label className="mb-2 block text-sm text-slate-300">
              Confirm Password
            </label>

            <div className="relative">

              <Lock
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={onChange}
                placeholder="Confirm your password"
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-12 pr-4 text-white outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
              />

            </div>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 py-3 font-semibold text-white transition hover:scale-[1.02]"
          >

            <UserPlus size={20} />

            {loading ? "Creating Account..." : "Create Account"}

          </button>

        </form>

        <div className="mt-8 text-center text-slate-400">

          Already have an account?

          <Link
            to="/login"
            className="ml-2 inline-flex items-center gap-1 font-semibold text-blue-400 hover:text-blue-300"
          >

            Login

            <ArrowRight size={16} />

          </Link>

        </div>

      </motion.div>

    </div>
  );
};

export default Register;