"use client";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 px-8 md:px-20 py-8 flex justify-between items-center ${
        scrolled ? "glass border-b border-white/5 py-6" : "bg-transparent"
      }`}
    >
      <div className="relative group">
        <div className={`font-orbitron font-black text-3xl tracking-tighter uppercase transition-all duration-500 ${scrolled ? 'scale-90 text-pagani-gold' : 'scale-100 text-white'}`}>
          Honda
        </div>
        <div className="absolute -bottom-1 left-0 w-0 h-[1px] bg-pagani-gold group-hover:w-full transition-all duration-300" />
      </div>
      
      <div className="hidden md:flex gap-12 items-center">
        {['Heritage', 'Engineering', 'Custom', 'Inventory'].map((item) => (
          <a key={item} href="#" className="font-rajdhani text-[10px] tracking-[0.4em] uppercase text-white/40 hover:text-pagani-gold transition-colors duration-300">
            {item}
          </a>
        ))}
      </div>

      <button className="relative group">
        <div className="font-orbitron text-[10px] items-center flex gap-3 tracking-[0.3em] border border-pagani-gold/30 px-8 py-3 bg-pagani-gold/5 group-hover:bg-pagani-gold group-hover:text-pagani-black uppercase transition-all duration-300">
          <div className="w-1.5 h-1.5 bg-pagani-gold group-hover:bg-pagani-black rounded-full animate-pulse" />
          Inquire
        </div>
      </button>
    </nav>
  );
}
