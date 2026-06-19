export const ACHIEVEMENTS = [
  { id: "beginner",  title: "Beginner",  desc: "Earned your first 100 XP",  xp: 100,  icon: "🌱", color: "from-green-500 to-emerald-600" },
  { id: "explorer",  title: "Explorer",  desc: "Crossed 500 XP",            xp: 500,  icon: "🧭", color: "from-purple-500 to-fuchsia-600" },
  { id: "ai_master", title: "AI Master", desc: "Reached 1000 XP",           xp: 1000, icon: "🤖", color: "from-cyan-500 to-blue-600" },
  { id: "legend",    title: "Legend",    desc: "Conquered 2000 XP",         xp: 2000, icon: "👑", color: "from-yellow-500 to-orange-600" },
];

export const checkNewlyUnlocked = (xp, alreadyUnlocked) =>
  ACHIEVEMENTS.filter(
    (a) => xp >= a.xp && !alreadyUnlocked.includes(a.id)
  );