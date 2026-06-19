// src/data/catalogs.js
// Single source of truth for avatars + rewards

const avatarFiles = import.meta.glob(
  "../assets/avatars/*",
  { eager: true, import: "default" }
);

const getAvatar = (num) => {
  const pattern = new RegExp(`avatar0?${num}(?![0-9])`, "i");
  const match = Object.entries(avatarFiles).find(([path]) => {
    const filename = path.split("/").pop();
    return pattern.test(filename);
  });
  return match ? match[1] : "";
};

const a1=getAvatar(1),  a2=getAvatar(2),  a3=getAvatar(3),  a4=getAvatar(4);
const a5=getAvatar(5),  a6=getAvatar(6),  a7=getAvatar(7),  a8=getAvatar(8);
const a9=getAvatar(9),  a10=getAvatar(10),a11=getAvatar(11),a12=getAvatar(12);

/* === AVATAR CATALOG === */
export const AVATARS = [
  { id: "casual-boy",    name: "Casual Boy",    url: a1,  cost: 0    },
  { id: "casual-girl",   name: "Casual Girl",   url: a2,  cost: 0    },
  { id: "dog",           name: "Dog",           url: a4,  cost: 500  },
  { id: "cat",           name: "Cat",           url: a3,  cost: 500  },
  { id: "gamer-boy",     name: "Gamer Boy",     url: a7,  cost: 1000 },
  { id: "gamer-girl",    name: "Gamer Girl",    url: a8,  cost: 1000 },
  { id: "anime-boy",     name: "Anime Boy",     url: a5,  cost: 2500 },
  { id: "anime-girl",    name: "Anime Girl",    url: a6,  cost: 2500 },
  { id: "robot",         name: "Robot",         url: a9,  cost: 5000 },
  { id: "astronaut",     name: "Astronaut",     url: a10, cost: 5000 },
  { id: "cyber-warrior", name: "Cyber Warrior", url: a11, cost: 5000 },
  { id: "legend-knight", name: "Legend Knight", url: a12, cost: 5000 },
];

/* === REWARD CATALOG === */
export const REWARDS = [
  { id: "movie",     name: "Watch a Movie",     icon: "🎬", cost: 200  },
  { id: "snack",     name: "Favorite Snack",    icon: "🍫", cost: 600  },
  { id: "game",      name: "Gaming Hour",       icon: "🎮", cost: 1500 },
  { id: "big-treat", name: "Weekend Getaway",   icon: "🏖️", cost: 4000 },
];

/* === RARITY === */
export const RARITY = {
  0:    { label: "Common",    color: "text-slate-300",  border: "border-slate-500/40",  ring: "ring-slate-400",  glow: "" },
  500:  { label: "Rare",      color: "text-cyan-300",   border: "border-cyan-400/50",   ring: "ring-cyan-400",   glow: "shadow-[0_0_15px_rgba(34,211,238,0.25)]" },
  1000: { label: "Epic",      color: "text-purple-300", border: "border-purple-400/50", ring: "ring-purple-400", glow: "shadow-[0_0_15px_rgba(168,85,247,0.30)]" },
  2500: { label: "Legendary", color: "text-yellow-300", border: "border-yellow-400/60", ring: "ring-yellow-400", glow: "shadow-[0_0_18px_rgba(250,204,21,0.40)]" },
  5000: { label: "Mythic",    color: "text-pink-300",   border: "border-pink-400/60",   ring: "ring-pink-400",   glow: "shadow-[0_0_22px_rgba(236,72,153,0.45)]" },
};
export const rarityFor = (cost) => RARITY[cost] || RARITY[0];