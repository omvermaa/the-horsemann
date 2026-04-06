"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import SmoothScroll from "@/components/ui/SmoothScroll";
import FloatingNav from "@/components/ui/FloatingNav";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    scale: "Starting out",
    projectScope: ""
  });
  
  const [showSuccess, setShowSuccess] = useState(false);
  const [countdown, setCountdown] = useState(6);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.phone.length !== 10) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        setShowSuccess(true);
      } else {
        alert("There was an issue transmitting your signal. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form", error);
      alert("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showSuccess && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else if (showSuccess && countdown === 0) {
      router.push('/');
    }
    return () => clearTimeout(timer);
  }, [showSuccess, countdown, router]);

  return (
    <SmoothScroll>
      <main className="relative w-full min-h-screen bg-background selection:bg-white selection:text-black">
        <FloatingNav />

        <div className="relative w-full min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-6 md:px-12 xl:px-24 overflow-hidden">
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
              <p className="text-white/50 text-sm md:text-base max-w-md font-light leading-relaxed mb-12">
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
              <div className="bg-[#0a0a0a]/80 backdrop-blur-3xl p-8 md:p-10 rounded-[2.5rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
                <AnimatePresence mode="wait">
                  {showSuccess ? (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="text-center py-12 flex flex-col items-center"
                    >
                      <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mb-8 border border-gold/30">
                        <motion.svg 
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.2 }}
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="#d4af37" 
                          strokeWidth="3" 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          className="w-10 h-10"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </motion.svg>
                      </div>
                      <h2 className="text-3xl text-white font-light mb-4 text-balance">Transmission <span className="italic text-gold">Received.</span></h2>
                      <p className="text-white/60 text-base font-light mb-12">
                        Your priority protocol has been initiated. Expect an orbital response shortly.
                      </p>
                      <div className="flex flex-col items-center gap-4">
                        <div className="text-[10px] text-white/30 uppercase tracking-[0.4em] font-bold">
                          Redirecting in {countdown}s
                        </div>
                        <div className="w-32 h-[2px] bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full bg-gold"
                            initial={{ width: "100%" }}
                            animate={{ width: "0%" }}
                            transition={{ duration: 6, ease: "linear" }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.form 
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit} 
                      className="flex flex-col gap-6"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold px-4">Digital Identity</label>
                          <input 
                            required
                            type="text" 
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Full Name"
                            className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-gold/50 transition-all font-light"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold px-4">Direct Channel</label>
                          <input 
                            required
                            type="email" 
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="Email Address"
                            className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-gold/50 transition-all font-light"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold px-4">Contact Number</label>
                          <input 
                            required
                            type="tel" 
                            value={formData.phone}
                            onChange={(e) => {
                              const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                              setFormData({ ...formData, phone: val });
                            }}
                            placeholder="10-digit Number"
                            className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-gold/50 transition-all font-light"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold px-4">Current Scale</label>
                          <div className="relative">
                            <select 
                              value={formData.scale}
                              onChange={(e) => setFormData({ ...formData, scale: e.target.value })}
                              className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 text-white/70 focus:outline-none focus:border-gold/50 transition-all font-light appearance-none"
                            >
                              <option value="Starting out" className="bg-black">Starting out</option>
                              <option value="10k - 50k followers" className="bg-black">10k-50k followers</option>
                              <option value="50k - 100k+ followers" className="bg-black">50k-100k+ followers</option>
                              <option value="Established Brand" className="bg-black">Established Brand</option>
                            </select>
                            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-white/20">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                                <path d="M6 9l6 6 6-6"></path>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold px-4">Project Scope / Intel (Optional)</label>
                        <textarea 
                          value={formData.projectScope}
                          onChange={(e) => setFormData({ ...formData, projectScope: e.target.value })}
                          placeholder="Tell us what you're trying to build or conquer..."
                          rows={4}
                          className="w-full bg-white/5 border border-white/10 rounded-[2rem] px-6 py-5 text-white placeholder:text-white/20 focus:outline-none focus:border-gold/50 transition-all font-light resize-none"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                        <motion.button 
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          disabled={isSubmitting}
                          className="w-full bg-gold text-black rounded-full px-8 py-5 text-[10px] sm:text-xs uppercase tracking-[0.3em] font-bold shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_35px_rgba(212,175,55,0.4)] transition-all disabled:opacity-50"
                          type="submit"
                        >
                          {isSubmitting ? "Initiating..." : "Transmit Signal"}
                        </motion.button>
                        
                        <motion.a 
                          href="tel:+919910815516"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full bg-white/5 border border-white/20 text-white rounded-full px-8 py-5 text-[10px] sm:text-xs uppercase tracking-[0.3em] font-bold flex items-center justify-center gap-3 hover:bg-white/10 transition-all"
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                          </svg>
                          Call Direct
                        </motion.a>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </SmoothScroll>
  );
}
