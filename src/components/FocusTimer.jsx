import { useEffect, useRef, useState } from "react";
import { addXP } from "../utils/storage";

const DURATION = 25 * 60; // 25 minutes
const XP_REWARD = 20;

export default function FocusTimer() {
  const [secs, setSecs]       = useState(DURATION);
  const [running, setRunning] = useState(false);
  const [paused, setPaused]   = useState(false);
  const [done, setDone]       = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!running) return;
    ref.current = setInterval(() => {
      setSecs((s) => {
        if (s <= 1) {
          clearInterval(ref.current);
          setRunning(false);
          setDone(true);
          addXP(XP_REWARD);
          return DURATION;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(ref.current);
  }, [running]);

  const start = () => { setPaused(false); setRunning(true); };
  const pause = () => { setRunning(false); setPaused(true); };
  const reset = () => {
    clearInterval(ref.current);
    setRunning(false);
    setPaused(false);
    setSecs(DURATION);
  };

  const m = String(Math.floor(secs / 60)).padStart(2, "0");
  const s = String(secs % 60).padStart(2, "0");
  const pct = ((DURATION - secs) / DURATION) * 100;

  return (
    <>
      <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-5 text-center">
        <p className="text-[10px] uppercase tracking-widest text-cyan-300 mb-2">Focus Timer</p>
        <p className="text-6xl font-black font-mono text-white mb-3">{m}:{s}</p>

        {/* progress ring */}
        <div className="h-1.5 bg-black/40 rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 to-blue-600 transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>

        <div className="flex gap-2 justify-center flex-wrap">
          {!running && !paused && (
            <button onClick={start} className="px-6 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-700 font-bold uppercase text-xs">
              ▶ Start
            </button>
          )}
          {running && (
            <button onClick={pause} className="px-6 py-2 rounded-xl bg-yellow-500 text-black font-bold uppercase text-xs">
              ⏸ Pause
            </button>
          )}
          {paused && !running && (
            <button onClick={start} className="px-6 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-600 font-bold uppercase text-xs">
              ▶ Resume
            </button>
          )}
          <button onClick={reset} className="px-4 py-2 rounded-xl bg-slate-700 font-bold uppercase text-xs">
            ↻ Reset
          </button>
        </div>
        <p className="text-[10px] text-slate-500 mt-3">Complete a session to earn +{XP_REWARD} XP</p>
      </div>

      {/* Completion popup */}
      {done && (
        <div
          onClick={() => setDone(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
        >
          <div className="px-8 py-10 rounded-3xl bg-gradient-to-br from-cyan-900/80 to-slate-950 border border-cyan-400/40 shadow-[0_0_50px_rgba(34,211,238,0.4)] text-center max-w-sm mx-4">
            <p className="text-6xl mb-3">🎉</p>
            <h2 className="text-2xl font-extrabold mb-2">Focus Session Complete!</h2>
            <p className="text-sm text-slate-300 mb-5">You earned <span className="text-yellow-300 font-bold">+{XP_REWARD} XP</span> for staying focused.</p>
            <button
              onClick={() => setDone(false)}
              className="px-6 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-700 font-bold uppercase text-xs"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </>
  );
}