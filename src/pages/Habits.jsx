import { useState } from "react";
import Navbar from "../components/Navbar";
import {
  getHabits,
  addHabit,
  deleteHabit,
  toggleHabit,
} from "../utils/storage";

const HABIT_XP = 20; // 🔒 Fixed XP per habit — locked, cannot be changed

export default function Habits() {
  const [habits, setHabits] = useState(getHabits());
  const [title, setTitle] = useState("");

  const refresh = () => setHabits(getHabits());

  const handleAdd = () => {
    if (!title.trim()) return;
    addHabit({ title: title.trim(), xp: HABIT_XP });
    setTitle("");
    refresh();
  };

  const handleToggle = (id) => {
    toggleHabit(id);
    refresh();
  };

  const handleDelete = (id) => {
    deleteHabit(id);
    refresh();
  };

  return (
    <div className="min-h-screen px-5 pt-6 pb-28 text-white max-w-2xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-1 bg-gradient-to-r from-fuchsia-300 to-purple-500 bg-clip-text text-transparent">
        Habits
      </h1>
      <p className="text-slate-400 text-sm mb-6">
        Build your daily routine · Each habit = +{HABIT_XP} XP
      </p>

      {/* ADD HABIT — no XP input */}
      <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-4 mb-5">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          placeholder="What habit do you want to build?"
          className="w-full bg-slate-800 border border-white/10 rounded-xl px-3 py-2 mb-3 outline-none focus:border-fuchsia-400"
        />
        <button
          onClick={handleAdd}
          disabled={!title.trim()}
          className={`w-full py-2 rounded-xl font-bold uppercase text-xs transition ${
            title.trim()
              ? "bg-gradient-to-r from-fuchsia-500 to-purple-600 hover:opacity-90"
              : "bg-slate-700 text-slate-400 cursor-not-allowed"
          }`}
        >
          + Add Habit (+{HABIT_XP} XP)
        </button>
      </div>

      {/* LIST */}
      {habits.length === 0 ? (
        <div className="text-center mt-10">
          <p className="text-4xl mb-2">📋</p>
          <p className="text-slate-500">No habits yet. Add one above!</p>
        </div>
      ) : (
        <ul className="space-y-2">
          {habits.map((h) => (
            <li
              key={h.id}
              className={`flex items-center gap-3 p-3 rounded-xl border transition ${
                h.done
                  ? "bg-emerald-900/30 border-emerald-400/40"
                  : "bg-slate-900/80 border-white/10"
              }`}
            >
              <button
                onClick={() => handleToggle(h.id)}
                className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition ${
                  h.done
                    ? "bg-emerald-400 border-emerald-400 text-black"
                    : "border-slate-500 hover:border-fuchsia-400"
                }`}
              >
                {h.done ? "✓" : ""}
              </button>
              <div className="flex-1">
                <p
                  className={`font-semibold ${
                    h.done ? "line-through text-slate-400" : ""
                  }`}
                >
                  {h.title}
                </p>
                <p className="text-[10px] text-fuchsia-300">+{h.xp || HABIT_XP} XP</p>
              </div>
              <button
                onClick={() => handleDelete(h.id)}
                className="text-red-400 hover:text-red-300 text-sm px-2"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}

      <Navbar />
    </div>
  );
}