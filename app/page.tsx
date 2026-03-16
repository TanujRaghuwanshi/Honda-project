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
              title="Powertrain" 
              desc="Custom V12 naturally aspirated engine mounted longitudinally for optimal weight distribution." 
              number="01"
            />
            <FeatureCard 
              title="Aerodynamics" 
              desc="Active aero-flaps engineered to provide maximum downforce while retaining the signature silhouette." 
              number="02"
            />
            <FeatureCard 
              title="Chassis" 
              desc="Carbo-titanium core structure offering unprecedented stiffness while reducing weight by 15%." 
              number="03"
            />
          </div>
          
          <footer className="mt-48 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 font-orbitron text-[8px] tracking-[0.5em] text-white/20 uppercase">
            <div>&copy; {new Date().getFullYear()} Honda Showcase Experience.</div>
            <div className="flex gap-12">
              <a href="#" className="hover:text-pagani-gold transition-colors">Privacy</a>
              <a href="#" className="hover:text-pagani-gold transition-colors">Contact</a>
              <a href="#" className="hover:text-pagani-gold transition-colors">Press</a>
            </div>
            <div>Crafted with Precision by Gemini</div>
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
