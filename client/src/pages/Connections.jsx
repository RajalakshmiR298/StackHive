import { useState, useEffect } from "react";
import api from "../services/api";

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
      setLoading(true);

      const token = localStorage.getItem("token");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const matchesRes = await api.get("/connections/matches", config);
      setUsers(matchesRes.data || []);

      const requestsRes = await api.get("/connections/requests", config);
      setRequests(requestsRes.data || []);

      const connectionsRes = await api.get("/connections", config);
      setConnections(connectionsRes.data || []);

    } catch (error) {
      console.error("Error loading connections:", error);
    } finally {
      setLoading(false);
    }
  };

  const sendRequest = async (userId) => {
    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/connections/request",
        { receiverId: userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Connection request sent!");
      loadConnections();
    } catch (error) {
      console.error(error);
      alert("Unable to send request");
    }
  };

  const acceptRequest = async (requestId) => {
    try {
      const token = localStorage.getItem("token");

      await api.put(
        `/connections/accept/${requestId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Connection accepted!");
      loadConnections();
    } catch (error) {
      console.error(error);
      alert("Unable to accept request");
    }
  };

  const rejectRequest = async (requestId) => {
    try {
      const token = localStorage.getItem("token");

      await api.put(
        `/connections/reject/${requestId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Connection rejected!");
      loadConnections();
    } catch (error) {
      console.error(error);
      alert("Unable to reject request");
    }
  };

  if (loading) {
    return <h2 className="text-white text-center mt-20">Loading...</h2>;
  }

  return (
    <div className="max-w-[1000px] mx-auto px-8 py-10">

      <h1 className="text-center text-3xl font-bold text-white mb-8">
        People Matching & Connections
      </h1>

      {/* Recommended Users */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-white mb-4">People You May Know</h2>

        {users.length === 0 ? (
          <p className="text-slate-400">No matching users found.</p>
        ) : (
          users.map((user) => (
            <div
              key={user._id}
              className="bg-[#181c2a] border border-[#2b3350] rounded-xl p-5 mt-5 shadow-lg text-white"
            >
              <h3 className="text-white text-xl font-semibold">{user.name}</h3>

              <p className="text-[#d1d5db]"><strong>Location:</strong> {user.location}</p>

              <p className="text-[#d1d5db]"><strong>Skills:</strong> {user.skills?.join(", ") || "No skills added"}</p>

              <p className="text-[#d1d5db]"><strong>Interests:</strong> {user.interests?.join(", ") || "No interests"}</p>

              <p className="text-[#d1d5db]"><strong>Hobbies:</strong> {user.hobbies?.join(", ") || "No hobbies"}</p>

              <p className="text-[#22c55e] font-bold text-lg mt-2">
                Match Score: {user.matchPercentage ?? 0}%
              </p>

              <button
                onClick={() => sendRequest(user._id)}
                className="mt-2.5 mr-2.5 px-[18px] py-[10px] border-none rounded-lg bg-[#6366f1] text-white transition-all duration-300 hover:bg-[#4f46e5]"
              >
                Connect
              </button>
            </div>
          ))
        )}
      </section>

      {/* Requests */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-white mb-4">Incoming Requests</h2>

        {requests.length === 0 ? (
          <p className="text-slate-400">No pending requests.</p>
        ) : (
          requests.map((request) => (
            <div
              key={request._id}
              className="bg-[#181c2a] border border-[#2b3350] rounded-xl p-5 mt-5 shadow-lg text-white"
            >
              <h3 className="text-white text-xl font-semibold">{request.sender?.name}</h3>

              <button
                onClick={() => acceptRequest(request._id)}
                className="mt-2.5 mr-2.5 px-[18px] py-[10px] border-none rounded-lg bg-[#6366f1] text-white transition-all duration-300 hover:bg-[#4f46e5]"
              >
                Accept
              </button>

              <button
                onClick={() => rejectRequest(request._id)}
                className="mt-2.5 mr-2.5 px-[18px] py-[10px] border-none rounded-lg bg-[#ef4444] text-white transition-all duration-300 hover:bg-[#dc2626]"
              >
                Reject
              </button>
            </div>
          ))
        )}
      </section>

      {/* Connections */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-white mb-4">My Connections</h2>

        {connections.length === 0 ? (
          <p className="text-slate-400">No connections yet.</p>
        ) : (
          connections.map((connection) => (
            <div
              key={connection._id}
              className="bg-[#181c2a] border border-[#2b3350] rounded-xl p-5 mt-5 shadow-lg text-white"
            >
              <h3 className="text-white text-xl font-semibold">{connection.name}</h3>
              <p className="text-[#d1d5db]">Email: {connection.email}</p>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default Connections;
