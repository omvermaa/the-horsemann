"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";

export default function MandatoryModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    // Check if user has already submitted or dismissed in this session
    const status = sessionStorage.getItem("mandatoryFormStatus");
    if (status === "submitted" || status === "dismissed") {
      setHasSubmitted(true);
    }
  }, []);

  // Handle Scroll Locking properly including Lenis
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.lenis?.stop();
    } else {
      document.body.style.overflow = "unset";
      window.lenis?.start();
    }
    
    return () => {
      document.body.style.overflow = "unset";
      window.lenis?.start();
    };
  }, [isOpen]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Trigger after scrolling 600px and only if not already shown/submitted
    if (latest > 600 && !isOpen && !hasSubmitted) {
      setIsOpen(true);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSubmitted(true);
    setIsOpen(false);
    sessionStorage.setItem("mandatoryFormStatus", "submitted");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Backdrop with extreme blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-[20px]"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-[0_0_100px_rgba(212,175,55,0.1)] overflow-hidden"
          >
            {/* Decorative Gold Accent */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
            
            {/* Close Button */}
            <button 
              onClick={() => {
                setIsOpen(false);
                setHasSubmitted(true);
                sessionStorage.setItem("mandatoryFormStatus", "dismissed");
              }}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 border border-white/10 text-white/40 hover:text-gold hover:border-gold/40 transition-all active:scale-95 z-10"
              aria-label="Close modal"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            
            <div className="text-center mb-8">
              <span className="text-gold text-[10px] uppercase tracking-[0.5em] font-bold block mb-4">
                Exclusive Intel
              </span>
              <h2 className="text-3xl md:text-4xl text-white font-light tracking-tight mb-4">
                Prioritize Your <span className="italic text-gold">Growth.</span>
              </h2>
              <p className="text-white/40 text-sm font-light">
                Secure your spot in our elite strategy cycle. We only take 5 projects | 3 clients per month.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold px-4">Digital Identity</label>
                <input 
                  required
                  type="text" 
                  placeholder="Full Name"
                  className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-gold/50 transition-all font-light"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold px-4">Direct Channel</label>
                <input 
                  required
                  type="email" 
                  placeholder="Email Address"
                  className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-gold/50 transition-all font-light"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold px-4">Current Scale</label>
                <select 
                  className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 text-white/70 focus:outline-none focus:border-gold/50 transition-all font-light appearance-none"
                >
                  <option className="bg-black">Starting out</option>
                  <option className="bg-black">10k - 50k followers</option>
                  <option className="bg-black">50k - 100k+ followers</option>
                  <option className="bg-black">Established Brand</option>
                </select>
              </div>

              <button 
                type="submit"
                className="w-full mt-6 bg-gold text-black rounded-full px-8 py-5 text-xs uppercase tracking-[0.3em] font-bold shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_35px_rgba(212,175,55,0.4)] transition-all active:scale-95"
              >
                Claim Priority Access
              </button>
            </form>

            <p className="text-center mt-6 text-[9px] text-white/20 uppercase tracking-widest leading-relaxed">
              By submitting, you agree to enter the Horsemann ecosystem.
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
