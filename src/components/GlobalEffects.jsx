import { useEffect, useState } from "react";
import Popup from "./Popup";
import {
  claimDailyReward,
  canClaimDailyReward,
  getXP,
  getUnlockedAchievements,
  setUnlockedAchievements,
} from "../utils/storage";
import { ACHIEVEMENTS, checkNewlyUnlocked } from "../utils/achievements";

export default function GlobalEffects() {
  const [reward, setReward] = useState(null);
  const [achievement, setAchievement] = useState(null);

  // Daily login reward
  useEffect(() => {
    if (canClaimDailyReward()) {
      const earned = claimDailyReward();
      if (earned) setReward(earned);
    }
  }, []);

  // Achievement watcher (poll every 1.5s — cheap, no Firestore)
  useEffect(() => {
    const tick = () => {
      const xp = getXP();
      const unlocked = getUnlockedAchievements();
      const fresh = checkNewlyUnlocked(xp, unlocked);
      if (fresh.length) {
        const next = fresh[0];
        setUnlockedAchievements([...unlocked, next.id]);
        setAchievement(next);
      }
    };
    tick();
    const id = setInterval(tick, 1500);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <Popup
        open={reward !== null}
        onClose={() => setReward(null)}
        icon="🎁"
        title="Daily Reward Claimed!"
        subtitle={`+${reward} XP added to your account`}
        accent="purple"
      />
      <Popup
        open={achievement !== null}
        onClose={() => setAchievement(null)}
        icon={achievement?.icon}
        title={`${achievement?.title} Unlocked!`}
        subtitle={achievement?.desc}
        accent="gold"
      />
    </>
  );
}