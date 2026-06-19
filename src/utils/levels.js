export const LEVELS = [
  { level: 1, xp: 0 },
  { level: 2, xp: 100 },
  { level: 3, xp: 250 },
  { level: 4, xp: 500 },
  { level: 5, xp: 800 },
  { level: 6, xp: 1200 },
  { level: 7, xp: 1700 },
  { level: 8, xp: 2300 },
  { level: 9, xp: 3000 },
  { level: 10, xp: 4000 },
];

export const RANKS = [
  { min: 0,    title: "Beginner",  color: "text-slate-300" },
  { min: 250,  title: "Explorer",  color: "text-cyan-300" },
  { min: 800,  title: "Warrior",   color: "text-emerald-300" },
  { min: 1700, title: "Champion",  color: "text-yellow-300" },
  { min: 3000, title: "Elite",     color: "text-orange-300" },
  { min: 5000, title: "Master",    color: "text-pink-300" },
  { min: 8000, title: "Legend",    color: "text-fuchsia-400" },
];

export function getLevelInfo(xp) {
  let current = LEVELS[0];
  let next = LEVELS[1];
  for (let i = 0; i < LEVELS.length; i++) {
    if (xp >= LEVELS[i].xp) {
      current = LEVELS[i];
      next = LEVELS[i + 1] || null;
    }
  }
  const xpForNext = next ? next.xp - xp : 0;
  const progressPct = next
    ? ((xp - current.xp) / (next.xp - current.xp)) * 100
    : 100;
  return {
    level: current.level,
    currentXp: xp,
    nextLevelXp: next?.xp ?? current.xp,
    xpForNext,
    progressPct: Math.min(100, Math.max(0, progressPct)),
    isMaxLevel: !next,
  };
}

export function getRank(xp) {
  let rank = RANKS[0];
  for (const r of RANKS) if (xp >= r.min) rank = r;
  return rank;
}
