export default function XPCard() {
  return (
    <div className="bg-slate-900 p-6 rounded-3xl">
      <h2 className="text-xl font-semibold">
        Level 1
      </h2>

      <div className="w-full bg-slate-700 h-4 rounded-full mt-4">
        <div className="bg-purple-500 h-4 rounded-full w-[30%]"></div>
      </div>

      <p className="mt-2">
        60 XP / 200 XP
      </p>
    </div>
  );
}