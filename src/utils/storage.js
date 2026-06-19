// src/utils/storage.js
// HabitQuest — FINAL master storage layer (with Lifetime XP)

/* =========================================================
   DEBUG LOGGER
   ========================================================= */
const DEBUG = true;
const log = (action, key, value) => {
  if (!DEBUG) return;
  const styles = {
    READ:   "color:#22d3ee;font-weight:bold",
    WRITE:  "color:#a855f7;font-weight:bold",
    DELETE: "color:#ef4444;font-weight:bold",
    ACTION: "color:#fde047;font-weight:bold",
    ERROR:  "color:#f87171;font-weight:bold",
  };
  console.log(`%c[storage:${action}]%c ${key}`, styles[action] || "color:#fff", "color:#94a3b8", value);
};

/* =========================================================
   HELPERS
   ========================================================= */
const read = (k, fb) => {
  try { const v = localStorage.getItem(k); const p = v === null ? fb : JSON.parse(v); log("READ", k, p); return p; }
  catch (e) { log("ERROR", `read(${k})`, e.message); return fb; }
};
const write = (k, v) => {
  try { localStorage.setItem(k, JSON.stringify(v)); log("WRITE", k, v); }
  catch (e) { log("ERROR", `write(${k})`, e.message); }
};
const readRaw  = (k, fb = "") => { const v = localStorage.getItem(k); return v ?? fb; };
const writeRaw = (k, v)       => { localStorage.setItem(k, v); log("WRITE", k, v); };
const removeKey = (k)         => { localStorage.removeItem(k); log("DELETE", k, null); };
const todayStr = () => new Date().toISOString().slice(0, 10);
const weekKey  = () => {
  const d = new Date();
  const onejan = new Date(d.getFullYear(), 0, 1);
  const week = Math.ceil(((d - onejan) / 86400000 + onejan.getDay() + 1) / 7);
  return `${d.getFullYear()}-W${week}`;
};

/* =========================================================
   USER PROFILE
   ========================================================= */
export const getUserName       = ()  => readRaw("userName", "Hero");
export const setUserName       = (v) => writeRaw("userName", v);
export const getUserPhoto      = ()  => readRaw("userPhoto", "");
export const setUserPhoto      = (v) => writeRaw("userPhoto", v);
export const getSelectedAvatar = ()  => readRaw("selectedAvatar", "");
export const setSelectedAvatar = (v) => writeRaw("selectedAvatar", v);

/* =========================================================
   XP — Current (spendable) + Lifetime (never decreases)
   ========================================================= */
export const getXP = ()  => Number(localStorage.getItem("xp")) || 0;
export const setXP = (n) => writeRaw("xp", String(n));

// 🔥 Lifetime XP — only goes UP, used for Level & Rank
export const getLifetimeXP = () => Number(localStorage.getItem("lifetimeXP")) || 0;
export const setLifetimeXP = (n) => writeRaw("lifetimeXP", String(n));

export const addXP = (delta) => {
  const next = getXP() + delta;
  setXP(next);
  // Only ADD to lifetime when earning (positive delta)
  if (delta > 0) setLifetimeXP(getLifetimeXP() + delta);
  log("ACTION", `addXP(${delta})`, `current=${next}, lifetime=${getLifetimeXP()}`);
  return next;
};

export const spendXP = (cost) => {
  if (getXP() < cost) return false;
  setXP(getXP() - cost);   // Only reduces CURRENT xp
  log("ACTION", `spendXP(${cost})`, `current=${getXP()}, lifetime=${getLifetimeXP()}`);
  return true;
};

/* =========================================================
   STREAK
   ========================================================= */
export const getStreak     = ()  => Number(localStorage.getItem("streak")) || 0;
export const setStreak     = (n) => writeRaw("streak", String(n));
export const getBestStreak = ()  => Number(localStorage.getItem("bestStreak")) || 0;
export const syncBestStreak = () => {
  const cur = getStreak();
  if (cur > getBestStreak()) writeRaw("bestStreak", String(cur));
  return getBestStreak();
};

export const updateStreak = () => {
  const last  = localStorage.getItem("lastLoginDate");
  const today = todayStr();
  if (last === today) return getStreak();
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  const newStreak = last === yesterday ? getStreak() + 1 : 1;
  setStreak(newStreak);
  writeRaw("lastLoginDate", today);
  syncBestStreak();
  return newStreak;
};

/* =========================================================
   TOTAL COMPLETED
   ========================================================= */
