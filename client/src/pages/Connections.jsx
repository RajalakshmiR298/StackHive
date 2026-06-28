import { useState } from "react";
import "../styles/connections.css";

const Connections = () => {
  const [users] = useState([
    {
      id: 1,
      name: "Rahul Kumar",
      location: "Kochi",
      skills: ["React", "Node.js"],
      interests: ["AI", "Web Development"],
      hobbies: ["Football"],
      match: 90,
    },
    {
      id: 2,
      name: "Anjali Nair",
      location: "Trivandrum",
      skills: ["Python", "MongoDB"],
      interests: ["Machine Learning"],
      hobbies: ["Reading"],
      match: 82,
    },
  ]);

  const [requests] = useState([
    {
      id: 3,
      name: "Akash",
    },
  ]);

  const [connections] = useState([
    {
      id: 4,
      name: "Neha",
      email: "neha@gmail.com",
    },
  ]);

  return (
    <div className="connections-page">

      <h1>People Matching & Connections</h1>

      <section>

        <h2>People You May Know</h2>

        {users.map((user) => (

          <div className="user-card" key={user.id}>

            <h3>{user.name}</h3>

            <p><strong>Location:</strong> {user.location}</p>

            <p>
              <strong>Skills:</strong>{" "}
              {user.skills.join(", ")}
            </p>

            <p>
              <strong>Interests:</strong>{" "}
              {user.interests.join(", ")}
            </p>

            <p>
              <strong>Hobbies:</strong>{" "}
              {user.hobbies.join(", ")}
            </p>

            <p className="match-score">
              Match Score: {user.match}%
            </p>

            <button>Connect</button>

          </div>

        ))}

      </section>

      <section>

        <h2>Incoming Requests</h2>

        {requests.map((request) => (

          <div className="request-card" key={request.id}>

            <span>{request.name}</span>

            <div>

              <button>Accept</button>

              <button className="reject-btn">
                Reject
              </button>

            </div>

          </div>

        ))}

      </section>

      <section>

        <h2>My Connections</h2>

        {connections.map((connection) => (

          <div className="connection-card" key={connection.id}>

            <h3>{connection.name}</h3>

            <p>Email: {connection.email}</p>

          </div>

        ))}

      </section>

    </div>
  );
};

export default Connections;