"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { useRouter } from "next/navigation";

export default function MandatoryModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [countdown, setCountdown] = useState(6);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    scale: "Starting out"
  });

  const { scrollY } = useScroll();

  useEffect(() => {
    // Check if user has already submitted or dismissed in this session or past ones
    const status = localStorage.getItem("mandatoryFormStatus");
    if (status === "submitted" || status === "dismissed") {
      setHasSubmitted(true);
    }
  }, []);

  // Handle Scroll Locking properly including Lenis
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // @ts-ignore
      window.lenis?.stop();
    } else {
      document.body.style.overflow = "unset";
      // @ts-ignore
      window.lenis?.start();
    }
    
    return () => {
      document.body.style.overflow = "unset";
      // @ts-ignore
      window.lenis?.start();
    };
  }, [isOpen]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const triggerHeight = typeof window !== "undefined" ? window.innerHeight * 3.5 : 0;
    // Trigger after scrolling past the hero (400vh horses section)
    if (latest > triggerHeight && !isOpen && !hasSubmitted) {
      setIsOpen(true);
    }
  });

  // Global trigger listener
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("horsemann-open-modal", handleOpen);
    return () => window.removeEventListener("horsemann-open-modal", handleOpen);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.phone.length !== 10) {
      alert("Please enter a valid 10-digit phone number.");
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        setShowSuccess(true);
        localStorage.setItem("mandatoryFormStatus", "submitted");
        // Reset form
        setFormData({ name: "", email: "", phone: "", scale: "Starting out" });
      } else {
        alert("There was an issue submitting your request. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form", error);
      alert("There was a network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle countdown and redirect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showSuccess && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else if (showSuccess && countdown === 0) {
      setIsOpen(false);
      setHasSubmitted(true);
      router.push('/');
    }
    return () => clearTimeout(timer);
  }, [showSuccess, countdown, router]);

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
            className="relative w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-[2rem] p-6 md:p-8 shadow-[0_0_100px_rgba(212,175,55,0.1)] overflow-hidden"
          >
            {/* Decorative Gold Accent */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
            
            {/* Close Button */}
            <button 
              onClick={() => {
                setIsOpen(false);
                setHasSubmitted(true);
                localStorage.setItem("mandatoryFormStatus", "dismissed");
              }}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 border border-white/10 text-white/40 hover:text-gold hover:border-gold/40 transition-all active:scale-95 z-10"
              aria-label="Close modal"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            
            {showSuccess ? (
              <div className="text-center py-10 flex flex-col items-center">
                <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mb-6 border border-gold/30">
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
                <h2 className="text-3xl text-white font-light mb-4">Transmission <span className="italic text-gold">Received.</span></h2>
                <p className="text-white/60 text-base font-light mb-10">
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
              </div>
            ) : (
              <>
                <div className="text-center mb-6">
                  <span className="text-gold text-[10px] uppercase tracking-[0.5em] font-bold block mb-2">
                    Exclusive Intel
                  </span>
                  <h2 className="text-2xl md:text-3xl text-white font-light tracking-tight mb-2">
                    Prioritize Your <span className="italic text-gold">Growth.</span>
                  </h2>
                  <p className="text-white/40 text-[11px] font-light">
                    Secure your spot in our elite strategy cycle. We only take 5 projects | 3 clients per month.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-[9px] text-white/30 uppercase tracking-[0.2em] font-bold px-4">Digital Identity</label>
                      <input 
                        required
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Full Name"
                        className="w-full bg-white/5 border border-white/10 rounded-full px-5 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-gold/50 transition-all font-light"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[9px] text-white/30 uppercase tracking-[0.2em] font-bold px-4">Direct Channel</label>
                      <input 
                        required
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Email Address"
                        className="w-full bg-white/5 border border-white/10 rounded-full px-5 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-gold/50 transition-all font-light"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-[9px] text-white/30 uppercase tracking-[0.2em] font-bold px-4">Contact Number</label>
                      <input 
                        required
                        type="tel" 
                        value={formData.phone}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                          setFormData({ ...formData, phone: val });
                        }}
                        pattern="[0-9]{10}"
                        title="Please enter a valid 10-digit phone number"
                        placeholder="10-digit Number"
                        className="w-full bg-white/5 border border-white/10 rounded-full px-5 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-gold/50 transition-all font-light"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[9px] text-white/30 uppercase tracking-[0.2em] font-bold px-4">Current Scale</label>
                      <div className="relative">
                        <select 
                          value={formData.scale}
                          onChange={(e) => setFormData({ ...formData, scale: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-full px-5 py-3 text-sm text-white/70 focus:outline-none focus:border-gold/50 transition-all font-light appearance-none"
                        >
                          <option value="Starting out" className="bg-black">Starting out</option>
                          <option value="10k - 50k followers" className="bg-black">10k-50k followers</option>
                          <option value="50k - 100k+ followers" className="bg-black">50k-100k+ followers</option>
                          <option value="Established Brand" className="bg-black">Established Brand</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/20">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
                            <path d="M6 9l6 6 6-6"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-2 bg-gold text-black rounded-full px-8 py-4 text-xs uppercase tracking-[0.3em] font-bold shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_35px_rgba(212,175,55,0.4)] transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Initiating Protocol..." : "Claim Priority Access"}
                  </button>
                </form>

                <p className="text-center mt-4 text-[9px] text-white/20 uppercase tracking-widest leading-relaxed">
                  By submitting, you agree to enter the Horsemann ecosystem.
                </p>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
