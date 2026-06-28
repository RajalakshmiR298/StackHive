import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";
import TagInput from "../components/TagInput";
import "../styles/ProfileSetup.css";
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
    <div className="page-container auth-page">
      <div className="auth-card">

        <h2>Complete Your Profile</h2>

        <p>
          Help other students discover you by completing your profile.
        </p>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Location</label>

            <input
              type="text"
              placeholder="Enter your city"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Profile Image URL (Optional)</label>

            <input
              type="text"
              placeholder="https://..."
              value={profileImage}
              onChange={(e) =>
                setProfileImage(e.target.value)
              }
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
            className="btn-primary"
            type="submit"
            disabled={loading}
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