
export const QUOTES = [
  "Discipline is choosing what you want most over what you want now.",
  "Small habits make a big difference.",
  "You don't rise to the level of your goals — you fall to the level of your systems.",
  "Every action is a vote for the person you wish to become.",
  "The secret of your future is hidden in your daily routine.",
  "Win the morning, win the day.",
  "Consistency beats intensity.",
  "One percent better every day.",
  "Don't break the chain.",
  "Motivation gets you started. Habit keeps you going.",
];

export function getTodayQuote() {
  const day = new Date().getDate();
  return QUOTES[day % QUOTES.length];
}