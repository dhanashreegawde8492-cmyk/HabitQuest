import confetti from "canvas-confetti";

export const fireConfetti = () => {
  const end = Date.now() + 1500;
  const colors = ["#a855f7", "#ec4899", "#fde047", "#22d3ee"];
  (function frame() {
    confetti({ particleCount: 4, angle: 60,  spread: 55, origin: { x: 0 }, colors });
    confetti({ particleCount: 4, angle: 120, spread: 55, origin: { x: 1 }, colors });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
};