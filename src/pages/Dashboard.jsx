import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import DailyRewardPopup from "../components/DailyRewardPopup";
import LevelUpPopup from "../components/LevelUpPopup";
import FocusTimer from "../components/FocusTimer";
import NextUnlock from "../components/NextUnlock";
import {
  getXP, getLifetimeXP, getStreak, getUserName, getUserPhoto, getSelectedAvatar,
  getRank, getTotalCompleted, getHabits, getAchievements,
  claimDailyReward, updateStreak,
} from "../utils/storage";
import { getLevelInfo } from "../utils/levels";
import { getTodayQuote } from "../utils/quotes";
import { fireConfetti } from "../utils/confetti";

export default function Dashboard() {
  const [reward, setReward]   = useState(null);
  const [levelUp, setLevelUp] = useState(null);

  const xp           = getXP();              // current spendable
  const lifetimeXp   = getLifetimeXP();      // total earned
  const streak       = getStreak();
  const userName     = getUserName();
  const avatar       = getSelectedAvatar() || getUserPhoto();
  const rank         = getRank(lifetimeXp);             // ✅ rank from lifetime
  const lvl          = getLevelInfo(lifetimeXp);        // ✅ level from lifetime
  const habits       = getHabits();
  const today        = new Date().toDateString();
  const completedToday = habits.filter(
    (h) => h.done && h.completedAt && new Date(h.completedAt).toDateString() === today
  ).length;
  const totalCompleted = getTotalCompleted();
  const achievements   = getAchievements();
  const quote          = getTodayQuote();

  useEffect(() => {
    updateStreak();
    const prevLevel = Number(localStorage.getItem("lastLevel")) || 1;
    const daily = claimDailyReward();
    if (daily.claimed) {
      setReward(daily.amount);
      const after = getLevelInfo(getLifetimeXP());
      if (after.level > prevLevel) {
        setTimeout(() => { setLevelUp(after.level); fireConfetti(); }, 600);
      }
      localStorage.setItem("lastLevel", String(after.level));
    } else if (lvl.level > prevLevel) {
      setLevelUp(lvl.level);
      fireConfetti();
      localStorage.setItem("lastLevel", String(lvl.level));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dailyTarget = 3;
  const dailyPct    = Math.min(100, (completedToday / dailyTarget) * 100);

  const weekStart = new Date();
  weekStart.setDate(weekStart.getDate() - weekStart.getDay());
  const weekCompleted = habits.filter(
    (h) => h.done && h.completedAt && new Date(h.completedAt) >= weekStart
  ).length;
  const weekTarget = 15;
  const weekPct    = Math.min(100, (weekCompleted / weekTarget) * 100);

  return (
    <div className="min-h-screen px-5 pt-6 pb-28 text-white max-w-2xl mx-auto">
      {reward  && <DailyRewardPopup amount={reward}  onClose={() => setReward(null)} />}
      {levelUp && <LevelUpPopup     level={levelUp}  onClose={() => setLevelUp(null)} />}

      {/* HERO CARD */}
      <div className="relative overflow-hidden rounded-3xl mb-6 border border-fuchsia-400/30 bg-gradient-to-br from-fuchsia-600/20 via-purple-900/30 to-slate-950 shadow-[0_0_40px_rgba(217,70,239,0.2)] p-5">
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-fuchsia-500/20 blur-3xl rounded-full pointer-events-none" />
        <div className="flex items-center gap-4 relative">
          {avatar && (
            <img
              src={avatar}
              alt=""
              className="w-16 h-16 rounded-full border-2 border-purple-400 object-cover shadow-lg"
            />
          )}
          <div className="flex-1">
            <p className="text-xs uppercase tracking-widest text-slate-400">Welcome back,</p>
            <h1 className="text-2xl font-extrabold leading-tight">{userName}</h1>
            <p className={`text-sm font-bold ${rank.color}`}>
              ★ {rank.title} · Lv {lvl.level}
            </p>
          </div>
        </div>
        <div className="mt-4 h-2 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-fuchsia-400 via-pink-400 to-yellow-300 transition-all"
            style={{ width: `${lvl.progressPct}%` }}
          />
        </div>
        <div className="flex justify-between text-xs mt-2 text-slate-400">
          <span className="font-bold text-yellow-300">⚡ {xp} XP</span>
          <span>{lvl.isMaxLevel ? "MAX" : `${lvl.xpForNext} XP to Lv ${lvl.level + 1}`}</span>
        </div>
      </div>

      {/* QUOTE */}
      <div className="bg-slate-900/80 border-l-4 border-yellow-400 rounded-r-xl p-4 mb-5">
        <p className="text-[10px] uppercase tracking-widest text-yellow-400 mb-1">
          Today's Quote
        </p>
        <p className="text-sm italic text-slate-200">"{quote}"</p>
      </div>

      {/* NEXT UNLOCK */}
      <NextUnlock />

      {/* QUESTS */}
      <div className="grid grid-cols-1 gap-3 mb-5">
        <QuestCard title="Daily Quest" subtitle={`Complete ${dailyTarget} habits today`}
          progress={completedToday} target={dailyTarget} pct={dailyPct}
          reward="+60 XP" color="from-cyan-500 to-blue-700" />
        <QuestCard title="Weekly Quest" subtitle={`Complete ${weekTarget} habits this week`}
          progress={weekCompleted} target={weekTarget} pct={weekPct}
          reward="+250 XP" color="from-fuchsia-500 to-purple-700" />
      </div>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <Stat label="Streak"   value={`${streak}🔥`} />
        <Stat label="Habits"   value={totalCompleted} />
        <Stat label="Trophies" value={achievements.length} />
      </div>

      {/* FOCUS TIMER */}
      <div className="mb-5">
        <FocusTimer />
      </div>

      {/* QUICK LINKS */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <Link to="/habits"       className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 text-center font-semibold hover:border-fuchsia-400/60 transition">📋 Habits</Link>
        <Link to="/quests"       className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 text-center font-semibold hover:border-cyan-400/60 transition">⚔️ Quests</Link>
        <Link to="/achievements" className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 text-center font-semibold hover:border-yellow-400/60 transition">🏆 Trophies</Link>
        <Link to="/rewards"      className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 text-center font-semibold hover:border-pink-400/60 transition">🎁 Rewards</Link>
        <Link to="/analytics"    className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 text-center font-semibold hover:border-blue-400/60 transition col-span-2">📊 Analytics</Link>
      </div>

      <Navbar />
    </div>
  );
}

const Stat = ({ label, value }) => (
  <div className="bg-slate-900/80 border border-white/10 rounded-xl p-3 text-center hover:border-fuchsia-400/40 transition">
    <p className="text-[10px] uppercase tracking-widest text-slate-400">{label}</p>
    <p className="text-xl font-bold mt-1">{value}</p>
  </div>
);

const QuestCard = ({ title, subtitle, progress, target, pct, reward, color }) => (
  <div className={`rounded-2xl p-4 bg-gradient-to-r ${color} border border-white/10 relative overflow-hidden`}>
    <div className="absolute inset-0 bg-black/30 pointer-events-none" />
    <div className="relative">
      <div className="flex justify-between items-start mb-2">
        <div>
          <p className="text-[10px] uppercase tracking-widest opacity-70">{title}</p>
          <p className="font-bold">{subtitle}</p>
        </div>
        <span className="text-xs font-bold bg-black/50 px-2 py-1 rounded-full">{reward}</span>
      </div>
      <div className="h-2 bg-black/40 rounded-full overflow-hidden">
        <div className="h-full bg-white/90 transition-all" style={{ width: `${pct}%` }} />
      </div>
      <p className="text-[10px] mt-1 opacity-80">{progress}/{target}</p>
    </div>
  </div>
);