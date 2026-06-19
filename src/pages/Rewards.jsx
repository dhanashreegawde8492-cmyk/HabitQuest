import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getXP, getUnlockedRewards, setUnlockedRewards } from "../utils/storage";

const REWARDS = [
  { id: "bronze",   name: "Bronze Badge", cost: 200,  icon: "🥉", tier: "Common",    accent: "from-amber-700/40 to-orange-900/40", border: "border-amber-600/50" },
  { id: "silver",   name: "Silver Badge", cost: 600,  icon: "🥈", tier: "Rare",      accent: "from-slate-400/30 to-slate-700/40",  border: "border-slate-300/40" },
  { id: "gold",     name: "Golden Crown", cost: 1500, icon: "👑", tier: "Epic",      accent: "from-yellow-500/40 to-amber-700/40", border: "border-yellow-400/60" },
  { id: "legend",   name: "Legend Title", cost: 4000, icon: "⚔️", tier: "Legendary", accent: "from-fuchsia-600/40 to-purple-900/50", border: "border-fuchsia-400/60" },
];

export default function Rewards() {
  const [xp, setXp] = useState(0);
  const [unlocked, setUnlocked] = useState([]);

  useEffect(() => { setXp(getXP()); setUnlocked(getUnlockedRewards()); }, []);

  const handleUnlock = (r) => {
    if (unlocked.includes(r.id)) return;
    if (xp >= r.cost) {
      const next = [...unlocked, r.id];
      setUnlocked(next); setUnlockedRewards(next);
      alert(`🎉 Success! You have unlocked the ${r.name}!`);
    } else {
      alert(`❌ Not Enough XP! Need ${r.cost - xp} more XP for ${r.name}.`);
    }
  };

  return (
    <div className="min-h-screen p-5 pb-28 text-white">
      <h1 className="text-4xl font-extrabold mb-1 bg-gradient-to-r from-yellow-300 via-fuchsia-400 to-purple-400 bg-clip-text text-transparent">
        Rewards Vault
      </h1>
      <p className="text-slate-400 text-sm mb-6">⚡ {xp.toLocaleString()} XP available</p>

      <div className="grid grid-cols-2 gap-4">
        {REWARDS.map((r) => {
          const isUnlocked = unlocked.includes(r.id);
          const canAfford = xp >= r.cost;
          return (
            <div key={r.id} className={`rounded-2xl p-5 border ${r.border} bg-gradient-to-br ${r.accent} backdrop-blur-md`}>
              <div className="absolute"></div>
              <div className="text-5xl mb-3">{r.icon}</div>
              <p className="text-[10px] uppercase tracking-widest text-white/60 mb-1">{r.tier}</p>
              <h3 className="text-lg font-bold mb-1">{r.name}</h3>
              <p className="text-xs text-slate-300 mb-4">{r.cost} XP</p>
              {isUnlocked ? (
                <div className="w-full py-2 rounded-xl bg-emerald-500/20 border border-emerald-400/60 text-emerald-300 text-xs font-bold uppercase text-center">
                  ✓ Unlocked
                </div>
              ) : (
                <button onClick={() => handleUnlock(r)} disabled={!canAfford}
                  className={`w-full py-2 rounded-xl text-xs font-bold uppercase tracking-wider ${
                    canAfford ? "bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white" : "bg-white/5 text-slate-500 border border-white/10 cursor-not-allowed"
                  }`}>
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