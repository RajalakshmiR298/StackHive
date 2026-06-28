import { createContext, useState, useEffect } from "react";
import api from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user when app starts
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  // Register
  const register = async (name, email, password) => {
    const response = await api.post("/auth/register", {
      name,
      email,
      password,
    });

    const data = response.data;

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data));

    setUser(data);

    return data;
  };

  // Login
  const login = async (email, password) => {
    const response = await api.post("/auth/login", {
      email,
      password,
    });

    const data = response.data;

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data));

    setUser(data);

    return data;
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
  };

  // Refresh profile from backend
  const fetchProfile = async () => {
    const response = await api.get("/auth/profile");

    setUser(response.data);
    localStorage.setItem("user", JSON.stringify(response.data));

    return response.data;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        fetchProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};