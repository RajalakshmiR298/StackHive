import { Link } from "react-router-dom";
import {
  GitBranch,
  Link2,
  Mail,
  MapPin,
  CalendarDays,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid gap-12 md:grid-cols-4">

          {/* Brand */}
          <div>
            <h2 className="text-3xl font-bold text-white">
              Campus
              <span className="text-blue-500">Connect</span>
            </h2>

            <p className="mt-5 text-slate-400 leading-7">
              Connecting students with events, communities,
              innovation, and career opportunities through one
              powerful platform.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white">
              Quick Links
            </h3>

            <div className="mt-5 flex flex-col gap-3">

              <Link
                to="/"
                className="text-slate-400 hover:text-blue-400 transition"
              >
                Home
              </Link>

              <Link
                to="/events"
                className="text-slate-400 hover:text-blue-400 transition"
              >
                Events
              </Link>

              <Link
                to="/favorites"
                className="text-slate-400 hover:text-blue-400 transition"
              >
                Favorites
              </Link>

              <Link
                to="/connections"
                className="text-slate-400 hover:text-blue-400 transition"
              >
                Connections
              </Link>

            </div>
          </div>

          {/* Platform */}
          <div>

            <h3 className="text-lg font-semibold text-white">
              Platform
            </h3>

            <div className="mt-5 space-y-4 text-slate-400">

              <div className="flex items-center gap-3">
                <CalendarDays size={18} />
                Discover Campus Events
              </div>

              <div className="flex items-center gap-3">
                <MapPin size={18} />
                Connect with Students
              </div>

              <div className="flex items-center gap-3">
                <Mail size={18} />
                Build Your Network
              </div>

            </div>

          </div>

          {/* Contact */}
          <div>

            <h3 className="text-lg font-semibold text-white">
              Connect
            </h3>

            <div className="mt-5 flex gap-4">

              <a
                href="#"
                className="rounded-xl bg-slate-900 p-3 hover:bg-blue-600 transition"
              >
                <GitBranch size={20} />
              </a>

              <a
                href="#"
                className="rounded-xl bg-slate-900 p-3 hover:bg-blue-600 transition"
              >
                <Link2 size={20} />
              </a>

              <a
                href="mailto:support@campusconnect.com"
                className="rounded-xl bg-slate-900 p-3 hover:bg-blue-600 transition"
              >
                <Mail size={20} />
              </a>

            </div>

            <p className="mt-6 text-slate-400">
              support@campusconnect.com
            </p>

          </div>

        </div>

        <div className="mt-12 border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} CampusConnect. All Rights Reserved.
          </p>

          <p className="text-slate-500 text-sm">
            Designed with ❤️ for students.
          </p>

        </div>

      </div>
    </footer>
  );
};

export default Footer;