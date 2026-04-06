"use client";
import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function FloatingNav() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Show navbar after scrolling past hero section
    if (typeof window !== "undefined") {
      if (latest > window.innerHeight * 3.5) {
        setVisible(true);
      } else {
        setVisible(false);
        setIsExpanded(false);
      }
    }
  });

  const navLinks = [
    { name: "About", href: "#" },
    { name: "Services", href: "#" },
    { name: "Results", href: "#" },
    { name: "Contact", href: "#" },
  ];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-6 inset-x-0 mx-auto z-50 flex justify-center px-4"
        >
          <motion.div
            layout
            className={`
              relative flex flex-col md:flex-row items-center overflow-hidden
              bg-black/40 backdrop-blur-3xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] ring-1 ring-white/5
              ${isExpanded ? "rounded-[2.5rem] p-8 min-w-[280px]" : "rounded-full py-1.5 md:py-2.5 px-4 md:px-6"}
              transition-all duration-500 ease-[0.16, 1, 0.3, 1]
            `}
          >
            <div className={`flex items-center justify-between w-full ${!isExpanded ? "md:justify-start gap-4 md:gap-7" : "mb-8"}`}>
              <Link href="/" className="flex items-center transition-all hover:scale-105 hover:brightness-125 active:scale-95 group">
                <span 
                  className="text-2xl md:text-4xl text-gold/90 leading-none pt-1 select-none"
                  style={{ fontFamily: 'var(--font-alex-brush)' }}
                >
                  Horsemann
                </span>
              </Link>

              {/* Mobile Toggle Button */}
              {isMobile && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className={`
                    flex items-center gap-2 px-4 py-1.5 rounded-full border transition-all duration-300
                    ${isExpanded 
                      ? "bg-gold text-black border-gold font-bold shadow-[0_0_15px_rgba(197,165,114,0.3)]" 
                      : "bg-white/5 text-white/70 border-white/10 hover:bg-white/10"
                    }
                    text-[10px] uppercase tracking-[0.2em]
                  `}
                >
                  {isExpanded ? "Close" : "Menu"}
                </button>
              )}

              {/* Desktop Divider & Links */}
              {!isMobile && (
                <>
                  <div className="h-5 w-px bg-white/10 rotate-[15deg] hidden md:block" />
                  <div className="flex items-center gap-4 md:gap-8 pr-4 md:pr-10">
                    {navLinks.map((link, idx) => (
                      <Link
                        key={idx}
                        href={link.href}
                        className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-white/40 hover:text-gold transition-all duration-300"
                        onClick={(e) => e.preventDefault()}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Mobile Expanded Menu Content */}
            <AnimatePresence>
              {isMobile && isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: 10 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: 10 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full flex flex-col items-center gap-6"
                >
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-2" />
                  {navLinks.map((link, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + idx * 0.05, duration: 0.4 }}
                      className="w-full text-center"
                    >
                      <Link
                        href={link.href}
                        className="text-lg uppercase tracking-[0.4em] text-white/60 hover:text-gold transition-all duration-300 py-2 block"
                        onClick={() => setIsExpanded(false)}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                  
                  {/* Subtle decorative element at bottom */}
                  <div className="mt-4 opacity-20 pointer-events-none">
                     <span className="text-2xl" style={{ fontFamily: 'var(--font-alex-brush)' }}>H</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
