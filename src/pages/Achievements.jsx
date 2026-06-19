import Navbar from "../components/Navbar";
import {
  getXP,
  getTotalCompleted,
  getStreak,
  isAchievementUnlocked,
} from "../utils/storage";

// 12 achievements with progress logic
const ACHIEVEMENTS = [
  { id: "first-habit",  title: "First Steps",       icon: "🌱", target: 1,    getProg: () => getTotalCompleted() },
  { id: "ten-habits",   title: "Habit Builder",     icon: "🛠️", target: 10,   getProg: () => getTotalCompleted() },
  { id: "fifty-habits", title: "Habit Master",      icon: "👑", target: 50,   getProg: () => getTotalCompleted() },
  { id: "xp-100",       title: "Apprentice",        icon: "⚡", target: 100,  getProg: () => getXP() },
  { id: "xp-500",       title: "Skilled",           icon: "💎", target: 500,  getProg: () => getXP() },
  { id: "xp-1000",      title: "Advanced",          icon: "🔮", target: 1000, getProg: () => getXP() },
  { id: "xp-2500",      title: "Expert",            icon: "🌟", target: 2500, getProg: () => getXP() },
  { id: "xp-5000",      title: "Master",            icon: "🏆", target: 5000, getProg: () => getXP() },
  { id: "streak-3",     title: "Warming Up",        icon: "🔥", target: 3,    getProg: () => getStreak() },
  { id: "streak-7",     title: "On Fire",           icon: "🔥", target: 7,    getProg: () => getStreak() },
  { id: "streak-30",    title: "Unstoppable",       icon: "⚔️", target: 30,   getProg: () => getStreak() },
  { id: "streak-100",   title: "Legendary Streak",  icon: "🐉", target: 100,  getProg: () => getStreak() },
];

export default function Achievements() {
  return (
    <div className="min-h-screen p-5 pb-28 text-white">
      <h1 className="text-4xl font-extrabold mb-1 bg-gradient-to-r from-yellow-300 to-amber-500 bg-clip-text text-transparent">
        Trophies
      </h1>
      <p className="text-slate-400 text-sm mb-6">Forge your legend</p>

      <ul className="grid grid-cols-1 gap-3">
        {ACHIEVEMENTS.map((a) => {
          const prog = a.getProg();
          const unlocked = prog >= a.target || isAchievementUnlocked(a.id);
          const pct = Math.min(100, (prog / a.target) * 100);
          return (
            <li
              key={a.id}
              data-testid={`achievement-${a.id}`}
              className={`flex items-center gap-3 p-4 rounded-2xl border ${
                unlocked
                  ? "bg-yellow-900/20 border-yellow-400/40 shadow-[0_0_25px_rgba(250,204,21,0.18)]"
                  : "bg-slate-900/80 border-white/10"
              }`}
            >
              <span className={`text-3xl ${unlocked ? "" : "grayscale opacity-50"}`}>
                {a.icon}
              </span>
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <p className={`font-bold ${unlocked ? "text-yellow-200" : ""}`}>
                    {a.title}
                  </p>
                  <p className="text-[10px] text-slate-400">
                    {Math.min(prog, a.target)}/{a.target}
                  </p>
                </div>
                <div className="h-1.5 bg-black/40 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all ${
                      unlocked ? "bg-gradient-to-r from-yellow-300 to-amber-500" : "bg-fuchsia-500"
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <Navbar />
    </div>
  );
}