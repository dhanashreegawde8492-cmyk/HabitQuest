import { getXP, getOwnedAvatars, getUnlockedRewards } from "../utils/storage";
import { AVATARS, REWARDS } from "../data/catalogs";

const getNext = (catalog, ownedIds) => {
  const remaining = catalog
    .filter((item) => !ownedIds.includes(item.id) && item.cost > 0)
    .sort((a, b) => a.cost - b.cost);
  return remaining[0] || null;
};

export default function NextUnlock() {
  const xp           = getXP();
  const ownedAvatars = getOwnedAvatars();
  const ownedRewards = getUnlockedRewards();

  const nextAvatar = getNext(AVATARS, [...ownedAvatars, "casual-boy", "casual-girl"]);
  const nextReward = getNext(REWARDS, ownedRewards);

  if (!nextAvatar && !nextReward) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
      {nextAvatar && (
        <UnlockCard
          label="Next Avatar"
          name={nextAvatar.name}
          thumb={nextAvatar.url}
          cost={nextAvatar.cost}
          xp={xp}
          accent="from-purple-500 to-fuchsia-500"
        />
      )}
      {nextReward && (
        <UnlockCard
          label="Next Reward"
          name={nextReward.name}
          icon={nextReward.icon}
          cost={nextReward.cost}
          xp={xp}
          accent="from-yellow-400 to-pink-500"
        />
      )}
    </div>
  );
}

const UnlockCard = ({ label, name, thumb, icon, cost, xp, accent }) => {
  const pct = Math.min(100, (xp / cost) * 100);
  const remaining = Math.max(0, cost - xp);
  const ready = remaining === 0;

  return (
    <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-4 flex gap-3 items-center">
      {thumb ? (
        <img src={thumb} alt={name} className="w-14 h-14 rounded-xl object-cover border border-white/10" />
      ) : (
        <div className="w-14 h-14 rounded-xl bg-slate-800 flex items-center justify-center text-2xl">
          {icon}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-[10px] uppercase tracking-widest text-slate-400">{label}</p>
        <p className="font-bold text-sm truncate">{name}</p>
        <div className="h-1.5 bg-black/40 rounded-full overflow-hidden mt-1.5">
          <div className={`h-full bg-gradient-to-r ${accent} transition-all`} style={{ width: `${pct}%` }} />
        </div>
        <p className="text-[10px] mt-1 text-slate-400">
          {ready ? "✅ Ready to unlock!" : `${xp} / ${cost} XP · ${remaining} to go`}
        </p>
      </div>
    </div>
  );
};