export default function AchievementPopup({ title, onClose }) {
  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-gradient-to-r from-amber-500/30 to-yellow-600/30 border border-amber-400/70 rounded-2xl px-6 py-4 backdrop-blur-md shadow-[0_0_30px_rgba(234,179,8,0.5)] flex items-center gap-3 animate-slide-down">
      <div className="text-3xl">🏆</div>
      <div>
        <p className="text-[10px] uppercase tracking-widest text-amber-300">Achievement Unlocked</p>
        <p className="font-bold text-white">{title}</p>
      </div>
      <button onClick={onClose} className="ml-4 text-white/60 hover:text-white">✕</button>
    </div>
  );
}