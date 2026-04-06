"use client";

import { motion } from "framer-motion";
import SmoothScroll from "@/components/ui/SmoothScroll";
import FloatingNav from "@/components/ui/FloatingNav";

export default function ContactPage() {
  return (
    <SmoothScroll>
      <main className="relative w-full min-h-screen bg-background selection:bg-white selection:text-black">
        <FloatingNav />

        <div className="relative w-full min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-6 md:px-12 xl:px-24">
          {/* subtle background dot grid */}
          <div 
            className="absolute inset-0 opacity-[0.25] pointer-events-none mix-blend-overlay"
            style={{ 
              backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', 
              backgroundSize: '40px 40px' 
            }} 
          />

          <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 relative z-10">
            {/* Header & Info Section */}
            <motion.div 
              className="lg:w-1/2 flex flex-col justify-center"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-gold text-[10px] md:text-sm uppercase tracking-[0.5em] font-bold block mb-4 md:mb-6">
                Mount Up.
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tighter text-white uppercase leading-[0.9] mb-6 md:mb-8 text-left drop-shadow-lg">
                Initiate <br />
                <span className="italic text-gold drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]">Contact.</span>
              </h1>
              <p className="text-white/50 text-base md:text-lg max-w-md font-light leading-relaxed mb-12">
                Ready to dominate your digital space? Provide your details, and our strategic team will review your potential for partnership.
              </p>

              {/* Contact direct details */}
              <div className="flex flex-col gap-6 border-l border-white/10 pl-6">
                <div>
                  <span className="text-[10px] text-white/30 uppercase tracking-[0.3em] font-bold block mb-2">Direct Line</span>
                  <a href="mailto:hello@thehorsemann.com" className="text-xl md:text-2xl text-white font-light hover:text-gold transition-colors">
                    hello@thehorsemann.com
                  </a>
                </div>
                <div>
                  <span className="text-[10px] text-white/30 uppercase tracking-[0.3em] font-bold block mb-2">Social Intelligence</span>
                  <a href="https://instagram.com/thehorsemann" target="_blank" rel="noreferrer" className="text-xl md:text-2xl text-white font-light hover:text-gold transition-colors flex items-center gap-3">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                    @thehorsemann
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Form Section */}
            <motion.div 
              className="lg:w-1/2 w-full max-w-xl lg:max-w-none"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="bg-[#0a0a0a]/80 backdrop-blur-2xl p-8 md:p-12 rounded-[2.5rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold px-4">Name</label>
                      <input 
                        type="text" 
                        placeholder="John Doe"
                        className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-all font-light"
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold px-4">Email</label>
                      <input 
                        type="email" 
                        placeholder="john@protocol.com"
                        className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-all font-light"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold px-4">Brand / Company</label>
                    <input 
                      type="text" 
                      placeholder="Your brand handle or website"
                      className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-all font-light"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold px-4">Project Scope / Intel</label>
                    <textarea 
                      placeholder="Tell us what you're trying to build or conquer..."
                      rows={4}
                      className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] px-6 py-5 text-white placeholder:text-white/20 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-all font-light resize-none"
                      required
                    />
                  </div>

                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-4 w-full bg-gold text-black rounded-full px-8 py-5 text-xs md:text-sm uppercase tracking-[0.3em] font-bold shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_35px_rgba(212,175,55,0.5)] transition-shadow"
                    type="submit"
                  >
                    Transmit Signal
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
          
        </div>
      </main>
    </SmoothScroll>
  );
}
