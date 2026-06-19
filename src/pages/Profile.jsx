import { useState } from "react";
import Navbar from "../components/Navbar";
import {
  getXP, getLifetimeXP, getUserName, getSelectedAvatar, setSelectedAvatar,
  getOwnedAvatars, buyAvatar, getRank, getStreak, getTotalCompleted,
  getUnlockedRewards,
} from "../utils/storage";
import { getLevelInfo } from "../utils/levels";
import { AVATARS, rarityFor } from "../data/catalogs";

export default function Profile() {
  const [xp, setXp]         = useState(getXP());
  const [owned, setOwned]   = useState(getOwnedAvatars());
  const [selected, setSel]  = useState(getSelectedAvatar());
  const [filter, setFilter] = useState("All");

  const userName   = getUserName();
  const lifetimeXp = getLifetimeXP();
  const rank       = getRank(lifetimeXp);
  const lvl        = getLevelInfo(lifetimeXp);
  const streak     = getStreak();
  const habitsDone = getTotalCompleted();
  const rewardsCnt = getUnlockedRewards().length;

  const refresh = () => {
    setXp(getXP());
    setOwned(getOwnedAvatars());
    setSel(getSelectedAvatar());
  };

  const handleBuy = (av) => {
    const r = rarityFor(av.cost);
    if (av.cost === 0) {
      setSelectedAvatar(av.url);
      refresh();
      return;
    }
    const ok = buyAvatar(av.id, av.cost);
    if (!ok) {
      alert(xp < av.cost ? "⚠️ Not enough XP!" : "Already owned.");
      return;
    }
    setSelectedAvatar(av.url);
    refresh();
    alert(`🎉 ${r.label} avatar "${av.name}" unlocked!`);
  };

  const handleSelect = (av) => {
    setSelectedAvatar(av.url);
    refresh();
  };

  const FILTERS = ["All", "Common", "Rare", "Epic", "Legendary", "Mythic"];
  const visible = filter === "All"
    ? AVATARS
    : AVATARS.filter((a) => rarityFor(a.cost).label === filter);

  return (
    <div className="min-h-screen px-5 pt-6 pb-28 text-white max-w-2xl mx-auto">
      {/* HEADER */}
      <div className="bg-gradient-to-br from-purple-700/30 to-slate-950 border border-purple-400/30 rounded-3xl p-5 mb-4 text-center shadow-[0_0_40px_rgba(168,85,247,0.15)]">
        {selected ? (
          <img
            src={selected}
            alt=""
            className="w-28 h-28 mx-auto rounded-full border-4 border-purple-400 object-cover mb-3 shadow-[0_0_30px_rgba(168,85,247,0.45)]"
          />
        ) : (
          <div className="w-28 h-28 mx-auto rounded-full bg-slate-800 mb-3 flex items-center justify-center text-4xl">👤</div>
        )}
        <h1 className="text-2xl font-extrabold">{userName}</h1>
        <p className={`text-sm font-bold ${rank.color}`}>★ {rank.title} · Lv {lvl.level}</p>
      </div>

      {/* PRO STATS PANEL */}
      <div className="grid grid-cols-3 gap-2 mb-5">
        <Stat label="Level"    value={lvl.level}    color="text-fuchsia-300" />
        <Stat label="XP"       value={xp}           color="text-yellow-300" />
        <Stat label="Rank"     value={rank.title}   color={rank.color} small />
        <Stat label="Streak"   value={`${streak}🔥`} color="text-orange-300" />
        <Stat label="Habits"   value={habitsDone}   color="text-emerald-300" />
        <Stat label="Rewards"  value={rewardsCnt}   color="text-pink-300" />
      </div>

      <p className="text-[10px] text-slate-400 mb-4 text-center">
        {owned.length + 2}/{AVATARS.length} avatars unlocked
      </p>

      {/* FILTERS */}
      <div className="flex flex-wrap gap-2 mb-4">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider transition ${
              filter === f
                ? "bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white shadow-lg"
                : "bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <h2 className="text-sm font-bold text-slate-300 mb-3 uppercase tracking-widest">
        Avatar Shop
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {visible.map((a) => {
          const r          = rarityFor(a.cost);
          const isOwned    = owned.includes(a.id) || a.cost === 0;
          const isSelected = selected === a.url;
          const canAfford  = xp >= a.cost;

          return (
            <div
              key={a.id}
              className={`p-3 rounded-2xl bg-slate-900/80 border ${r.border} ${r.glow} ${
                isSelected ? `ring-2 ${r.ring}` : ""
              } transition hover:scale-[1.02]`}
            >
              <div className="relative">
                {a.url ? (
                  <img
                    src={a.url}
                    alt={a.name}
                    className={`w-full aspect-square object-cover rounded-xl mb-2 bg-slate-800 ${
                      !isOwned ? "grayscale opacity-50" : ""
                    }`}
                  />
                ) : (
                  <div className="w-full aspect-square rounded-xl mb-2 bg-slate-800 flex items-center justify-center text-4xl">❓</div>
                )}
                {!isOwned && (
                  <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/40">
                    <span className="text-3xl">🔒</span>
                  </div>
                )}
              </div>

              <p className={`text-[9px] uppercase tracking-widest font-bold ${r.color}`}>{r.label}</p>
              <p className="text-sm font-bold text-white mb-1 truncate">{a.name}</p>
              <p className="text-[10px] text-slate-400 mb-2">
                {a.cost === 0 ? "Free" : `⚡ ${a.cost} XP`}
              </p>

              {isSelected ? (
                <button disabled className="w-full py-1.5 rounded-lg text-[11px] font-bold uppercase bg-fuchsia-500/30 text-fuchsia-200 cursor-default">
                  ✓ Selected
                </button>
              ) : isOwned ? (
                <button
                  onClick={() => handleSelect(a)}
                  className="w-full py-1.5 rounded-lg text-[11px] font-bold uppercase bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white hover:opacity-90"
                >
                  Select
                </button>
              ) : (
                <button
                  onClick={() => handleBuy(a)}
                  disabled={!canAfford}
                  className={`w-full py-1.5 rounded-lg text-[11px] font-bold uppercase ${
                    canAfford
                      ? "bg-gradient-to-r from-yellow-400 to-pink-500 text-black hover:opacity-90"
                      : "bg-slate-700 text-slate-400 cursor-not-allowed"
                  }`}
                >
                  {canAfford ? "Unlock" : "Locked"}
                </button>
              )}
            </div>
          );
        })}
      </div>

      <Navbar />
    </div>
  );
}

const Stat = ({ label, value, color, small }) => (
  <div className="bg-slate-900/80 border border-white/10 rounded-xl p-3 text-center hover:border-fuchsia-400/40 transition">
    <p className="text-[9px] uppercase tracking-widest text-slate-400 mb-1">{label}</p>
    <p className={`${small ? "text-sm" : "text-lg"} font-bold ${color} truncate`}>{value}</p>
  </div>
);