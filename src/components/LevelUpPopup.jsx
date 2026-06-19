import { useEffect } from "react";
import { fireConfetti } from "../utils/confetti";

export default function LevelUpPopup({ level, onClose }) {
  useEffect(() => {
    fireConfetti();
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-[fadeIn_.2s_ease-out]"
    >
      <div
        className="relative px-10 py-12 rounded-3xl border border-yellow-400/40
          bg-gradient-to-br from-fuchsia-900/80 via-purple-900/80 to-slate-950
          shadow-[0_0_60px_rgba(250,204,21,0.45)]
          animate-[popIn_.5s_cubic-bezier(.2,.9,.3,1.2)] text-center"
      >
        <p className="text-xs uppercase tracking-[0.4em] text-yellow-300 mb-2">
          Level Up
        </p>
        <p className="text-7xl font-black bg-gradient-to-r from-yellow-300 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(250,204,21,0.6)]">
          Lv {level}
        </p>
        <p className="text-sm text-slate-300 mt-3">A new rank awaits, hero ⚔️</p>
        <button
          onClick={onClose}
          className="mt-6 px-6 py-2 rounded-xl bg-gradient-to-r from-yellow-400 to-pink-500 text-black font-bold uppercase text-xs tracking-widest"
        >
          Continue
        </button>
      </div>

      <style>{`
        @keyframes popIn {
          0%   { transform: scale(0.4) rotate(-6deg); opacity: 0; }
          70%  { transform: scale(1.08) rotate(2deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); }
        }
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
      `}</style>
    </div>
  );
}