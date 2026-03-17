"use client";
import { motion, MotionValue, useTransform, useMotionValueEvent } from "framer-motion";
import { carData } from "@/data/carData";

interface Props {
  scrollYProgress: MotionValue<number>;
}

export default function ZondaExperience({ scrollYProgress }: Props) {
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Scroll progress updated
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.25, 0.33], [1, 1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.33], [0, -50]);

  const designOpacity = useTransform(scrollYProgress, [0.25, 0.33, 0.41, 0.58, 0.66], [0, 0, 1, 1, 0]);
  const designY = useTransform(scrollYProgress, [0.33, 0.66], [50, -50]);

  const engineOpacity = useTransform(scrollYProgress, [0.58, 0.66, 0.75, 1], [0, 0, 1, 1]);
  const engineY = useTransform(scrollYProgress, [0.66, 1], [50, 0]);

  return (
    <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-center px-12 md:px-24">
      {/* HUD Background elements */}
      <div className="absolute inset-0 scanlines opacity-10" />

      {/* Top Left Decorator */}
      <div className="absolute top-32 left-12 w-32 border-t border-l border-white/10 h-32" />
      {/* Bottom Right Decorator */}
      <div className="absolute bottom-32 right-12 w-32 border-b border-r border-white/10 h-32" />

      <motion.div
        style={{ opacity: heroOpacity, y: heroY }}
        className="absolute inset-0 flex flex-col items-start justify-center px-12 md:px-24"
      >
        <div className="mb-4 flex items-center gap-4">
          <div className="w-12 h-[1px] bg-pagani-gold" />
          <span className="font-orbitron text-[10px] tracking-[0.4em] text-pagani-gold uppercase">Model Selection</span>
        </div>
        <h1 className="font-orbitron text-5xl md:text-9xl font-black tracking-tighter text-white uppercase drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
          {carData.hero.title}
        </h1>
        <div className="mt-8 flex flex-col md:flex-row md:items-center gap-8">
          <div className="relative group overflow-hidden">
            <p className="font-rajdhani text-2xl text-pagani-gold tracking-widest border border-pagani-gold/50 px-8 py-3 bg-pagani-gold/5 backdrop-blur-sm relative z-10">
              {carData.hero.price}
            </p>
            <div className="absolute inset-0 bg-pagani-gold transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 opacity-20" />
          </div>
          <p className="font-rajdhani uppercase tracking-[0.4em] text-white/50 text-xs border-l border-white/20 pl-6">
            {carData.hero.cta}
          </p>
        </div>
      </motion.div>

      <motion.div
        style={{ opacity: designOpacity, y: designY }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-12 md:px-24"
      >
        <div className="relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
            className="absolute -inset-24 border border-dashed border-white/5 rounded-full"
          />
          <h2 className="font-orbitron text-4xl md:text-7xl font-bold gold-gradient tracking-[0.2em] uppercase mb-6 relative z-10">
            {carData.design.title}
          </h2>
          <div className="h-[2px] w-64 bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto mb-6" />
          <p className="font-rajdhani text-xl md:text-3xl text-white/90 tracking-[0.3em] font-bold uppercase">
            {carData.design.text}
          </p>
        </div>
      </motion.div>

      <motion.div
        style={{ opacity: engineOpacity, y: engineY }}
        className="absolute inset-0 flex flex-col items-end justify-center text-right px-12 md:px-24"
      >
        <div className="mb-6 flex flex-col items-end gap-2">
          <span className="font-orbitron text-[10px] tracking-[0.4em] text-bright-gold/50 uppercase italic">Power Output</span>
          <h2 className="font-orbitron text-5xl md:text-8xl font-bold text-white tracking-widest uppercase">
            {carData.engine.title}
          </h2>
        </div>

        <div className="border-r-4 border-bright-gold pr-10 py-4 bg-gradient-to-l from-bright-gold/5 to-transparent">
          <div className="flex items-baseline justify-end gap-2 mb-2">
            <span className="font-rajdhani text-4xl md:text-6xl text-white font-bold">348.36 CC</span>
            <span className="font-rajdhani text-sm text-bright-gold uppercase tracking-widest">Aspirated</span>
          </div>
          <div className="h-[1px] w-full bg-white/10 my-4" />
          <p className="font-rajdhani text-xl md:text-3xl text-white/80 tracking-[0.2em] uppercase font-light font-bold">
            20.78 BHP / 5500 RPM
          </p>
        </div>
      </motion.div>
    </div>
  );
}
