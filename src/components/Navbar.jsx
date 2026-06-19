import { NavLink } from "react-router-dom";
import { Home, Target, Trophy, BarChart3, User, Settings as SettingsIcon } from "lucide-react";

const items = [
  { to: "/dashboard",    icon: Home,       label: "Home" },
  { to: "/achievements", icon: Trophy,     label: "Trophies" },
  { to: "/analytics",    icon: BarChart3,  label: "Stats" },
  { to: "/profile",      icon: User,       label: "Profile" },
  { to: "/settings",     icon: SettingsIcon, label: "Settings" },
];

export default function Navbar() {
  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[94%] max-w-md">
      <div className="glass rounded-2xl px-2 py-2 flex justify-between items-center shadow-neon">
        {items.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center flex-1 py-2 rounded-xl text-[10px] font-semibold transition ${
                isActive
                  ? "bg-purple-500/20 text-purple-300 shadow-neon"
                  : "text-slate-400 hover:text-purple-300"
              }`
            }
          >
            <Icon size={20} />
            <span className="mt-1">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}