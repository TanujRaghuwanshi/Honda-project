"use client";
import { useState, useRef } from "react";
import { useScroll, AnimatePresence, motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import ZondaScrollCanvas from "@/components/ZondaScrollCanvas";
import ZondaExperience from "@/components/ZondaExperience";
import LoadingScreen from "@/components/LoadingScreen";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <main className="bg-pagani-black min-h-screen font-rajdhani text-white selection:bg-pagani-gold selection:text-black antialiased relative">
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <Navbar />
      <div className="scrollbar" id="style-14">
        <div className="force-overflow"></div>
      </div>

      {/* SCROLL SEQUENCE (Locked for 600vh) */}
      <section ref={containerRef} className="h-[600vh] relative">
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-pagani-black">
          <ZondaScrollCanvas scrollYProgress={scrollYProgress} totalFrames={240} imageFolderPath="/images" />
          <ZondaExperience scrollYProgress={scrollYProgress} />

          {/* Decorative Corner lines */}
          <div className="absolute top-0 right-0 w-px h-64 bg-gradient-to-b from-white/10 to-transparent" />
          <div className="absolute bottom-0 left-0 w-px h-64 bg-gradient-to-t from-white/10 to-transparent" />
        </div>
      </section>

      {/* REST OF SITE (Scrolls naturally after sequence) */}
      <div className="relative z-20 bg-pagani-black py-32 px-12 md:px-32">
        <div className="max-w-7xl mx-auto">
          <header className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-12">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-[2px] bg-pagani-gold" />
                <span className="font-orbitron text-xs tracking-[0.5em] text-pagani-gold uppercase">01 / Mechanical Art</span>
              </div>
              <h2 className="font-orbitron text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">
                Specifications <br />
                <span className="text-white/20">& Features</span>
              </h2>
            </div>
            <p className="font-rajdhani text-xl text-white/40 max-w-md uppercase tracking-widest font-light leading-relaxed">
              Every curve, every bolt, every stitch is a testament to the pursuit of perfection. This is not just a machine; it's a legacy.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              title="Power & Torque"
              desc="21.07 PS @ 5500 rpm, 30 Nm @ 3000 rpm."
              number="01"
            />
            <FeatureCard
              title="Transmission"
              desc="5-speed manual, chain drive, self-start only."
              number="02"
            />
            <FeatureCard
              title="Suspension"
              desc="Telescopic front, twin hydraulic rear."
              number="03"
            />
            <FeatureCard
              title="Brakes"
              desc="Dual-channel ABS, front disc (310 mm), rear disc (240 mm), 2-piston front caliper, 1-piston rear caliper."
              number="04"
            />
            <FeatureCard
              title="Wheels & Tires"
              desc="19-inch front and 17-inch rear with tubeless, block-pattern tires."
              number="05"
            />
            <FeatureCard
              title="Dimensions"
              desc="180 kg kerb weight, 800 mm seat height, 168 mm ground clearance, 15-litre fuel tank, and 1441 mm wheelbase."
              number="06"
            />
          </div>

          <footer className="mt-48 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 font-orbitron text-[8px] tracking-[0.5em] text-white/20 uppercase">
            <div>&copy; {new Date().getFullYear()} Honda Showcase Experience.</div>
            <div className="flex gap-12">
              <a href="#" className="hover:text-pagani-gold transition-colors">Privacy</a>
              <a href="#" className="hover:text-pagani-gold transition-colors">Contact</a>
              <a href="#" className="hover:text-pagani-gold transition-colors">Press</a>
            </div>
            <div>Crafted for Hackathon by Team UNexT </div>
          </footer>
        </div>
      </div>
    </main>
  );
}

function FeatureCard({ title, desc, number }: { title: string, desc: string, number: string }) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="group p-10 bg-white/5 border border-white/10 relative overflow-hidden transition-all duration-500 hover:border-pagani-gold/30 hover:bg-white/[0.07]"
    >
      <div className="absolute top-0 right-0 p-6 font-orbitron text-3xl font-black text-white/5 group-hover:text-pagani-gold/10 transition-colors">
        {number}
      </div>
      <h3 className="font-orbitron font-bold text-xl text-pagani-gold uppercase mb-6 tracking-widest">{title}</h3>
      <p className="text-white/50 tracking-wide font-light leading-relaxed uppercase text-sm">{desc}</p>

      <div className="mt-8 pt-8 border-t border-white/5">
        <div className="flex gap-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className={`w-1 h-3 ${i < 3 ? 'bg-pagani-gold/50' : 'bg-white/10'}`} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
