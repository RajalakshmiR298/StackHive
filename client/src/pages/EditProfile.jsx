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
import "../styles/EditProfile.css";

const EditProfile = () => {
  const { user, fetchProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [location, setLocation] = useState(user?.location || "");
  const [profileImage, setProfileImage] = useState(
    user?.profileImage || ""
  );

  const [skills, setSkills] = useState(user?.skills || []);
  const [interests, setInterests] = useState(
    user?.interests || []
  );
  const [hobbies, setHobbies] = useState(
    user?.hobbies || []
  );

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.put("/auth/profile", {
        name,
        email,
        location,
        profileImage,
        skills,
        interests,
        hobbies,
      });

      await fetchProfile();

      navigate("/profile");
    } catch (err) {
      console.error(err);
      alert("Unable to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-profile-page">

      <div className="edit-profile-card">

        <h1>Edit Profile</h1>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Full Name</label>

            <input
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
            />
          </div>

          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />
          </div>

          <div className="form-group">
            <label>Location</label>

            <input
              value={location}
              onChange={(e) =>
                setLocation(e.target.value)
              }
            />
          </div>

          <div className="form-group">
            <label>Profile Image URL</label>

            <input
              value={profileImage}
              onChange={(e) =>
                setProfileImage(e.target.value)
              }
            />
          </div>

          <TagInput
            label="Skills"
            placeholder="Search Skills..."
            suggestions={skillSuggestions}
            value={skills}
            onChange={setSkills}
          />

          <TagInput
            label="Interests"
            placeholder="Search Interests..."
            suggestions={interestSuggestions}
            value={interests}
            onChange={setInterests}
          />

          <TagInput
            label="Hobbies"
            placeholder="Search Hobbies..."
            suggestions={hobbySuggestions}
            value={hobbies}
            onChange={setHobbies}
          />

          <button
            className="save-btn"
            disabled={loading}
          >
            {loading
              ? "Saving..."
              : "Save Changes"}
          </button>

        </form>

      </div>

    </div>
  );
};

export default EditProfile;