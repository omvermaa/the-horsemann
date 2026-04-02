"use client";

import { motion } from 'framer-motion';
import HeroScroll from '@/components/ui/HeroScroll';
import SmoothScroll from '@/components/ui/SmoothScroll';
import OverlayText from '@/components/ui/OverlayText';
import ServicesSection from '@/components/ui/ServicesSection';
import ResultsShowcase from '@/components/ui/ResultsShowcase';
import WebProjectsShowcase from '@/components/ui/WebProjectsShowcase';

export default function Home() {
  return (
    <SmoothScroll>
      <main className="relative w-full bg-background selection:bg-white selection:text-black">
        
        {/* The 400vh scrollytelling section */}
        <section className="relative w-full">
          <HeroScroll />
          
          {/* Absolute Overlays mapped to scroll depth (CSS Grid/Flex positioning over the 400vh) */}
          <div className="absolute top-0 left-0 w-full h-[400vh] pointer-events-none flex flex-col justify-between py-[50vh]">
            
            {/* Background Texture Fill (Dot Grid) */}
            <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none z-0" 
                 style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            
            {/* Block 1 */}
            <div className="h-[100dvh] flex flex-col items-center justify-center text-center px-4">
              <OverlayText>
                <h1 className="text-4xl md:text-8xl font-light tracking-wider md:tracking-widest text-foreground uppercase mb-4 md:mb-6 drop-shadow-2xl">
                  The Horsemann
                </h1>
                <p className="text-gold tracking-widest text-sm md:text-base uppercase drop-shadow-md">
                  Commanding the Digital Realm
                </p>
              </OverlayText>
            </div>

            {/* Phase 1: The Heritage (5+ Years) */}
            <div className="h-[100dvh] flex items-center justify-between px-6 md:px-24 perspective-[1000px] relative">
              <OverlayText className="max-w-xl relative z-10">
                <motion.div 
                  className="bg-black/60 backdrop-blur-2xl p-10 rounded-[3rem] border border-white/10 relative overflow-hidden group shadow-2xl"
                  whileHover={{ rotateY: 10, rotateX: -5, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="absolute top-0 right-0 p-8">
                    <span className="text-gold text-7xl md:text-9xl font-light opacity-20 group-hover:opacity-40 transition-opacity">5+</span>
                  </div>
                  <h2 className="text-gold text-sm uppercase tracking-[0.4em] font-bold mb-4">The Heritage</h2>
                  <h3 className="text-3xl md:text-5xl text-white font-light mb-6 leading-tight">Half a Decade of <span className="italic">Dominance.</span></h3>
                  <p className="text-white/60 text-lg leading-relaxed">
                    Engineering digital growth since 2019. We transform potential into precision-crafted legacies.
                  </p>
                  <div className="mt-8 flex gap-4">
                    <div className="h-[1px] flex-1 bg-white/10 self-center" />
                    <span className="text-[10px] text-white/30 uppercase tracking-widest">Est. MMXIX</span>
                  </div>
                </motion.div>
              </OverlayText>

              {/* Chronicle Fill Sidebar */}
              <div className="hidden lg:flex flex-col items-end gap-12 relative z-0 opacity-40">
                {["2019", "2021", "2024"].map((year, i) => (
                   <OverlayText key={i} className="flex items-center gap-4">
                      <span className="text-white/20 text-xs uppercase tracking-widest leading-none">Architecting</span>
                      <span className="text-gold text-4xl font-light leading-none">{year}</span>
                      <div className="w-[1px] h-12 bg-white/10" />
                   </OverlayText>
                ))}
              </div>
            </div>

            {/* Phase 2: The Arsenal (Services) */}
            <div className="h-[100dvh] flex items-center justify-between px-6 md:px-24 perspective-[1000px] relative">
               {/* Market Intel Fill Sidebar */}
               <div className="hidden lg:flex flex-col gap-6 opacity-30">
                  <OverlayText className="flex flex-col border-l border-white/10 pl-6">
                    <span className="text-[10px] text-gold uppercase tracking-[0.3em] font-bold mb-2">Technical Armory</span>
                    <span className="text-white text-lg font-light tracking-widest uppercase">Precision: 100%</span>
                  </OverlayText>
                  <OverlayText className="flex flex-col border-l border-white/10 pl-6">
                    <span className="text-[10px] text-white/40 uppercase tracking-[0.3em] font-bold mb-2">System Status</span>
                    <span className="text-white text-lg font-light tracking-widest uppercase">Strategy: Active</span>
                  </OverlayText>
                  <OverlayText className="mt-8">
                    <div className="w-[1px] h-32 bg-gradient-to-b from-gold/50 to-transparent" />
                  </OverlayText>
               </div>

               <OverlayText className="max-w-2xl text-right relative z-10">
                  <motion.div 
                    className="flex flex-col items-end"
                    whileHover={{ rotateY: -10, rotateX: 5, scale: 1.02 }}
                  >
                    <h2 className="text-gold text-sm uppercase tracking-[0.4em] font-bold mb-8">The Arsenal</h2>
                    <h3 className="text-3xl md:text-6xl text-white font-light mb-10 tracking-tighter leading-none">Surgical Strategy.</h3>
                    
                    {/* Floating Service Pills */}
                    <div className="flex flex-wrap justify-end gap-3 max-w-lg">
                      {["Social Media", "Content Creation", "Performance Ads", "SEO", "Web Dev"].map((service, i) => (
                        <motion.div 
                          key={i}
                          className="px-6 py-3 bg-white/5 backdrop-blur-md rounded-full border border-white/10 text-white/80 text-xs uppercase tracking-widest hover:bg-gold/20 hover:border-gold/40 transition-colors"
                          initial={{ z: 0 }}
                          whileHover={{ z: 50, scale: 1.1 }}
                        >
                          {service}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
               </OverlayText>
            </div>

            {/* Phase 3: About Us — left-aligned, compact to let the horse eye show */}
            <div className="h-[100dvh] flex items-center justify-start px-6 md:px-16 relative">
               <OverlayText className="max-w-md relative z-10">
                 <motion.div
                   className="bg-black/50 backdrop-blur-2xl p-8 md:p-10 rounded-[2.5rem] border border-white/10 shadow-2xl"
                   whileHover={{ scale: 1.02 }}
                   transition={{ type: "spring", stiffness: 300, damping: 25 }}
                 >
                   <h2 className="text-gold text-xs uppercase tracking-[0.4em] font-bold mb-4">About Us</h2>
                   <h3 className="text-2xl md:text-4xl text-white font-light mb-5 leading-tight tracking-tight">
                     We Don't Follow Trends —{" "}
                     <span className="text-gold italic">We Set Them.</span>
                   </h3>
                   <p className="text-white/50 text-sm md:text-base leading-relaxed mb-6">
                     The Horsemann is a results-obsessed digital agency. We engineer growth, craft narratives, and build brands that dominate their space.
                   </p>
                   <div className="flex gap-6 mb-6">
                     <div className="flex flex-col">
                       <span className="text-gold text-2xl font-light">5+</span>
                       <span className="text-white/30 text-[9px] uppercase tracking-widest">Years</span>
                     </div>
                     <div className="w-px bg-white/10" />
                     <div className="flex flex-col">
                       <span className="text-gold text-2xl font-light">50+</span>
                       <span className="text-white/30 text-[9px] uppercase tracking-widest">Clients</span>
                     </div>
                     <div className="w-px bg-white/10" />
                     <div className="flex flex-col">
                       <span className="text-gold text-2xl font-light">∞</span>
                       <span className="text-white/30 text-[9px] uppercase tracking-widest">Ambition</span>
                     </div>
                   </div>
                   <div className="h-px w-full bg-white/10 mb-5" />
                   <p className="text-white/30 text-[10px] uppercase tracking-[0.3em]">
                     Commanding the Digital Realm since MMXIX
                   </p>
                 </motion.div>
               </OverlayText>
            </div>

          </div>
        </section>

        {/* 3D Perspective Stacking Services */}
        <ServicesSection />

        {/* Results Showcase — Before/After Phone Mockups */}
        <ResultsShowcase />

        {/* Web Projects Showcase — Laptop & Mobile Mockups */}
        <WebProjectsShowcase />

        {/* Normal document flow resumes here for footer/contact */}
        <section className="h-[100dvh] flex flex-col items-center justify-center bg-background border-t border-white/10 relative z-10">
           <OverlayText className="flex flex-col items-center">
             <h2 className="text-3xl md:text-5xl text-foreground tracking-widest uppercase mb-10 text-center px-4">Mount Up.</h2>
             <button className="px-8 py-4 border border-white/20 hover:border-gold hover:text-gold transition-colors duration-500 tracking-widest uppercase text-sm">
               Initiate Contact
             </button>
           </OverlayText>
        </section>

      </main>
    </SmoothScroll>
  );
}
