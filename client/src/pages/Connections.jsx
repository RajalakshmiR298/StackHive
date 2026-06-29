import { useState, useEffect } from "react";
import api from "../services/api";
import "../styles/connections.css";

const Connections = () => {
  const [users, setUsers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadConnections();
  }, []);

  const loadConnections = async () => {
    try {
      const matchesRes = await api.get("/connections/matches");
      setUsers(matchesRes.data);

      const requestsRes = await api.get("/connections/requests");
      setRequests(requestsRes.data);

      const connectionsRes = await api.get("/connections");
      setConnections(connectionsRes.data);
      setLoading(false);
    } catch (error) {
      console.error("Error loading connections:", error);
    }
  };

  const sendRequest = async (userId) => {
    try {
      await api.post("/connections/request", {
        receiverId: userId,
      });

      alert("Connection request sent!");
      loadConnections();
    } catch (error) {
      console.error(error);
      alert("Unable to send request");
    }
  };

  const acceptRequest = async (requestId) => {
    try {
      await api.put(`/connections/accept/${requestId}`);

      alert("Connection accepted!");
      loadConnections();
    } catch (error) {
      console.error(error);
      alert("Unable to accept request");
    }
  };

  const rejectRequest = async (requestId) => {
    try {
      await api.put(`/connections/reject/${requestId}`);

      alert("Connection rejected!");
      loadConnections();
    } catch (error) {
      console.error(error);
      alert("Unable to reject request");
    }
  };

  if (loading) {
  return <h2>Loading...</h2>;
}

  return (
    <div className="connections-page">
      <h1>People Matching & Connections</h1>

      {/* Recommended Users */}
      <section>
        <h2>People You May Know</h2>

        {users.length === 0 ? (
          <p>No matching users found.</p>
        ) : (
          users.map((user) => (
            <div className="user-card" key={user._id}>
              <h3>{user.name}</h3>

              <p>
                <strong>Location:</strong> {user.location}
              </p>

              <p>
                <strong>Skills:</strong>{" "}
                {user.skills?.length
                  ? user.skills.join(", ")
                  : "No skills added"}
              </p>

              <p>
                <strong>Interests:</strong>{" "}
                {user.interests?.length
                  ? user.interests.join(", ")
                  : "No interests"}
              </p>

              <p>
                <strong>Hobbies:</strong>{" "}
                {user.hobbies?.length
                  ? user.hobbies.join(", ")
                  : "No hobbies"}
              </p>

              <p className="match-score">
                Match Score: {user.matchPercentage ?? 0}%
              </p>

              <button onClick={() => sendRequest(user._id)}>
                Connect
              </button>
            </div>
          ))
        )}
      </section>

      {/* Requests */}
      <section>
        <h2>Incoming Requests</h2>

        {requests.length === 0 ? (
          <p>No pending requests.</p>
        ) : (
          requests.map((request) => (
            <div className="request-card" key={request._id}>
              <h3>{request.sender?.name}</h3>

              <button
                onClick={() => acceptRequest(request._id)}
              >
                Accept
              </button>

              <button
                className="reject-btn"
                onClick={() => rejectRequest(request._id)}
              >
                Reject
              </button>
            </div>
          ))
        )}
      </section>

      {/* Connections */}
      <section>
        <h2>My Connections</h2>

        {connections.length === 0 ? (
          <p>No connections yet.</p>
        ) : (
          connections.map((connection) => (
            <div className="connection-card" key={connection._id}>
              <h3>{connection.name}</h3>

              <p>Email: {connection.email}</p>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default Connections;