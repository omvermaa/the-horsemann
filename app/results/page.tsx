"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SmoothScroll from "@/components/ui/SmoothScroll";
import FloatingNav from "@/components/ui/FloatingNav";
import OverlayText from "@/components/ui/OverlayText";
import Image from "next/image";

// Audio Toggle Component
function VideoCard({ 
  src, 
  idx, 
  isMuted, 
  onToggle 
}: { 
  src: string; 
  idx: number; 
  isMuted: boolean; 
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: idx * 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-[2rem] overflow-hidden bg-[#111] aspect-[9/16] border border-white/[0.05] shadow-2xl group hover:border-gold/30 transition-colors duration-500"
    >
      <video
        src={src}
        autoPlay
        muted={isMuted}
        loop
        playsInline
        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
      />
      
      {/* Decorative overlay matching our tech/minimalist aesthetic */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 pointer-events-none" />
      
      {/* Top Left Indicator */}
      <div className="absolute top-6 left-6 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/50">Rec</span>
      </div>

      {/* Mute/Unmute Toggle */}
      <button
        onClick={onToggle}
        className={`
          absolute bottom-6 right-6 p-4 rounded-full backdrop-blur-xl border transition-all duration-300 z-20 shadow-xl
          ${!isMuted 
            ? "bg-gold text-black border-gold shadow-[0_0_20px_rgba(212,175,55,0.3)] Scale-110" 
            : "bg-black/40 text-white/70 border-white/10 hover:text-gold hover:border-gold/40"
          }
        `}
        aria-label={isMuted ? "Unmute video" : "Mute video"}
      >
        <div className="relative w-5 h-5">
           {isMuted ? (
             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
               <path d="M11 5L6 9H2v6h4l5 4V5z" />
               <line x1="23" y1="9" x2="17" y2="15" />
               <line x1="17" y1="9" x2="23" y2="15" />
             </svg>
           ) : (
             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
               <path d="M11 5L6 9H2v6h4l5 4V5z" />
               <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
               <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
             </svg>
           )}
        </div>
      </button>
    </motion.div>
  );
}

// Video data
const videos = [
  { src: "/result1.MP4", alt: "Result 1" },
  { src: "/result2.MP4", alt: "Result 2" },
  { src: "/result3.MP4", alt: "Result 3" },
];

// Before and After components
const comparisons = [
  { before: "/before1.jpeg", after: "/after1.jpeg", title: "@rawbyailaan" },
  { before: "/before2.jpeg", after: "/after2.jpeg", title: "@built2revv" },
  { before: "/before3.png", after: "/after3_v2.png", title: "@soothingseconds_10" },
];

export default function ResultsPage() {
  const [unmutedIdx, setUnmutedIdx] = useState<number | null>(null);
  const [activeComparison, setActiveComparison] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleToggle = (idx: number) => {
    if (unmutedIdx === idx) {
      setUnmutedIdx(null);
    } else {
      setUnmutedIdx(idx);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth } = carouselRef.current;
      const move = direction === 'left' ? -clientWidth * 0.85 : clientWidth * 0.85;
      carouselRef.current.scrollTo({ left: scrollLeft + move, behavior: 'smooth' });
    }
  };

  return (
    <SmoothScroll>
      <main className="relative w-full min-h-screen bg-background selection:bg-white selection:text-black pb-32">
        <FloatingNav />

        {/* Hero Section */}
        <section className="relative w-full pt-40 pb-20 md:pt-56 md:pb-32 px-6 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-gold text-[10px] md:text-sm uppercase tracking-[0.5em] font-bold block mb-6">
              The Proof
            </span>
            <h1 className="text-5xl md:text-8xl lg:text-[10rem] font-light tracking-tighter text-white uppercase drop-shadow-2xl leading-none">
              Our Work.
            </h1>
            <p className="mt-8 text-white/50 text-sm md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
              We don&apos;t deal in vanity metrics or empty promises. We deal in documented, undeniable scale. Witness the transformation of our partners.
            </p>
          </motion.div>
        </section>

        {/* Cinematic Video Montage */}
        <section className="relative w-full px-4 md:px-12 mx-auto max-w-[1600px] mb-32 md:mb-56">
          <motion.div 
            className="flex flex-col items-center text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl md:text-5xl text-white font-light tracking-tight">
              Motion & <span className="italic text-gold">Emotion.</span>
            </h2>
          </motion.div>

          <div
            ref={carouselRef}
            className="
              flex md:grid
              overflow-x-auto md:overflow-x-visible
              snap-x snap-mandatory md:snap-none
              gap-6 md:gap-10
              pb-8 md:pb-0
              -mx-6 px-6 md:mx-0 md:px-0
              scrollbar-hide
              md:grid-cols-3
            "
          >
            {videos.map((vid, idx) => (
              <div key={idx} className="flex-shrink-0 w-[85vw] md:w-auto snap-center">
                <VideoCard 
                  src={vid.src} 
                  idx={idx} 
                  isMuted={unmutedIdx !== idx}
                  onToggle={() => handleToggle(idx)}
                />
              </div>
            ))}
          </div>

          {/* Carousel Navigation Buttons (Mobile Only) */}
          <div className="flex md:hidden justify-center items-center gap-6 mt-8">
            <button 
              onClick={() => scroll('left')}
              className="p-4 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-gold hover:border-gold/40 transition-all duration-300"
              aria-label="Previous Video"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <div className="h-px w-8 bg-white/10" />

            <button 
              onClick={() => scroll('right')}
              className="p-4 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-gold hover:border-gold/40 transition-all duration-300"
              aria-label="Next Video"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </section>

        {/* Before & After Showcase */}
        <section className="relative w-full px-4 md:px-24 mx-auto max-w-7xl">
          <motion.div 
            className="flex flex-col items-center text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl text-white font-light tracking-tight mb-4">
              RESULTS.
            </h2>
            <p className="text-white/40 max-w-lg mx-auto font-light text-sm md:text-base">
              Growth isn&apos;t an accident. It is engineered systematically. View the digital transformation side-by-side.
            </p>
          </motion.div>

          {/* ── Tab Switcher Capsule ── */}
          <div className="flex justify-center mb-20 md:mb-24">
            <div className="relative inline-flex bg-white/5 rounded-full p-2 border border-white/10 backdrop-blur-md">
              {comparisons.map((comp, i) => (
                <button
                  key={i}
                  onClick={() => setActiveComparison(i)}
                  className={`relative z-10 px-4 md:px-8 py-2 md:py-3 text-[20px] md:text-[11px] uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold transition-colors duration-300 rounded-full whitespace-nowrap ${
                    activeComparison === i ? "text-black" : "text-white/40 hover:text-white/80"
                  }`}
                >
                  <span className="hidden md:inline">Project </span>0{i + 1}
                  {activeComparison === i && (
                    <motion.div
                      layoutId="activeCmpTab"
                      className="absolute inset-0 bg-gold rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* ── Active Comparison View ── */}
          <div className="min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeComparison}
                initial={{ opacity: 0, y: 40, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col w-full"
              >
                  {/* Active Project Title */}
                <div className="mb-12 md:mb-16 text-center flex flex-col items-center">
                   <div className="flex items-center gap-4 mb-4">
                      {/* <span className="text-white/20 text-4xl md:text-7xl font-light leading-none">0{activeComparison + 1}</span> */}
                      <h3 className="text-2xl md:text-5xl text-white font-light tracking-tight italic flex items-center gap-3">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 md:w-12 md:h-12 text-gold">
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                        </svg>
                        {comparisons[activeComparison].title.replace('@', '')}
                      </h3>
                   </div>
                   <div className="h-px w-32 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
                </div>

                <div className="flex flex-row gap-2 md:gap-16 items-start justify-center perspective-[1200px]">
                  
                  {/* Before Frame */}
                  <div className="w-1/2 flex flex-col items-center">
                    <span className="text-white/30 text-[8px] md:text-[10px] uppercase tracking-[0.4em] mb-4 font-bold">Before</span>
                    <div className="relative w-full max-w-[400px] aspect-[9/16] bg-[#1a1a1a] rounded-xl md:rounded-3xl p-1 md:p-3 border border-white/5 shadow-2xl">
                      <div className="relative w-full h-full rounded-lg md:rounded-2xl overflow-hidden bg-black grayscale opacity-70">
                         <Image 
                           src={comparisons[activeComparison].before}
                           alt="Before"
                           fill
                           quality={85}
                           className="object-cover"
                         />
                      </div>
                    </div>
                  </div>

                  {/* Growth Arrow Connector (Visible only on larger screens) */}
                  <div className="hidden lg:flex flex-col items-center justify-center pt-32 w-12 flex-shrink-0">
                    <div className="w-full h-px bg-white/10 relative">
                       <motion.div 
                         className="absolute inset-y-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-gold to-transparent"
                         animate={{ x: ["-100%", "100%"] }}
                         transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                       />
                    </div>
                  </div>

                  {/* After Frame */}
                  <div className="w-1/2 flex flex-col items-center">
                    <span className="text-gold text-[8px] md:text-[10px] uppercase tracking-[0.4em] mb-4 font-bold">After</span>
                    <div className="relative w-full max-w-[400px] aspect-[9/16] bg-[#1a1a1a] rounded-xl md:rounded-3xl p-1 md:p-3 border border-gold/20 shadow-[0_0_50px_rgba(212,175,55,0.15)] group hover:scale-[1.02] transition-transform duration-500">
                      <div className="relative w-full h-full rounded-lg md:rounded-2xl overflow-hidden bg-black">
                         <Image 
                           src={comparisons[activeComparison].after}
                           alt="After"
                           fill
                           quality={90}
                           className="object-cover group-hover:scale-105 transition-transform duration-1000"
                         />
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="mt-32 md:mt-56 w-full text-center">
          <OverlayText>
             <h2 className="text-3xl md:text-5xl text-foreground tracking-widest uppercase mb-10 px-4">Start Your Reign.</h2>
             <button 
               onClick={() => window.dispatchEvent(new CustomEvent('horsemann-open-modal'))}
               className="px-8 py-4 border border-white/20 hover:border-gold hover:text-gold transition-colors duration-500 tracking-widest uppercase text-sm"
             >
               Initiate Contact
             </button>
          </OverlayText>
        </section>
      </main>
    </SmoothScroll>
  );
}
