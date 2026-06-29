import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  LogIn,
  ArrowRight,
} from "lucide-react";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      setLoading(true);

      await login(email, password);

      navigate("/profile");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: .6 }}
        className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-10 shadow-2xl"
      >

        <div className="text-center">

          <h1 className="text-4xl font-bold text-white">

            Welcome Back 👋

          </h1>

          <p className="mt-3 text-slate-400">

            Sign in to continue to CampusConnect

          </p>

        </div>

        {error && (

          <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-center text-red-400">

            {error}

          </div>

        )}

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6"
        >

          <div>

            <label className="mb-2 block text-sm text-slate-300">

              Email

            </label>

            <div className="relative">

              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={20}
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

          <div>

            <label className="mb-2 block text-sm text-slate-300">

              Password

            </label>

            <div className="relative">

              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={20}
              />

              <input
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                placeholder="Enter your password"
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-12 pr-4 text-white outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
              />

            </div>

          </div>

          <button
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 py-3 font-semibold text-white transition hover:scale-[1.02]"
          >

            <LogIn size={20} />

            {loading ? "Signing In..." : "Sign In"}

          </button>

        </form>

        <div className="mt-8 text-center text-slate-400">

          Don't have an account?

          <Link
            to="/register"
            className="ml-2 inline-flex items-center gap-1 font-semibold text-blue-400 hover:text-blue-300"
          >

            Register

            <ArrowRight size={16} />

          </Link>

        </div>

      </motion.div>

    </div>
  );
};

export default Login;