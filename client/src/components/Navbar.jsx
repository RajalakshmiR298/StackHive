
import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Menu,
  X,
  User,
  Heart,
  Users,
  CalendarDays,
  LogOut,
  LogIn,
} from "lucide-react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const navClass = ({ isActive }) =>
    isActive
      ? "text-blue-400 font-semibold"
      : "text-slate-300 hover:text-white transition";

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/70 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6">

        <div className="flex h-20 items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold tracking-tight text-white"
          >
            Campus
            <span className="text-blue-500">Connect</span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8">

            <NavLink to="/" className={navClass}>
              Home
            </NavLink>

            <NavLink to="/events" className={navClass}>
              Events
            </NavLink>

            {user && (
              <>
                <NavLink to="/favorites" className={navClass}>
                  <div className="flex items-center gap-2">
                    <Heart size={18} />
                    Favorites
                  </div>
                </NavLink>

                <NavLink to="/connections" className={navClass}>
                  <div className="flex items-center gap-2">
                    <Users size={18} />
                    Connections
                  </div>
                </NavLink>

                <NavLink to="/profile" className={navClass}>
                  <div className="flex items-center gap-2">
                    <User size={18} />
                    Profile
                  </div>
                </NavLink>

                <button
                  onClick={logout}
                  className="flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2 text-white hover:bg-red-600 transition"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            )}

            {!user && (
              <>
                <NavLink to="/login">
                  <button className="rounded-xl border border-slate-700 px-5 py-2 text-slate-200 hover:bg-slate-800 transition">
                    Login
                  </button>
                </NavLink>

                <NavLink to="/register">
                  <button className="rounded-xl bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 transition shadow-lg">
                    Register
                  </button>
                </NavLink>
              </>
            )}
          </nav>

          {/* Mobile Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden pb-6 space-y-5">

            <NavLink
              to="/"
              className={navClass}
              onClick={() => setOpen(false)}
            >
              Home
            </NavLink>

            <NavLink
              to="/events"
              className={navClass}
              onClick={() => setOpen(false)}
            >
              <div className="flex items-center gap-2">
                <CalendarDays size={18} />
                Events
              </div>
            </NavLink>

            {user ? (
              <>
                <NavLink
                  to="/favorites"
                  className={navClass}
                  onClick={() => setOpen(false)}
                >
                  Favorites
                </NavLink>

                <NavLink
                  to="/connections"
                  className={navClass}
                  onClick={() => setOpen(false)}
                >
                  Connections
                </NavLink>

                <NavLink
                  to="/profile"
                  className={navClass}
                  onClick={() => setOpen(false)}
                >
                  Profile
                </NavLink>

                <button
                  onClick={logout}
                  className="w-full rounded-xl bg-red-500 py-3 text-white"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className={navClass}
                  onClick={() => setOpen(false)}
                >
                  <div className="flex items-center gap-2">
                    <LogIn size={18} />
                    Login
                  </div>
                </NavLink>

                <NavLink
                  to="/register"
                  className={navClass}
                  onClick={() => setOpen(false)}
                >
                  Register
                </NavLink>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;