export const getTotalCompleted = ()  => Number(localStorage.getItem("totalCompleted")) || 0;
export const setTotalCompleted = (n) => writeRaw("totalCompleted", String(n));
export const incTotalCompleted = () => {
  const n = getTotalCompleted() + 1;
  setTotalCompleted(n);
  return n;
};
export const incrementTotalCompleted = incTotalCompleted;

/* =========================================================
   ACTIVITY
   ========================================================= */
export const getActivity = ()    => read("activity", {});
export const setActivity = (obj) => write("activity", obj);
export const incActivity = () => {
  const a = getActivity();
  const k = todayStr();
  a[k] = (a[k] || 0) + 1;
  setActivity(a);
  return a;
};
export const incrementActivity = incActivity;

/* =========================================================
   HABITS
   ========================================================= */
export const getHabits = ()     => read("habits", []);
export const setHabits = (list) => write("habits", list);

export const addHabit = (habit) => {
  const list = getHabits();
  list.push({
    id: Date.now().toString(),
    title: habit.title || "Untitled",
    xp: habit.xp ?? 20,
    done: false,
    completedAt: null,
    createdAt: new Date().toISOString(),
    ...habit,
  });
  setHabits(list);
  return list;
};

export const deleteHabit = (id) => {
  const list = getHabits().filter((h) => h.id !== id);
  setHabits(list);
  return list;
};

export const toggleHabit = (id) => {
  const list = getHabits();
  const idx  = list.findIndex((h) => h.id === id);
  if (idx === -1) return list;
  const h = list[idx];
  if (!h.done) {
    h.done = true;
    h.completedAt = new Date().toISOString();
    addXP(h.xp || 20);
    incActivity();
    incTotalCompleted();
  } else {
    h.done = false;
    h.completedAt = null;
  }
  setHabits(list);
  return list;
};

/* =========================================================
   ACHIEVEMENTS
   ========================================================= */
export const getAchievements         = ()     => read("achievements", []);
export const setAchievements         = (list) => write("achievements", list);
export const getUnlockedAchievements = getAchievements;
export const setUnlockedAchievements = setAchievements;

export const unlockAchievement = (id) => {
  const list = getAchievements();
  if (list.includes(id)) return false;
  list.push(id);
  setAchievements(list);
  return true;
};
export const isAchievementUnlocked = (id) => getAchievements().includes(id);

/* =========================================================
   RANK (uses Lifetime XP)
   ========================================================= */
export const getRank = (xp = getLifetimeXP()) => {
  if (xp >= 10000) return { title: "Legend",     color: "text-yellow-300"  };
  if (xp >= 5000)  return { title: "Master",     color: "text-fuchsia-300" };
  if (xp >= 2500)  return { title: "Expert",     color: "text-purple-300"  };
  if (xp >= 1000)  return { title: "Advanced",   color: "text-cyan-300"    };
  if (xp >= 500)   return { title: "Skilled",    color: "text-emerald-300" };
  if (xp >= 100)   return { title: "Apprentice", color: "text-blue-300"    };
  return { title: "Beginner", color: "text-slate-300" };
};

/* =========================================================
   DAILY LOGIN REWARD
   ========================================================= */
export const canClaimDailyReward = () => localStorage.getItem("lastDailyReward") !== todayStr();
export const claimDailyReward = () => {
  if (!canClaimDailyReward()) return { claimed: false, amount: 0 };
  const amount = 50;
  addXP(amount);
  writeRaw("lastDailyReward", todayStr());
  return { claimed: true, amount };
};

/* =========================================================
   DAILY QUESTS
   ========================================================= */
export const getDailyQuests = () => {
  const habits = getHabits();
  const today  = new Date().toDateString();
  const completedToday = habits.filter(
    (h) => h.done && h.completedAt && new Date(h.completedAt).toDateString() === today
  ).length;
  const weekStart = new Date();
  weekStart.setDate(weekStart.getDate() - weekStart.getDay());
  const completedThisWeek = habits.filter(
    (h) => h.done && h.completedAt && new Date(h.completedAt) >= weekStart
  ).length;

  return [
    { id: "daily-3",   title: "Daily Quest",   subtitle: "Complete 3 habits today",      progress: completedToday,           target: 3,  reward: 60,  type: "daily"  },
    { id: "weekly-15", title: "Weekly Quest",  subtitle: "Complete 15 habits this week", progress: completedThisWeek,        target: 15, reward: 250, type: "weekly" },
    { id: "streak-7",  title: "Streak Master", subtitle: "Maintain a 7-day streak",      progress: Math.min(getStreak(), 7), target: 7,  reward: 150, type: "streak" },
  ];
};

/* =========================================================
   QUEST BOARD
   ========================================================= */
