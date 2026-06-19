import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import Navbar from "../components/Navbar";
import { getUserName, setUserName, resetProgress } from "../utils/storage";

export default function Settings() {
  const navigate = useNavigate();
  const [name, setName] = useState(getUserName());
  const [saved, setSaved] = useState(false);

  const saveName = () => {
    if (!name.trim()) return;
    setUserName(name.trim());
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  const handleReset = () => {
    if (!window.confirm("⚠️ This will erase ALL your XP, habits, achievements & rewards.\n\nContinue?")) return;
    resetProgress();
    window.location.reload();
  };

  const handleLogout = async () => {
    await signOut(auth);
    ["userName", "userPhoto", "selectedAvatar", "isLoggedIn"].forEach((k) => localStorage.removeItem(k));
    navigate("/");
  };

  return (
    <div className="min-h-screen px-5 pt-6 pb-28 text-white max-w-2xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-1 bg-gradient-to-r from-slate-200 to-slate-400 bg-clip-text text-transparent">
        Settings
      </h1>
      <p className="text-slate-400 text-sm mb-6">Personalize your quest</p>

      {/* USERNAME */}
      <Section title="Username" icon="👤">
        <div className="flex gap-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="flex-1 bg-slate-800 border border-white/10 rounded-xl px-3 py-2.5 outline-none focus:border-fuchsia-400 transition"
          />
          <button
            onClick={saveName}
            disabled={!name.trim()}
            className={`px-5 rounded-xl font-bold text-sm uppercase tracking-wider transition ${
              name.trim()
                ? "bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white hover:opacity-90"
                : "bg-slate-700 text-slate-400 cursor-not-allowed"
            }`}
          >
            {saved ? "✓" : "Save"}
          </button>
        </div>
      </Section>

      {/* AVATAR SHOP LINK */}
      <Section title="Avatar" icon="🎭">
        <button
          onClick={() => navigate("/profile")}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600/40 to-fuchsia-600/40 border border-purple-400/30 hover:from-purple-600/60 hover:to-fuchsia-600/60 font-semibold transition flex items-center justify-between px-4"
        >
          <span>Open Avatar Shop</span>
          <span className="text-fuchsia-300">→</span>
        </button>
      </Section>

      {/* DANGER ZONE */}
      <Section title="Danger Zone" icon="⚠️">
        <p className="text-xs text-slate-400 mb-3">
          This will permanently delete all your progress.
        </p>
        <button
          onClick={handleReset}
          className="w-full py-3 rounded-xl bg-red-600/80 hover:bg-red-500 font-semibold transition"
        >
          Reset All Progress
        </button>
      </Section>

      {/* ACCOUNT */}
      <Section title="Account" icon="🔐">
        <button
          onClick={handleLogout}
          className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-white/10 font-semibold transition"
        >
          Logout
        </button>
      </Section>

      {/* ABOUT */}
      <Section title="About" icon="ℹ️">
        <p className="text-sm text-slate-300 leading-relaxed">
          <span className="font-bold text-fuchsia-300">HabitQuest</span> is a gamified productivity app where every habit earns XP, unlocks rewards & forges your legend.
        </p>
        <p className="text-[10px] text-slate-500 mt-3 tracking-wider">
          v2.0 · React + Vite + Firebase
        </p>
      </Section>

      <Navbar />
    </div>
  );
}

const Section = ({ title, icon, children }) => (
  <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-5 mb-4">
    <h3 className="text-sm font-bold mb-4 text-slate-300 flex items-center gap-2">
      <span>{icon}</span>
      <span className="uppercase tracking-wider">{title}</span>
    </h3>
    {children}
  </div>
);