import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="page-container">
        <h2>Please log in to view your profile.</h2>
      </div>
    );
  }

  return (
    <div className="page-container profile-page">
      <h2>Your Profile</h2>
      <div className="profile-card">
        <div className="profile-header">
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>
        <div className="profile-details">
          <h4>Bio & Preferences (Placeholder)</h4>
          <p>Configure your skills, interests, and hobbies to start matching with other campus students and get personalized recommendations.</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