const QUEST_KEY = "claimedQuests";
export const getClaimedQuests = ()    => read(QUEST_KEY, {});
export const setClaimedQuests = (obj) => write(QUEST_KEY, obj);

export const questClaimKey = (quest) => {
  if (quest.type === "weekly") return `${quest.id}-${weekKey()}`;
  return `${quest.id}-${todayStr()}`;
};
export const isQuestClaimed = (quest) => !!getClaimedQuests()[questClaimKey(quest)];

export const claimQuestReward = (quest) => {
  if (quest.progress < quest.target) return { claimed: false, reason: "incomplete" };
  if (isQuestClaimed(quest))          return { claimed: false, reason: "already-claimed" };
  addXP(quest.reward);
  const map = getClaimedQuests();
  map[questClaimKey(quest)] = true;
  setClaimedQuests(map);
  return { claimed: true, amount: quest.reward };
};

/* =========================================================
   REWARDS SHOP
   ========================================================= */
export const getUnlockedRewards = ()     => read("unlockedRewards", []);
export const setUnlockedRewards = (list) => write("unlockedRewards", list);

export const unlockReward = (id, cost = 0) => {
  const list = getUnlockedRewards();
  if (list.includes(id)) return false;
  if (cost > 0 && !spendXP(cost)) return false;
  list.push(id);
  setUnlockedRewards(list);
  return true;
};
export const isRewardUnlocked = (id) => getUnlockedRewards().includes(id);
export const getOwnedRewards  = getUnlockedRewards;
export const setOwnedRewards  = setUnlockedRewards;
export const ownReward        = (id) => unlockReward(id, 0);

/* =========================================================
   AVATAR SHOP
   ========================================================= */
export const getOwnedAvatars    = ()     => read("ownedAvatars", []);
export const setOwnedAvatars    = (list) => write("ownedAvatars", list);
export const getUnlockedAvatars = getOwnedAvatars;
export const setUnlockedAvatars = setOwnedAvatars;

export const buyAvatar = (id, cost = 0) => {
  const list = getOwnedAvatars();
  if (list.includes(id)) return false;
  if (cost > 0 && !spendXP(cost)) return false;
  list.push(id);
  setOwnedAvatars(list);
  return true;
};
export const unlockAvatar     = buyAvatar;
export const isAvatarOwned    = (id) => getOwnedAvatars().includes(id);
export const isAvatarUnlocked = isAvatarOwned;

/* =========================================================
   POLISH METRICS
   ========================================================= */
export const getAvgXpPerDay = () => {
  const days = Object.values(getActivity()).slice(-7);
  if (!days.length) return 0;
  const sumXp = days.reduce((s, c) => s + c * 20, 0);
  return Math.round(sumXp / days.length);
};

export const getNextUnlock = (catalog, ownedList) => {
  const remaining = catalog
    .filter((item) => !ownedList.includes(item.id))
    .sort((a, b) => a.cost - b.cost);
  if (!remaining.length) return null;
  const target = remaining[0];
  const xp = getXP();
  return {
    item: target,
    xpRemaining: Math.max(0, target.cost - xp),
    pct: Math.min(100, (xp / target.cost) * 100),
  };
};

/* =========================================================
   RESET
   ========================================================= */
export const resetProgress = () => {
  const keep = ["userName", "userPhoto", "isLoggedIn"];
  Object.keys(localStorage).forEach((k) => {
    if (!keep.includes(k)) removeKey(k);
  });
};

/* =========================================================
   ONE-TIME MIGRATION: sync lifetimeXP from existing xp
   ========================================================= */
if (typeof window !== "undefined") {
  const lt = Number(localStorage.getItem("lifetimeXP")) || 0;
  const cur = Number(localStorage.getItem("xp")) || 0;
  if (lt < cur) {
    localStorage.setItem("lifetimeXP", String(cur));
  }
}

/* =========================================================
   DEBUG UTILITY
   ========================================================= */
if (typeof window !== "undefined") {
  window.__habit = {
    dump: () => {
      const snap = {
        xp: getXP(), lifetimeXP: getLifetimeXP(),
        streak: getStreak(), bestStreak: getBestStreak(),
        totalCompleted: getTotalCompleted(), habits: getHabits(),
        achievements: getAchievements(), unlockedRewards: getUnlockedRewards(),
        ownedAvatars: getOwnedAvatars(), activity: getActivity(),
        userName: getUserName(),
      };
      console.table(snap);
      return snap;
    },
    clear: () => { localStorage.clear(); console.warn("[storage] cleared."); },
  };
}