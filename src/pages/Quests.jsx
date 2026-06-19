import { useState } from "react";
import Navbar from "../components/Navbar";
import {
  getDailyQuests,
  isQuestClaimed,
  claimQuestReward,
} from "../utils/storage";

export default function Quests() {
  const [quests, setQuests] = useState(getDailyQuests());
  const [, force] = useState(0);

  const refresh = () => { setQuests(getDailyQuests()); force(n => n + 1); };

  const handleClaim = (q) => {
    const res = claimQuestReward(q);
    if (res.claimed) {
      alert(`🎉 +${res.amount} XP claimed!`);
      refresh();
    } else {
      alert(res.reason === "already-claimed" ? "Already claimed." : "Not complete yet.");
    }
  };

  return (
    <div className="min-h-screen p-5 pb-28 text-white">
      <h1 className="text-4xl font-extrabold mb-1 bg-gradient-to-r from-cyan-300 to-fuchsia-500 bg-clip-text text-transparent">
        Quest Board
      </h1>
      <p className="text-slate-400 text-sm mb-6">Complete quests, claim bonus XP</p>

      <ul className="space-y-3">
        {quests.map((q) => {
          const pct = Math.min(100, (q.progress / q.target) * 100);
          const done = q.progress >= q.target;
          const claimed = isQuestClaimed(q);
          return (
            <li
              key={q.id}
              data-testid={`quest-${q.id}`}
              className={`p-4 rounded-2xl border transition ${
                claimed
                  ? "bg-emerald-900/20 border-emerald-400/30"
                  : done
                  ? "bg-yellow-900/20 border-yellow-400/50 shadow-[0_0_25px_rgba(250,204,21,0.25)]"
                  : "bg-slate-900/80 border-white/10"
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-[10px] uppercase tracking-widest opacity-70">
                    {q.type === "weekly" ? "Weekly" : q.type === "streak" ? "Streak" : "Daily"}
                  </p>
                  <p className="font-bold">{q.subtitle}</p>
                </div>
                <span className="text-xs font-bold bg-black/40 px-2 py-1 rounded-full">
                  +{q.reward} XP
                </span>
              </div>
              <div className="h-2 bg-black/30 rounded-full overflow-hidden mb-2">
                <div
                  className={`h-full transition-all ${
                    done ? "bg-gradient-to-r from-yellow-400 to-pink-500" : "bg-fuchsia-400"
                  }`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <div className="flex justify-between items-center">
                <p className="text-[10px] opacity-80">{q.progress}/{q.target}</p>
                <button
                  data-testid={`claim-${q.id}-btn`}
                  onClick={() => handleClaim(q)}
                  disabled={!done || claimed}
                  className={`px-3 py-1 rounded-lg text-xs font-bold uppercase ${
                    claimed
                      ? "bg-emerald-500/30 text-emerald-200"
                      : done
                      ? "bg-gradient-to-r from-yellow-400 to-pink-500 text-black"
                      : "bg-slate-700 text-slate-400"
                  }`}
                >
                  {claimed ? "Claimed" : done ? "Claim" : "Locked"}
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      <Navbar />
    </div>
  );
}