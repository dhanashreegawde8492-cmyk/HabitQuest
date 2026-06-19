import { getActivity } from "../utils/storage";

export default function HabitCalendar() {
  const activity = getActivity();
  const days = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 29; i >= 0; i--) {
    const d = new Date(today.getTime() - i * 86400000);
    const key = d.toISOString().slice(0, 10);
    const count = activity[key] || 0;
    days.push({
      key,
      count,
      label: d.toLocaleDateString("en", { month: "short", day: "numeric" }),
    });
  }

  const activeDays = days.filter((d) => d.count > 0).length;

  const color = (c) => {
    if (c === 0) return "bg-slate-800";
    if (c < 2)  return "bg-emerald-900";
    if (c < 4)  return "bg-emerald-600";
    if (c < 6)  return "bg-emerald-400";
    return "bg-emerald-300";
  };

  return (
    <div>
      <div className="flex justify-between items-baseline mb-3">
        <p className="text-xs text-slate-400">Last 30 days</p>
        <p className="text-xs font-bold text-emerald-300">
          {activeDays} <span className="text-slate-400 font-normal">active days</span>
        </p>
      </div>

      <div className="grid grid-cols-10 gap-1.5">
        {days.map((d) => (
          <div
            key={d.key}
            title={`${d.label}: ${d.count} habits`}
            className={`aspect-square rounded ${color(d.count)} hover:ring-2 hover:ring-fuchsia-400 transition`}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-2 mt-4 text-[10px] text-slate-400">
        <span>Less</span>
        <div className="w-3 h-3 rounded bg-slate-800" />
        <div className="w-3 h-3 rounded bg-emerald-900" />
        <div className="w-3 h-3 rounded bg-emerald-600" />
        <div className="w-3 h-3 rounded bg-emerald-400" />
        <div className="w-3 h-3 rounded bg-emerald-300" />
        <span>More</span>
      </div>
    </div>
  );
}