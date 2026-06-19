export default function DailyRewardPopup({ amount, onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-gradient-to-br from-yellow-500/20 to-fuchsia-600/20 border border-yellow-400/60 rounded-3xl p-8 max-w-sm w-full text-center shadow-[0_0_60px_rgba(234,179,8,0.4)]">
        <div className="text-6xl mb-3">🎁</div>
        <h2 className="text-2xl font-extrabold text-yellow-300 mb-2">Daily Reward Claimed!</h2>
        <p className="text-3xl font-bold text-white mb-6">+{amount} XP</p>
        <button onClick={onClose} className="w-full py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-fuchsia-500 text-white font-bold uppercase tracking-wider">
          Awesome!
        </button>
      </div>
    </div>
  );
}