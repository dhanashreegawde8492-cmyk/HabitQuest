import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Habits from "./pages/Habits";
import Achievements from "./pages/Achievements";
import Rewards from "./pages/Rewards";
import Profile from "./pages/Profile";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import ProtectedRoute from "./components/ProtectedRoute";
import GlobalEffects from "./components/GlobalEffects";
import Quests from "./pages/Quests";
export default function App() {
  return (
    <BrowserRouter>
      <GlobalEffects />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard"    element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/habits"       element={<ProtectedRoute><Habits /></ProtectedRoute>} />
        <Route path="/quests" element={<Quests />} />
        <Route path="/achievements" element={<ProtectedRoute><Achievements /></ProtectedRoute>} />
        <Route path="/rewards"      element={<ProtectedRoute><Rewards /></ProtectedRoute>} />
        <Route path="/profile"      element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/analytics"    element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
        <Route path="/settings"     element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}