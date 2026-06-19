export default function HabitHeatmap({ activity }) {
  const weeks = 12;
  const cells = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = weeks * 7 - 1; i >= 0; i--) {
    const d = new Date(today.getTime() - i * 86400000);
    const key = d.toISOString().slice(0, 10);
    const count = activity[key] || 0;
    cells.push({ key, count });
  }

  const color = (c) => {
    if (c === 0) return "bg-slate-800";
    if (c < 2)  return "bg-fuchsia-900";
    if (c < 4)  return "bg-fuchsia-600";
    if (c < 6)  return "bg-fuchsia-400";
    return "bg-yellow-300";
  };

  return (
    <div className="grid grid-flow-col grid-rows-7 gap-1 overflow-x-auto">
      {cells.map((c) => (
        <div key={c.key} title={`${c.key}: ${c.count} habits`}
          className={`w-3 h-3 rounded-sm ${color(c.count)}`} />
      ))}
    </div>
  );
}