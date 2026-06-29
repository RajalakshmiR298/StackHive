
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ProfileSetup from "./pages/ProfileSetup";
import EditProfile from "./pages/EditProfile";

import EventsPage from "./pages/EventsPage";
import EventDetails from "./pages/EventDetails";
import Favorites from "./pages/Favorites";
import Connections from "./pages/Connections";

import "./index.css";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />

            <Route path="/events" element={<EventsPage />} />
            <Route path="/events/:id" element={<EventDetails />} />

            <Route path="/favorites" element={<Favorites />} />
            <Route path="/connections" element={<Connections />} />

            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/setup" element={<ProfileSetup />} />
            <Route path="/profile/edit" element={<EditProfile />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

