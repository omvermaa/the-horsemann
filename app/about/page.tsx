"use client";

import { motion } from "framer-motion";
import SmoothScroll from "@/components/ui/SmoothScroll";
import FloatingNav from "@/components/ui/FloatingNav";
import OverlayText from "@/components/ui/OverlayText";

const teamFactions = [
  {
    title: "Technical Infrastructure",
    role: "System Architects & Engineers",
    desc: "We don't rely on templates. Our engineers build custom algorithms, headless web apps, and automated systems that give you an unfair digital advantage.",
    delay: 0.1
  },
  {
    title: "Performance Marketing",
    role: "Tech Managers & Strategists",
    desc: "Data-driven growth hackers who treat your budget like their own. We engineer high-converting funnels that systematically multiply your sales and ROI.",
    delay: 0.2
  },
  {
    title: "Cinematic Production",
    role: "Filmmakers & Master Editors",
    desc: "Attention is currency. Our production unit creates commercial-grade, scroll-stopping visuals that forcibly command the attention of your highest-paying clients.",
    delay: 0.3
  },
  {
    title: "Visual Aesthetics",
    role: "Graphic Designers & UI/UX",
    desc: "We engineer interfaces and brand identities that don't just look beautiful—they manipulate the psychological journey to drive frictionless conversions.",
    delay: 0.4
  }
];

const pillars = [
  {
    num: "01",
    title: "Social Dominance",
    desc: "Cultivating an obsessive audience and turning your platforms into an ecosystem of loyal advocates."
  },
  {
    num: "02",
    title: "Revenue Engineering",
    desc: "Aggressive, surgical sales strategies that turn casual traffic into a predictable, scalable cash flow."
  },
  {
    num: "03",
    title: "Brand Prestige",
    desc: "Architecting a visual and narrative identity so premium that your competitors are priced out of the conversation."
  }
];

export default function AboutPage() {
  return (
    <SmoothScroll>
      <main className="relative w-full min-h-screen bg-background selection:bg-gold selection:text-black">
        <FloatingNav />

        {/* Hero Section */}
        <section className="relative w-full pt-40 pb-20 md:pt-56 md:pb-32 px-6 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-gold text-[10px] md:text-sm uppercase tracking-[0.5em] font-bold block mb-6">
              The Collective
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tighter text-white uppercase drop-shadow-2xl leading-none">
              Architects of the <br /> <span className="italic text-gold">Digital Realm.</span>
            </h1>
          </motion.div>
        </section>

        {/* The Manifesto */}
        <section className="relative w-full px-4 md:px-12 mx-auto max-w-4xl text-center mb-32 md:mb-48">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xl md:text-3xl text-white/80 font-light leading-relaxed">
              We are not an agency; we are a <span className="text-gold italic">decentralized syndicate.</span> A curated collective of elite software engineers, growth marketers, cinematic filmmakers, and visual designers operating as a single, lethal unit.
            </p>
            <div className="w-px h-16 bg-gradient-to-b from-gold/50 to-transparent mx-auto mt-12" />
          </motion.div>
        </section>

        {/* Capability Matrix - Team Breakdown */}
        <section className="relative w-full px-4 md:px-12 mx-auto max-w-7xl mb-32 md:mb-56">
          <OverlayText className="flex flex-col items-center text-center mb-16 md:mb-24">
             <h2 className="text-xl md:text-3xl text-white/50 uppercase tracking-widest font-light">The Factions</h2>
          </OverlayText>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {teamFactions.map((faction, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: faction.delay }}
                className="bg-[#111] border border-white/5 p-8 md:p-12 rounded-[2rem] hover:border-white/10 hover:bg-[#151515] transition-all duration-500 group"
              >
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <h3 className="text-gold text-xs uppercase tracking-[0.3em] font-bold mb-4">{faction.title}</h3>
                    <h4 className="text-2xl md:text-3xl text-white font-light tracking-tight mb-6">
                      {faction.role}
                    </h4>
                  </div>
                  <p className="text-white/40 font-light leading-relaxed group-hover:text-white/60 transition-colors">
                    {faction.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* The 3 Pillars / Goals */}
        <section className="relative w-full pt-32 pb-40 md:pt-48 md:pb-56 bg-black border-t border-white/5">
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.1] mix-blend-overlay pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-4 md:px-12 z-10 relative">
             <motion.div 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
               className="mb-20 text-center"
             >
               <h2 className="text-3xl md:text-6xl text-white tracking-tighter font-light mb-6">Execution <span className="italic text-gold">Vectors.</span></h2>
               <p className="text-white/40 text-sm md:text-lg max-w-xl mx-auto font-light">
                 Our technical and creative infrastructure exists for one purpose: to ruthlessly execute your three core business objectives.
               </p>
             </motion.div>

             <div className="flex flex-col lg:flex-row gap-8 md:gap-12 relative w-full px-0 sm:px-4 mx-auto max-w-6xl">
               {pillars.map((pillar, i) => (
                 <motion.div
                   key={i}
                   initial={{ opacity: 0, y: 40 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.8, delay: i * 0.2 }}
                   className="flex-1 flex flex-col relative"
                 >
                   <span className="text-gold/20 text-7xl font-bold mb-4">{pillar.num}</span>
                   <div className="h-px w-12 bg-gold/50 mb-6" />
                   <h3 className="text-xl md:text-2xl text-white tracking-wide font-light mb-4">{pillar.title}</h3>
                   <p className="text-white/40 font-light leading-relaxed">
                     {pillar.desc}
                   </p>
                 </motion.div>
               ))}
             </div>
          </div>
        </section>
        
        {/* Pre-Footer CTA */}
        <section className="mb-32 md:mb-48 w-full text-center px-4">
          <OverlayText>
             <h2 className="text-3xl md:text-5xl text-white/90 tracking-widest uppercase mb-10">Expand Your Empire.</h2>
             <button 
               onClick={() => window.dispatchEvent(new CustomEvent('horsemann-open-modal'))}
               className="inline-block px-8 py-4 border border-white/20 hover:border-gold hover:text-gold transition-colors duration-500 tracking-widest uppercase text-sm"
             >
               Initiate Contact
             </button>
          </OverlayText>
        </section>

      </main>
    </SmoothScroll>
  );
}
