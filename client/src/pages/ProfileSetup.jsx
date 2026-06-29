import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";
import TagInput from "../components/TagInput";
import {
  skillSuggestions,
  interestSuggestions,
  hobbySuggestions,
} from "../utils/recommendations";

const ProfileSetup = () => {
  const { fetchProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const [location, setLocation] = useState("");
  const [skills, setSkills] = useState([]);
  const [interests, setInterests] = useState([]);
  const [hobbies, setHobbies] = useState([]);
  const [profileImage, setProfileImage] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      await api.put("/auth/profile", {
        location,
        skills,
        interests,
        hobbies,
        profileImage,
      });

      await fetchProfile();

      navigate("/profile");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to save profile."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-gradient-to-br from-slate-950 via-[#1e1b4b] to-slate-900">

      <div className="w-full max-w-2xl bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-10 shadow-2xl">

        <div className="text-center mb-8">

          <h2 className="text-3xl font-bold text-white">Complete Your Profile</h2>

          <p className="mt-3 text-slate-400">
            Help other students discover you by completing your profile.
          </p>

        </div>

        {error && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-center text-red-400 mb-5">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">Location</label>

            <input
              type="text"
              placeholder="Enter your city"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 px-4 text-white outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">Profile Image URL (Optional)</label>

            <input
              type="text"
              placeholder="https://..."
              value={profileImage}
              onChange={(e) =>
                setProfileImage(e.target.value)
              }
              className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 px-4 text-white outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
            />
          </div>

          <TagInput
            label="Skills"
            placeholder="Search or type a skill..."
            suggestions={skillSuggestions}
            value={skills}
            onChange={setSkills}
          />

          <TagInput
            label="Interests"
            placeholder="Search or type an interest..."
            suggestions={interestSuggestions}
            value={interests}
            onChange={setInterests}
          />

          <TagInput
            label="Hobbies"
            placeholder="Search or type a hobby..."
            suggestions={hobbySuggestions}
            value={hobbies}
            onChange={setHobbies}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 py-3 font-semibold text-white transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? "Saving..."
              : "Save Profile"}
          </button>

        </form>

      </div>
    </div>
  );
};

export default ProfileSetup;