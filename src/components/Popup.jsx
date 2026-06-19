import { motion, AnimatePresence } from "framer-motion";

export default function Popup({ open, onClose, icon, title, subtitle, accent = "purple" }) {
  const accents = {
    purple: "from-purple-600 to-fuchsia-600 shadow-neon",
    gold:   "from-yellow-500 to-orange-500 shadow-neon-gold",
    cyan:   "from-cyan-500 to-blue-600 shadow-neon-cyan",
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-6"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.7, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className={`relative bg-gradient-to-br ${accents[accent]} p-[2px] rounded-3xl max-w-sm w-full`}
          >
            <div className="bg-slate-950 rounded-3xl p-8 text-center">
              <div className="text-6xl mb-4 animate-float">{icon}</div>
              <h2 className="text-2xl font-bold text-glow">{title}</h2>
              {subtitle && <p className="text-slate-300 mt-2">{subtitle}</p>}
              <button
                onClick={onClose}
                className="btn-neon mt-6 w-full"
              >
                Awesome!
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}