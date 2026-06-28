import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaUserEdit,
  FaCode,
  FaHeart,
  FaGamepad,
} from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import "../styles/Profile.css";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="profile-loading">
        <h2>Please log in.</h2>
      </div>
    );
  }

  return (
    <div className="profile-wrapper">
      {/* Banner */}
      <div className="profile-banner">
        <div className="profile-header">
          <img
            className="profile-avatar"
            src={
              user.profileImage ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                user.name
              )}&background=6D28D9&color=fff&size=256`
            }
            alt={user.name}
          />

          <div className="profile-info">
            <h1>{user.name}</h1>

            <p>
              <FaEnvelope /> {user.email}
            </p>

            <p>
              <FaMapMarkerAlt />{" "}
              {user.location || "Location not specified"}
            </p>
          </div>

          {/* EDIT PROFILE BUTTON */}
          <button
            className="edit-btn"
            onClick={() => navigate("/profile/edit")}
          >
            <FaUserEdit />
            Edit Profile
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="cards-grid">
        <div className="profile-card">
          <h2>
            <FaCode /> Skills
          </h2>

          <div className="chips">
            {(user.skills || []).length > 0 ? (
              user.skills.map((skill) => (
                <span
                  key={skill}
                  className="chip skill-chip"
                >
                  {skill}
                </span>
              ))
            ) : (
              <p>No skills added.</p>
            )}
          </div>
        </div>

        <div className="profile-card">
          <h2>
            <FaHeart /> Interests
          </h2>

          <div className="chips">
            {(user.interests || []).length > 0 ? (
              user.interests.map((interest) => (
                <span
                  key={interest}
                  className="chip interest-chip"
                >
                  {interest}
                </span>
              ))
            ) : (
              <p>No interests added.</p>
            )}
          </div>
        </div>

        <div className="profile-card">
          <h2>
            <FaGamepad /> Hobbies
          </h2>

          <div className="chips">
            {(user.hobbies || []).length > 0 ? (
              user.hobbies.map((hobby) => (
                <span
                  key={hobby}
                  className="chip hobby-chip"
                >
                  {hobby}
                </span>
              ))
            ) : (
              <p>No hobbies added.</p>
            )}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-row">
        <div className="stat">
          <h2>{user.skills?.length || 0}</h2>
          <p>Skills</p>
        </div>

        <div className="stat">
          <h2>{user.interests?.length || 0}</h2>
          <p>Interests</p>
        </div>

        <div className="stat">
          <h2>{user.hobbies?.length || 0}</h2>
          <p>Hobbies</p>
        </div>
      </div>

      {/* Quote */}
      <div className="quote-card">
        <h2>Connect. Learn. Grow.</h2>

        <p>
          Build meaningful connections, discover teammates,
          collaborate on exciting projects and grow your
          campus network with CampusConnect.
        </p>
      </div>
    </div>
  );
};

export default Profile;