"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function GlobalFooter() {
  const openModal = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("horsemann-open-modal"));
    }
  };

  return (
    <footer className="relative w-full bg-[#050505] border-t border-white/5 pt-20 pb-10 overflow-hidden shrink-0">
      
      {/* Background Subtle Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-32 bg-gold/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center">
        
        {/* Brand Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          {/* <Link href="/" className="inline-block group">
            <span 
              className="text-6xl md:text-8xl text-white/90 group-hover:text-gold transition-all duration-500 hover:scale-105 inline-block"
              style={{ fontFamily: 'var(--font-alex-brush)' }}
            >
              The Horsemann
            </span>
          </Link> */}
        </motion.div>

        {/* Navigation Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-20 text-center md:text-left">
          
          {/* Column 1: Ecosystem */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex flex-col items-center md:items-start space-y-4"
          >
            <span className="text-gold text-[10px] uppercase tracking-[0.4em] font-bold mb-2 block">Ecosystem</span>
            <Link href="/" className="text-white/40 text-xs uppercase tracking-[0.2em] hover:text-gold hover:scale-105 hover:brightness-125 active:scale-95 transition-all duration-300 inline-block">
              Headquarters
            </Link>
            <Link href="/services" className="text-white/40 text-xs uppercase tracking-[0.2em] hover:text-gold hover:scale-105 hover:brightness-125 active:scale-95 transition-all duration-300 inline-block">
              The Arsenal
            </Link>
            <Link href="/results" className="text-white/40 text-xs uppercase tracking-[0.2em] hover:text-gold hover:scale-105 hover:brightness-125 active:scale-95 transition-all duration-300 inline-block">
              Transformations
            </Link>
          </motion.div>

          {/* Column 2: Direct Intel */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center md:items-center space-y-4"
          >
            <span className="text-white/70 text-[10px] uppercase tracking-[0.4em] font-bold mb-2 block">Direct Intel</span>
            <button 
              onClick={openModal}
              className="text-white/40 text-xs uppercase tracking-[0.2em] hover:text-gold hover:scale-105 hover:brightness-125 active:scale-95 transition-all duration-300 inline-block"
            >
              Initiate Contact
            </button>
            <a href="#" className="text-white/40 text-xs uppercase tracking-[0.2em] hover:text-gold hover:scale-105 hover:brightness-125 active:scale-95 transition-all duration-300 inline-block">
              WhatsApp Secure
            </a>
            <button 
              onClick={openModal}
              className="text-white/40 text-[10px] uppercase tracking-[0.1em] italic hover:text-gold transition-colors inline-block mt-4 opacity-50"
            >
              Transmission Only
            </button>
          </motion.div>

          {/* Column 3: Networks */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col items-center md:items-end space-y-4"
          >
            <span className="text-white/70 text-[10px] uppercase tracking-[0.4em] font-bold mb-2 block">Networks</span>
            <a href="#" className="flex items-center gap-2 text-white/40 hover:text-gold hover:scale-105 hover:brightness-125 active:scale-95 transition-all duration-300 group inline-block">
              <span className="text-xs uppercase tracking-[0.2em]">Instagram</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
            </a>
            <a href="#" className="flex items-center gap-2 text-white/40 hover:text-gold hover:scale-105 hover:brightness-125 active:scale-95 transition-all duration-300 group inline-block">
              <span className="text-xs uppercase tracking-[0.2em]">LinkedIn</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
            </a>
          </motion.div>
        </div>

        {/* Separator */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

        {/* Base Layer */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-[9px] uppercase tracking-[0.3em]">
            Commanding the Digital Realm since MMXIX
          </p>
          <div className="flex items-center gap-2">
             <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
             <span className="text-gold text-[9px] uppercase tracking-widest font-bold">Systems Online</span>
          </div>
          <p className="text-white/20 text-[9px] uppercase tracking-widest">
            © {new Date().getFullYear()} The Horsemann
          </p>
        </div>

      </div>
    </footer>
  );
}
