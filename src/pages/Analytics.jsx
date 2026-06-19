import Navbar from "../components/Navbar";
import HabitHeatmap from "../components/HabitHeatmap";
import HabitCalendar from "../components/HabitCalendar";
import {
  getXP, getTotalCompleted, getHabits, getActivity,
  getBestStreak, getAvgXpPerDay, getUnlockedRewards,
} from "../utils/storage";
import {
  ResponsiveContainer, LineChart, Line, BarChart, Bar,
  XAxis, YAxis, Tooltip, CartesianGrid,
} from "recharts";

export default function Analytics() {
  const xp       = getXP();
  const total    = getTotalCompleted();
  const habits   = getHabits();
  const activity = getActivity();

  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86400000);
    const key = d.toISOString().slice(0, 10);
    days.push({
      day: d.toLocaleDateString("en", { weekday: "short" }),
      completed: activity[key] || 0,
    });
  }

  const xpData = days.map((d, i) => ({
    day: d.day,
    xp: days.slice(0, i + 1).reduce((s, x) => s + x.completed * 20, 0),
  }));

  const doneCount = habits.filter((h) => h.done).length;
  const productivity = Math.min(
    100,
    Math.round((days.reduce((s, d) => s + d.completed, 0) / 21) * 100)
  );

  return (
    <div className="min-h-screen px-5 pt-6 pb-28 text-white max-w-2xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-1 bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">
        Analytics
      </h1>
      <p className="text-slate-400 text-sm mb-6">Track your journey</p>

      {/* KPIs */}
      <div className="grid grid-cols-3 gap-3 mb-3">
        <Kpi label="Total XP"     value={xp}                 color="text-yellow-300" />
        <Kpi label="Habits Done"  value={total}              color="text-emerald-300" />
        <Kpi label="Productivity" value={`${productivity}%`} color="text-fuchsia-300" />
      </div>
      <div className="grid grid-cols-3 gap-3 mb-5">
        <Kpi label="Best Streak"  value={`${getBestStreak()}🔥`}        color="text-orange-300" />
        <Kpi label="Avg XP / Day" value={getAvgXpPerDay()}              color="text-cyan-300" />
        <Kpi label="Rewards"      value={getUnlockedRewards().length}    color="text-pink-300" />
      </div>

      {/* 30-day Calendar */}
      <Card title="Habit History (30 days)">
        <HabitCalendar />
      </Card>

      <Card title="XP Growth (7 days)">
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={xpData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="day" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid #334155", borderRadius: 8 }} />
            <Line type="monotone" dataKey="xp" stroke="#a855f7" strokeWidth={3} dot={{ fill: "#a855f7" }} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <Card title="Weekly Activity">
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={days}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="day" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid #334155", borderRadius: 8 }} />
            <Bar dataKey="completed" fill="#ec4899" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card title="Habit Status">
        <div className="flex items-center gap-6">
          <div className="flex-1">
            <p className="text-3xl font-bold text-emerald-300">{doneCount}</p>
            <p className="text-xs text-slate-400">Completed</p>
          </div>
          <div className="flex-1">
            <p className="text-3xl font-bold text-cyan-300">{habits.length - doneCount}</p>
            <p className="text-xs text-slate-400">Active</p>
          </div>
        </div>
      </Card>

      <Card title="Activity Heatmap (12 weeks)">
        <HabitHeatmap activity={activity} />
      </Card>

      <Navbar />
    </div>
  );
}

const Kpi = ({ label, value, color }) => (
  <div className="bg-slate-900/80 border border-white/10 rounded-xl p-3 text-center hover:border-fuchsia-400/40 transition">
    <p className="text-[10px] uppercase tracking-widest text-slate-400">{label}</p>
    <p className={`text-xl font-bold mt-1 ${color}`}>{value}</p>
  </div>
);

const Card = ({ title, children }) => (
  <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-4 mb-4">
    <h3 className="text-sm font-bold mb-3 text-slate-300">{title}</h3>
    {children}
  </div>
);