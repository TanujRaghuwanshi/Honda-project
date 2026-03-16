"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 1000);
          return 100;
        }
        return prev + Math.random() * 5;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-pagani-black flex flex-col items-center justify-center p-12 overflow-hidden"
    >
      <div className="absolute inset-0 scanlines opacity-30" />
      <div className="absolute top-0 left-0 w-full h-1 bg-pagani-gold/20">
        <motion.div
          className="h-full bg-pagani-gold shadow-[0_0_15px_#D4AF37]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h2 className="font-orbitron text-sm tracking-[0.5em] text-pagani-gold uppercase mb-4">
          Initializing Sequence
        </h2>
        <div className="font-orbitron font-bold text-6xl md:text-8xl text-white tracking-tighter mb-8">
          {Math.floor(progress)}<span className="text-pagani-gold/50">%</span>
        </div>
        
        <div className="flex justify-center gap-1">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className={`w-1 h-3 ${i / 20 * 100 < progress ? 'bg-pagani-gold' : 'bg-white/10'}`}
              animate={i / 20 * 100 < progress ? { opacity: [0.5, 1, 0.5] } : {}}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          ))}
        </div>
      </motion.div>

      <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end font-rajdhani text-[10px] tracking-[0.3em] text-white/30 uppercase">
        <div>System: Honda-OS v4.2.0</div>
        <div className="text-right">
          Loading frame data...<br />
          Buffer stream active
        </div>
      </div>
    </motion.div>
  );
}
