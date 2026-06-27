const Home = () => {
  return (
    <div className="page-container home-page">
      <h1>Welcome to CampusConnect</h1>
      <p className="subtitle">
        Discover events matching your interests and connect with like-minded peers on campus.
      </p>
      <div className="features-grid">
        <div className="feature-card">
          <h3>Event Discovery</h3>
          <p>Find workshops, hackathons, seminars, and social gatherings tailored to your skills.</p>
        </div>
        <div className="feature-card">
          <h3>Student Connections</h3>
          <p>Match with students sharing similar hobbies and build your campus network.</p>
        </div>
        <div className="feature-card">
          <h3>Favorites</h3>
          <p>Bookmark events you love and keep track of your schedule.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
